import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Filter } from 'lucide-react'
import { FilterFormModal } from './filterFormModal'

export function FilterTaskFormButton() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  function closeModal() {
    setIsOpenModal(false)
  }

  return (
    <Dialog.Root
      open={isOpenModal}
      onOpenChange={() => setIsOpenModal((state) => !state)}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex items-center gap-2 text-sm bg-blue-300 p-2 rounded-md hover:bg-blue-300/80 transition-colors duration-200"
        >
          <Filter className="w-4 h-4" />
          <p>Filtros</p>
        </button>
      </Dialog.Trigger>
      <FilterFormModal onCloseModal={closeModal} />
    </Dialog.Root>
  )
}
