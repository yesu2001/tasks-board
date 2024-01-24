import TaskSchema from "@/model/task";
import connectDB from "@/utils/connectDB";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const taskData = await TaskSchema.find({ board_id: id });
    if (!taskData) {
      for (const data of tasksData) {
        const newData = {
          ...data,
          board_id: id,
        };
        const taskData = new TaskSchema(newData);
        await taskData.save();
      }

      const newTaskData = await TaskSchema.find({ board_id: id });
      return NextResponse.json({ data: newTaskData });
    }
    return NextResponse.json({ data: taskData });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("get the body", body);
    await connectDB();
    const taskData = new TaskSchema(body);
    const newTaskData = await taskData.save();
    return NextResponse.json({ data: newTaskData });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}

const tasksData = [
  {
    task_id: "2t347tgf73t73t5",
    task_name: "Task in Progress",
    task_description: "",
    icon: "⏰",
    status: "In Progress",
  },
  {
    task_id: "fw78t874trg38",
    task_name: "Task Completed",
    task_description: "",
    icon: "🤖",
    status: "Completed",
  },
  {
    task_id: "hiuher8w38dii",
    task_name: "Tasks Won't Do",
    task_description: "",
    icon: "☕",
    status: "Won't do",
  },
  {
    task_id: "inw94756wy9h9h",
    task_name: "Task To Do",
    task_description: "Work on dev challenges , learn typescript",
    icon: "📚",
    status: "",
  },
];
