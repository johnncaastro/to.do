import { Search } from "lucide-react";

export function SearchFormTask() {
  return (
    <form 
      className="flex flex-1 h-full max-w-md items-center justify-between gap-2 bg-blue-500 px-2 py-1 rounded-md">
      <input 
        type="text" 
        placeholder="Busque por tasks..." 
        className="bg-transparent outline-none w-full" 
      />
      <button type="submit">
        <Search className="w-6 h-6" />
      </button>
    </form>
  )
}