import React from "react";
import DropDownList from "./DropDownList";
import { DropdownProvider } from "../../contexts/dropdown-context";

export default function DropDownInput({ children, ...props }) {
  return (
    <DropdownProvider {...props}>
      <div className="relative w-full">{children}</div>
    </DropdownProvider>
  );
}
