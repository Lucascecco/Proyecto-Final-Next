import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.json()
    console.log(formData);

    return NextResponse.json("OK");
}