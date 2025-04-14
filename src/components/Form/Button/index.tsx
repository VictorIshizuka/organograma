import { JSX } from "react";

export function Button({ label }: { label: string}): JSX.Element {
  return (
      <button type="submit" className={`btn text-white w-100 w-md-auto`} style={{backgroundColor: "#6278f7"}}>
        {label}
      </button>
  );
}