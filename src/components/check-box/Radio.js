import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        onChange={() => {}}
        checked={checked}
        type="radio"
        className="hidden hidden-input"
        {...field}
        {...rest}
      />
      <div className="flex items-center font-medium cursor-pointer gap-x-3">
        <div
          className={`w-4 h-4 rounded-full ${
            checked ? "bg-orange-400" : "bg-gray-200"
          }`}
        ></div>
        <span className="">{children}</span>
      </div>
    </label>
  );
};

export default Radio;
