import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { FilterFormTask } from './filterFormTask'

interface FilterFormModalProps {
  onCloseModal(): void
}

export function FilterFormModal({ onCloseModal }: FilterFormModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content
        aria-describedby={undefined}
        className="fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 px-4 py-6 rounded-md w-full max-w-lg bg-blue-700 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <Dialog.Title className="text-2xl">Filtros</Dialog.Title>
          <Dialog.Close>
            <X className="w-6 h-6 hover:text-gray-400 transition-colors duration-200" />
          </Dialog.Close>
        </div>
        <FilterFormTask onCloseModal={onCloseModal} />
      </Dialog.Content>
    </Dialog.Portal>
  )
}
