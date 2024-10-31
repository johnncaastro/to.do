import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export function Input({ label, name, ...rest }: InputProps) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="text-gray-400 text-sm mb-1"
      >
        {label}
      </label>
      <input
        {...rest}
        id={name}
        name={name}
        type="text"
        className="bg-blue-500 w-full rounded-md px-2 py-1"
      />
    </div>
  )
}