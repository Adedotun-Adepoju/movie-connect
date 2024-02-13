import React from "react";

type CheckboxProps = {
  id: string;
  label: string;
  register: any;
};

const Checkbox: React.FC<CheckboxProps> = ({ id, label, register }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        {...register(id)}
        className="input_field_checkbox peer"
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
      <label htmlFor={id} className="ml-2 text-lg font-semibold text-dark">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
