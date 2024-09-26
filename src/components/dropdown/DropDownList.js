import React, { useEffect, useRef } from "react";
import { useDropdown } from "../../contexts/dropdown-context";

export default function DropDownList({ children }) {
  const { show, setShow } = useDropdown();

  return (
    <>
      {show && (
        <div className="w-full absolute top-full left-0 shadow-md bg-white text-[#84878b] rounded-[8px] z-10 h-[210px] overflow-y-scroll no-scrollbar scroll-smooth">
          {children}
        </div>
      )}
    </>
  );
}
