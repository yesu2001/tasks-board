import { DrawerProps, DrawerState } from "@/utils/types";
import Image from "next/image";
import React, { useState } from "react";
import deleteIcon from "../assets/Trash.svg";
import saveIcon from "../assets/Done_round.svg";
import closeIcon from "../assets/close_ring_duotone-1.svg";
import progressIcon from "../assets/Time_atack_duotone.svg";
import completedIcon from "../assets/Done_round_duotone.svg";
import noIcon from "../assets/close_ring_duotone.svg";
import { generateUniqueId } from "@/utils/generateUid";

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  data,
  onDelete,
  onSave,
  isEdit,
}) => {
  const icons = ["🧑🏼‍💻", "💬", "☕", "🏋️", "📚", "⏰"];
  const statuses = [
    { name: "In Progress", icon: progressIcon },
    { name: "Completed", icon: completedIcon },
    { name: "Won't do", icon: noIcon },
  ];
  const [taskName, setTaskName] = useState(data?.task_name || "");
  const [taskDescription, setTaskDescription] = useState(
    data?.task_description || ""
  );
  const [taskIcon, setTaskIcon] = useState(data?.icon || icons[0]);
  const [taskStatus, setTaskStatus] = useState(data?.status || "");

  const handleClose = () => {
    onClose();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const handleSelectIcon = (icon: any) => {
    setTaskIcon(icon);
  };

  const handleSelectStatus = (status: any) => {
    setTaskStatus(status.name);
  };

  const handleDelete = () => {
    onDelete(data);
  };

  const handleSave = () => {
    if (taskName === "") {
      return;
    }
    const taskData = {
      ...data,
      task_id: generateUniqueId(),
      task_name: taskName,
      task_description: taskDescription,
      icon: taskIcon,
      status: taskStatus,
    };
    onSave(taskData);
    setTaskName("");
    setTaskDescription("");

    onClose();
  };

  return (
    <section
      className={
        "fixed z-50 top-0 right-0 w-screen max-w-lg  bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
        (isOpen ? " translate-x-0 " : " translate-x-full ")
      }
    >
      <article className="relative w-screen max-w-lg flex flex-col overflow-y-scroll h-full p-6 space-y-4">
        <header className=" font-bold text-lg">
          <p>Task Details</p>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          >
            <Image src={closeIcon} alt="close icon" width={25} height={25} />
          </button>
        </header>
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#97A3B6]">Task name</label>
            <input
              required
              name="task_name"
              type="text"
              placeholder="task name"
              value={taskName}
              onChange={handleNameChange}
              className="outline-2 outline-[#3662E3] border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#97A3B6]">Description</label>
            <textarea
              name="task_description"
              rows={5}
              placeholder="Enter a short desciption"
              value={taskDescription}
              onChange={handleDescriptionChange}
              className="resize-none outline-2 outline-[#3662E3] border rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#97A3B6]">Icon</label>
            <div className="flex gap-2 items-center">
              {icons.map((icon, index) => (
                <p
                  key={index}
                  className={`${
                    taskIcon === icon ? "bg-[#F5D565]" : "bg-[#E3E8EF]"
                  } p-1 rounded-md text-2xl cursor-pointer`}
                  onClick={() => handleSelectIcon(icon)}
                >
                  {icon}
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-[#97A3B6]">Status</label>
            <div className="flex flex-wrap items-center gap-2 space-y-1">
              {statuses.map((status, index) => (
                <div
                  key={index}
                  className={`flex gap-4 items-center border-2 border-[#E3E8EF] hover:border-[#3662E3] transition-all duration-150 rounded-xl p-1 w-[250px] cursor-pointer`}
                  onClick={() => handleSelectStatus(status)}
                >
                  <div
                    className={`p-2 ${
                      status.name === "Won't do" && "bg-[#DD524C]"
                    } ${status.name === "In Progress" && "bg-[#E9A23B]"} ${
                      status.name === "Completed" && "bg-[#32D657]"
                    } rounded-lg `}
                  >
                    <Image
                      src={status.icon}
                      alt="icon"
                      width={20}
                      height={20}
                    />
                  </div>
                  <p key={index} className="flex-1 text-sm">
                    {status.name}
                  </p>
                  {taskStatus === status.name && (
                    <div className="bg-[#3662E3] rounded-full ml-2">
                      <Image src={saveIcon} alt="icon" width={15} height={15} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className="px-4 py-1 bg-[#97A3B6] text-white flex gap-2 items-center rounded-2xl"
            onClick={handleDelete}
          >
            <p>Delete</p>
            <Image src={deleteIcon} alt="delete Icon" width={20} height={20} />
          </button>
          <button
            className="px-4 py-1 bg-[#3662E3] text-white flex gap-2 items-center rounded-2xl"
            onClick={handleSave}
          >
            <p>Save</p>
            <Image src={saveIcon} alt="delete Icon" width={20} height={20} />
          </button>
        </div>
      </article>
    </section>
  );
};

export default Drawer;
