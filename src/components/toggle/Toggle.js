import React from "react";
import useShow from "../../hooks/useShow";

export default function Toggle({ on = true, onClick = () => {} }) {
  return (
    <div
      className=" relative w-16 h-5 bg-[#E7ECF3] rounded-full p-2"
      onClick={onClick}
    >
      {on ? (
        <span className="absolute w-4 h-4 bg-orange-300 rounded-full right-1 top-2/4 -translate-y-2/4"></span>
      ) : (
        <span className="absolute w-4 h-4 bg-gray-500 rounded-full left-1 top-2/4 -translate-y-2/4"></span>
      )}{" "}
    </div>
  );
}
