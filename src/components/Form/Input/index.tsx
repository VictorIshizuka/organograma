import { JSX, Ref } from "react";

interface TextInputProps {
  name: string;
  label: string;
  className?: string;
  type?: string;
  ref?: Ref<HTMLInputElement>;
  placeholder?: string;
}

export function TextInput({
  name,
  label,
  placeholder,
  type,
  className,
  ref,
}: TextInputProps): JSX.Element {
  return (
    <div className="">
      <label className={`form-label ${className || ""}`}>{label}</label>
      <input
        ref={ref}
        type={`${type || "text"}`}
        name={name}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
  );
}
