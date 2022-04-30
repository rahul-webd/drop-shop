import { SearchIcon } from "@heroicons/react/outline";

const SearchBar = () => {
    return (
        <div className="flex rounded-2xl
            px-4 py-2 bg-gray-800 items-center">
            <input type="search" 
                placeholder="quick search anything"
                className="bg-gray-800 outline-0"></input>
            <SearchIcon className="h-5 w-5
                text-gray-400" />
        </div>
    )
}

export default SearchBar;