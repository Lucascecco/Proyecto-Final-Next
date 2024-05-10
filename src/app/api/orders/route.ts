import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const colRef = collection(db, "orders");
  const colSnapshot = await getDocs(colRef);
  const orders = colSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return NextResponse.json(orders);
}

export async function POST(request: NextRequest) {
  let formData: {
    products: {
      slug: string;
      quantity: number;
    }[];
    user: {
      uid: string;
      email: string;
      name: string;
    };
    total: number;
  } = await request.json();

  const colRef = collection(db, "orders");
  const productColRef = collection(db, "products");
  addDoc(colRef, formData);

  formData.products.forEach(async ({ slug, quantity }) => {
    const docRef = doc(productColRef, slug);
    await updateDoc(docRef, { stock: increment(-quantity) });
  });

  return NextResponse.json("OK");
}
