import React from "react";

type CheckboxProps = {
  id: string;
  label: string;
  register: any;
  value?: boolean
};

const Checkbox: React.FC<CheckboxProps> = ({ id, label, register, value }) => {
  return (
    <div className="flex cursor-pointer items-center">
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        className="input_field_checkbox peer"
        value={value}
      />
      <svg
        className="input_field_checkmark"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      <label
        htmlFor={id}
        className="xs:text-base ml-2 text-sm font-semibold lg:text-lg"
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
