import { JSX } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface TextInputProps<Model extends FieldValues> {
  name: Path<Model>;
  label: string;
  placeholder?: string;
  type?: string;
  error?: string;
  register: UseFormRegister<Model>;
}

export function TextInput<Model extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  error,
  register,
}: TextInputProps<Model>): JSX.Element {
  return (
    <div className="">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...register(name)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
