import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
    return (
        <div className="flex border border-pink-300 rounded-2xl
            px-4 py-2">
            <input type="search" 
                placeholder="quick search anything"
                className="bg-gray-900 outline-0"></input>
            <SearchIcon className="h-6 w-6
                text-pink-300" />
        </div>
    )
}

export default SearchBar;