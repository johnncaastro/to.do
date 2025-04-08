import { forwardRef, HTMLProps } from 'react'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  name: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    return (
      <div className="w-full mt-2">
        <label htmlFor={props.name} className="text-gray-400 text-sm mb-1">
          {props.label}
        </label>
        <input
          type="text"
          className="bg-blue-500 w-full rounded-md px-2 py-1"
          {...props}
          ref={ref}
        />
      </div>
    )
  },
)
