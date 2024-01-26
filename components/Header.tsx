"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import logo from "../assets/Logo.svg";
import editIcon from "../assets/Edit_duotone.svg";
import { updateBoardByIdInDB } from "@/utils/dbHelpers";

export default function Header({ board }: any) {
  const boardNameRef = useRef<HTMLInputElement>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [headerData, setHeaderData] = useState({
    boardName: board[0]?.board_name || "My task Board",
    boardDescription: board[0]?.board_description || "Keep Tasks organized",
  });

  const handleOnEdit = () => {
    setIsEdit(true);
    if (boardNameRef.current) {
      boardNameRef.current.focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveBoard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBoardData = {
      ...board[0],
      board_name: headerData.boardName,
      board_description: headerData.boardDescription,
    };
    const data = await updateBoardByIdInDB(newBoardData);
    setHeaderData((prevState) => ({
      boardName: data?.board_name,
      boardDescription: data?.board_description,
    }));
    setIsEdit(false);
  };

  return (
    <div className="flex items-start justify-between md:justify-start gap-4">
      <div>
        <Image src={logo} alt="Task board Logo" width={50} height={50} />
      </div>
      {isEdit ? (
        <form onSubmit={handleSaveBoard}>
          <div className="flex flex-col space-y-2">
            <input
              ref={boardNameRef}
              name="boardName"
              type="text"
              placeholder={"Type a new board name"}
              value={headerData.boardName}
              onChange={handleChange}
              className={`px-2 text-2xl md:text-5xl w-[340px] ${
                isEdit ? "border border-slate-800 rounded-md" : ""
              }`}
            />
            <input
              name="boardDescription"
              type="text"
              placeholder={"Type a new board description"}
              value={headerData.boardDescription}
              onChange={handleChange}
              className={`px-2 ${
                isEdit ? "border border-slate-800 rounded-md" : ""
              }`}
            />
            {isEdit && (
              <div className="flex justify-end">
                <input
                  type="submit"
                  className="bg-green-500 text-white px-3 py-1 cursor-pointer rounded-md"
                  value="Save"
                />
              </div>
            )}
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p className=" text-2xl md:text-5xl">{headerData.boardName}</p>
          <p>{headerData.boardDescription}</p>
        </div>
      )}
      <div className="mt-2">
        <button onClick={handleOnEdit}>
          <Image src={editIcon} alt="pencil icon" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
