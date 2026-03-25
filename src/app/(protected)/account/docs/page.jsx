"use client";
import Container from "@/components/ui/Container";
import UserDocs from "@/components/UserDocs/Docs";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import RemoveCompanionDialog from "@/components/UserDocs/RemoveCompanionDialog";
import { COLLECTIONS } from "@/config";

const DOCUMENT_TYPES = {
  passport: "Passport",
  aadhar: "Aadhar",
  drivingLicense: "Driving License",
};

const DocsPage = () => {
  const { userInfo } = useAuth();
  const [travelCompanions, setTravelCompanions] = useState([]);
  const [userDocuments, setUserDocuments] = useState({
    passport: { status: "not_uploaded", url: null },
    aadhar: { status: "not_uploaded", url: null },
    drivingLicense: { status: "not_uploaded", url: null },
  });
  const [showNewCompanionInput, setShowNewCompanionInput] = useState(false);
  const [newCompanionName, setNewCompanionName] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!userInfo?.uid) return;

      try {
        // Fetch user's document which contains the documents field
        const userDocRef = doc(db, COLLECTIONS.USERS, userInfo.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        const userData = userDocSnapshot.data();

        if (userData?.documents) {
          setUserDocuments({
            passport: userData.documents.passport || {
              status: "not_uploaded",
              url: null,
            },
            aadhar: userData.documents.aadhar || {
              status: "not_uploaded",
              url: null,
            },
            drivingLicense: userData.documents.drivingLicense || {
              status: "not_uploaded",
              url: null,
            },
          });
        }

        // Fetch travel companions
        const companionsRef = collection(
          db,
          COLLECTIONS.USERS,
          userInfo.uid,
          "travelCompanions"
        );
        const companionsSnapshot = await getDocs(companionsRef);

        const companions = companionsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          documents: {
            passport: doc.data().documents?.passport || {
              status: "not_uploaded",
              url: null,
            },
            aadhar: doc.data().documents?.aadhar || {
              status: "not_uploaded",
              url: null,
            },
            drivingLicense: doc.data().documents?.drivingLicense || {
              status: "not_uploaded",
              url: null,
            },
          },
        }));

        setTravelCompanions(companions);
      } catch (error) {
      }
    };

    fetchDocuments();
  }, [userInfo]);

  const handleAddCompanion = async (e) => {
    e.preventDefault();
    if (!newCompanionName.trim() || !userInfo?.uid) return;

    try {
      const companionsRef = collection(
        db,
        COLLECTIONS.USERS,
        userInfo.uid,
        "travelCompanions"
      );
      await addDoc(companionsRef, {
        name: newCompanionName.trim(),
        documents: {
          passport: { status: "not_uploaded", url: null },
          aadhar: { status: "not_uploaded", url: null },
          drivingLicense: { status: "not_uploaded", url: null },
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setNewCompanionName("");
      setShowNewCompanionInput(false);

      // Refresh the data after adding new companion
      await refreshDocuments();
      toast.success("Travel companion added successfully");
    } catch (error) {
      toast.error("Failed to add travel companion");
    }
  };

  const refreshDocuments = async () => {
    if (!userInfo?.uid) return;

    try {
      const userDocRef = doc(db, COLLECTIONS.USERS, userInfo.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();

      if (userData?.documents) {
        setUserDocuments({
          passport: userData.documents.passport || {
            status: "not_uploaded",
            url: null,
          },
          aadhar: userData.documents.aadhar || {
            status: "not_uploaded",
            url: null,
          },
          drivingLicense: userData.documents.drivingLicense || {
            status: "not_uploaded",
            url: null,
          },
        });
      }

      // Fetch travel companions
      const companionsRef = collection(
        db,
        COLLECTIONS.USERS,
        userInfo.uid,
        "travelCompanions"
      );
      const companionsSnapshot = await getDocs(companionsRef);

      const companions = companionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        documents: {
          passport: doc.data().documents?.passport || {
            status: "not_uploaded",
            url: null,
          },
          aadhar: doc.data().documents?.aadhar || {
            status: "not_uploaded",
            url: null,
          },
          drivingLicense: doc.data().documents?.drivingLicense || {
            status: "not_uploaded",
            url: null,
          },
        },
      }));

      setTravelCompanions(companions);
    } catch (error) {
    }
  };

  return (
    <section className="py-20">
      <Container>
        <div className="space-y-10">
          <div className="relative rounded-2xl border border-solid border-[#D9D9D9] px-6 py-8">
            <h5 className="absolute left-8 top-0 -translate-y-1/2 bg-white px-2 font-bold uppercase text-brand-blue">
              Travellers Documents
            </h5>

            <div className="space-y-6">
              {/* User's own documents */}
              <div className="space-y-3">
                <h6 className="font-semibold">My Documents</h6>
                <div className="space-y-2">
                  {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
                    <UserDocs
                      key={key}
                      traveler={{
                        name: userInfo?.displayName || "Me",
                        documents: userDocuments,
                      }}
                      label={label}
                      docType={key}
                      userId={userInfo?.uid}
                      onDocumentUpdate={refreshDocuments}
                    />
                  ))}
                </div>
              </div>

              {travelCompanions.map((traveler, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h6 className="font-semibold">{traveler.name}</h6>
                    <RemoveCompanionDialog
                      companion={traveler}
                      userId={userInfo.uid}
                      onRemove={refreshDocuments}
                    />
                  </div>
                  <div className="space-y-2">
                    {Object.entries(DOCUMENT_TYPES).map(([key, label]) => (
                      <UserDocs
                        key={key}
                        traveler={traveler}
                        label={label}
                        docType={key}
                        userId={userInfo.uid}
                        onDocumentUpdate={refreshDocuments}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="h-px bg-gray-200" />

              {/* Add New Companion Button */}
              {!showNewCompanionInput ? (
                <Button
                  onClick={() => setShowNewCompanionInput(true)}
                  className="flex items-center gap-2 text-brand-blue hover:text-brand-blue-hovered"
                  variant="ghost"
                >
                  <Plus className="size-4" />
                  Add Travel Companion
                </Button>
              ) : (
                <form
                  onSubmit={handleAddCompanion}
                  className="flex items-center gap-2"
                >
                  <Input
                    value={newCompanionName}
                    onChange={(e) => setNewCompanionName(e.target.value)}
                    placeholder="Enter companion name"
                    className="max-w-xs"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="bg-brand-blue text-white hover:bg-brand-blue-hovered"
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowNewCompanionInput(false);
                      setNewCompanionName("");
                    }}
                  >
                    <X className="size-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DocsPage;
