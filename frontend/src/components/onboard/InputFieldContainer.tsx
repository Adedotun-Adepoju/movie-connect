import { FC, ReactNode } from "react";
interface InputFieldContainerProps {
  label: string;
  id: string;
  children: ReactNode;
  error?: string;
}

const InputFieldContainer = ({
  label,
  id,
  error,
  children,
}: InputFieldContainerProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="mb-2 block text-lg font-semibold text-dark"
      >
        {label}
      </label>
      {children}
      {error && (
        <span className="text-warning text-sm font-semibold">{error}</span>
      )}
    </div>
  );
};
export default InputFieldContainer;
