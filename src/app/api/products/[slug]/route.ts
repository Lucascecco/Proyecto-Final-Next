import { db } from "@/lib/firebase";
import { ProductType } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<ProductType> | Response> {
  if (params === undefined || params.slug === undefined)
    return NextResponse.json(
      { error: "Parámetros invalidos" },
      { status: 400 }
    );

  const docRef = doc(db, "products", params.slug);
  const docSnapshot = await getDoc(docRef);

  revalidatePath("/api/products/[slug]");

  if (docSnapshot.exists()) {
    return NextResponse.json({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    } as ProductType);
  } else {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 }
    );
  }
}
