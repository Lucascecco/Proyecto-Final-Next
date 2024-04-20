import { ProductType, mockData } from "@/app/mock-data";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<ProductType[]>> {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return NextResponse.json(mockData());
}
