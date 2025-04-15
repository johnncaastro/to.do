import * as Select from '@radix-ui/react-select'
import { Check } from 'lucide-react'

export type SelectItemProps = Select.SelectItemProps & {
  text: string
}

export function SelectItem({ text, ...props }: SelectItemProps) {
  return (
    <Select.Item
      className="flex items-center text-white hover:bg-gray-400 justify-between gap-2 p-2 outline-none cursor-pointer transition-colors duration-200"
      {...props}
    >
      <Select.ItemText asChild>
        <span>{text}</span>
      </Select.ItemText>
      <Select.ItemIndicator>
        <Check className="h-5 w-5" />
      </Select.ItemIndicator>
    </Select.Item>
  )
}
