"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "../assets/Logo.svg";
import editIcon from "../assets/Edit_duotone.svg";

export default function Header() {
  const [isEdit, setIsEdit] = useState(false);
  const [headerData, setHeaderData] = useState({
    boardName: "My task Board",
    boardDescription: "Keep Tasks organized",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeaderData((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-start justify-between md:justify-start gap-4">
      <div>
        <Image src={logo} alt="Task board Logo" width={50} height={50} />
      </div>
      {isEdit ? (
        <div className="flex flex-col space-y-2">
          <input
            name="boardName"
            type="text"
            placeholder={"Type a new board name"}
            value={headerData.boardName}
            onChange={handleChange}
            className="text-2xl md:text-5xl w-[340px]"
          />
          <input
            name="boardDescription"
            type="text"
            placeholder={"Type a new board description"}
            value={headerData.boardDescription}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <p className=" text-2xl md:text-5xl">{headerData.boardName}</p>
          <p>{headerData.boardDescription}</p>
        </div>
      )}
      <div className="mt-2">
        <button onClick={() => setIsEdit(true)}>
          <Image src={editIcon} alt="pencil icon" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
