import { JSX } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type SelectInputProps<Model extends FieldValues> = {
  label: string;
  name: Path<Model>;
  error?: string;
  options: Option[];
  register: UseFormRegister<Model>;
};

export function SelectInput<Model extends FieldValues>({
  label,
  name,
  error,
  options,
  register,
  ...rest
}: SelectInputProps<Model>): JSX.Element {
  return (
    <div>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <select
        {...register(name)}
        id={name}
        name={name}
        className={`form-select ${error ? "is-invalid" : ""}`}
        {...rest}
      >
        <option disabled value="">
          Selecione uma opção
        </option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}
