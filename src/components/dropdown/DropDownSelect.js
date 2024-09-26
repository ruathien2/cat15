import React from "react";
import { useDropdown } from "../../contexts/dropdown-context";

export default function DropDownSelect({ placeholder }) {
  const { toggle, show } = useDropdown();
  return (
    <div
      className=" flex justify-between mb-3 top-full left-0 shadow-sm cursor-pointer w-full bg-[#E7ECF3] text-[#84878b] p-[16px] rounded-[8px]"
      onClick={toggle}
    >
      {placeholder}
      {!show ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="font-bold cursor-pointer size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="font-bold cursor-pointer size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 15.75 7.5-7.5 7.5 7.5"
          />
        </svg>
      )}
    </div>
  );
}
