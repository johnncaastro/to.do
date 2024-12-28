import { FormEvent } from "react";
import { useTasks } from "../hooks/useTasks";
import { Search } from "lucide-react";

export function SearchFormTask() {
  const { loadTasks } = useTasks()

  function handleSearchTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const searchInput = String(formData.get('search'))

    loadTasks(searchInput)
  }

  return (
    <form
      onSubmit={handleSearchTask}
      className="flex flex-1 h-full max-w-lg items-center justify-between gap-2 bg-blue-500 px-2 py-1 rounded-md">
      <input 
        type="text"
        name="search"
        placeholder="Busque por tasks..." 
        className="bg-transparent outline-none w-full" 
      />
      <button type="submit">
        <Search className="w-6 h-6" />
      </button>
    </form>
  )
}