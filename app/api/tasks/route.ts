import TaskSchema from "@/model/task";
import connectDB from "@/utils/connectDB";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    const taskData = new TaskSchema(body);
    const newTaskData = await taskData.save();
    return NextResponse.json({ data: newTaskData });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await connectDB();
    const updatedTaskData = await TaskSchema.findByIdAndUpdate(
      { _id: body._id },
      body,
      { new: true, upsert: true }
    );
    return NextResponse.json({ data: updatedTaskData });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
