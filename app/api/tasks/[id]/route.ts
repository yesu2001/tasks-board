import BoardSchema from "@/model/board";
import TaskSchema from "@/model/task";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }) {
  const { id } = params;
  try {
    let taskData;
    let boardInfo;
    await connectDB();
    const boardData = await BoardSchema.find({ board_id: id });
    if (!boardData || boardData.length === 0) {
      const boardData = {
        board_id: id,
        board_name: "My task Board",
        board_description: "Keep Tasks organized",
      };
      const newBoardData = new BoardSchema(boardData);
      await newBoardData.save();
      boardInfo = await BoardSchema.find({ board_id: id });
      taskData = await TaskSchema.find({ board_id: id });
      console.log("taskData", taskData);
      if (!taskData || taskData.length === 0) {
        for (const data of tasksData) {
          const newData = {
            ...data,
            board_id: id,
          };
          const taskData = new TaskSchema(newData);
          await taskData.save();
        }

        taskData = await TaskSchema.find({ board_id: id });
      }
      return NextResponse.json({ data: taskData, board: boardInfo[0] });
    }
    taskData = await TaskSchema.find({ board_id: id });
    return NextResponse.json({ data: taskData, board: boardData });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function DELETE(request: NextRequest, { params }) {
  const { id } = params;
  try {
    await connectDB();
    const deletedData = await TaskSchema.findByIdAndDelete(
      {
        _id: id,
      },
      { new: true }
    );
    console.log(deletedData);
    return NextResponse.json({ data: deletedData });
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
