import { db } from "@/lib/firebase";
import { sanitizeString } from "@/lib/utils";
import { doc, setDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let formData = await request.json();
  formData = {
    ...formData,
  };
  
  const docRef = doc(db, "products", sanitizeString(formData.title));
  await setDoc(docRef, formData);

  return NextResponse.json("OK");
}
