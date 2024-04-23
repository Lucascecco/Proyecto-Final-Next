import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<
  NextResponse<{ id: string; link: string; label: string }[]>
> {
  const categoriesCollection = collection(db, "categories");
  const querySnapshot = await getDocs(categoriesCollection);
  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    link: `/store/products/category/${doc.id}`,
    ...doc.data(),
  })) as { id: string; link: string; label: string }[];

  return NextResponse.json(docs);
}
