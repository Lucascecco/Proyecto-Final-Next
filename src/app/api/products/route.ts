import { db } from "@/lib/firebase";
import { ProductType } from "@/lib/actions";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ProductType[]>> {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  const productsCollection = collection(db, "products");
  const productQuery = category
    ? query(productsCollection, where("category", "==", category))
    : productsCollection;
  const querySnapshot = await getDocs(productQuery);
  const docs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductType[];

  return NextResponse.json(docs);
}
