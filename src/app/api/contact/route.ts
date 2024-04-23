import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.json();

  const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailMatch = re.exec(formData.email);
  if (!emailMatch) {
    return NextResponse.json(
      { error: "E-mail inválido" },
      { status: 400 }
    );
  }

  const colRef = collection(db, "contact-forms");
  addDoc(colRef, formData);

  return NextResponse.json("OK");
}
