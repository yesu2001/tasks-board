import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ data: "HELLO WELCOME TO THE SEVER" });
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json({ data: "Message from the SEVER" });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
