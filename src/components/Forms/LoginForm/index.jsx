import React, { useEffect, useState } from "react";
import PhoneAuth from "./PhoneAuth";
import ProfileUpdate from "./ProfileUpdate";
import EmailUpdate from "./EmailUpdate";
import { useAuth } from "@/contexts/AuthContext";

const LoginForm = ({ callbackUrl, onSuccess }) => {
  const [formState, setFormState] = useState("no-user");
  const { userInfo } = useAuth();

  useEffect(() => {
    switch (true) {
      case !userInfo.phoneNumber:
        setFormState("no-user");
        break;
      case !userInfo?.displayName ||
        userInfo?.displayName === "" ||
        userInfo?.displayName === " ":
        setFormState("no-profile");
        break;
      case !userInfo?.email:
        setFormState("no-email");
        break;

      default:
        setFormState("done");
        if (onSuccess) onSuccess();
        break;
    }
  }, [userInfo, onSuccess]);

  return (
    <div>
      {formState === "no-user" && <PhoneAuth />}
      {formState === "no-profile" && <ProfileUpdate />}
      {formState === "no-email" && <EmailUpdate callbackUrl={callbackUrl} />}
      {formState === "done" && <div className="text-center p-4">Logging you in...</div>}
    </div>
  );
};

export default LoginForm;
