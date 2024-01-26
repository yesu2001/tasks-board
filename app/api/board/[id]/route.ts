import BoardSchema from "@/model/board";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    const updatedBoardData = await BoardSchema.findByIdAndUpdate(
      { _id: body?._id },
      {
        board_description: body?.board_description,
        board_name: body?.board_name,
      },
      { new: true, upsert: true }
    );
    return NextResponse.json({ data: updatedBoardData });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
