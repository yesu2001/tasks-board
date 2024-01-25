import React, { useState } from "react";
import { TaskProps } from "../utils/types";
import Image from "next/image";
import pendingStatus from "../assets/Time_atack_duotone.svg";
import CompleteStatus from "../assets/Done_round_duotone.svg";
import Dontstatus from "../assets/close_ring_duotone.svg";
import Drawer from "./Drawer";

const Task: React.FC<TaskProps> = ({
  task,
  onDelete,
  onSave,
  isEdit,
  setIsEdit,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setIsEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsEdit(false);
  };

  return (
    <>
      <div
        className={`w-[100%] md:w-[500px]  cursor-pointer max-w-xl flex gap-4 items-center p-3 ${
          task.status === "" && "bg-[#E3E8EF]"
        } ${task.status === "Won't do" && "bg-[#F7D4D3]"} ${
          task.status === "In Progress" && "bg-[#F5D565]"
        } ${task.status === "Completed" && "bg-[#A0ECB1]"} rounded-lg `}
        onClick={handleOpen}
      >
        <div className="bg-white rounded-lg h-70 w-70 p-2">
          <p className="text-xl">{task?.icon}</p>
        </div>
        <div className="flex-1 w-[80%]">
          <p className="font-semibold">{task?.task_name}</p>
          {task?.task_description && (
            <p className="text-sm">{task?.task_description}</p>
          )}
        </div>
        {task?.status?.length > 0 && (
          <>
            {task.status === "In Progress" && (
              <div className="bg-[#E9A23B] rounded-lg p-3">
                <Image
                  src={pendingStatus}
                  alt="status icon"
                  width={20}
                  height={20}
                />
              </div>
            )}
            {task.status === "Completed" && (
              <div className="bg-[#32D657] rounded-lg p-3">
                <Image
                  src={CompleteStatus}
                  alt="status icon"
                  width={20}
                  height={20}
                />
              </div>
            )}
            {task.status === "Won't do" && (
              <div className="bg-[#DD524C] rounded-lg p-3">
                <Image
                  src={Dontstatus}
                  alt="status icon"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </>
        )}
      </div>
      {open && (
        <Drawer
          isOpen={open}
          onClose={handleClose}
          data={task}
          onDelete={onDelete}
          onSave={onSave}
          isEdit={isEdit}
        />
      )}
    </>
  );
};

export default Task;
