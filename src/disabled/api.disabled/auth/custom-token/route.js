import { auth as adminAuth } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { idToken } = await request.json();

    // Verify the ID token
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Generate a custom token
    const customToken = await adminAuth.createCustomToken(decodedToken.uid);

    return NextResponse.json({ customToken });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate custom token" },
      { status: 500 }
    );
  }
}
