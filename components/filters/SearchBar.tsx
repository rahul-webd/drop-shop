import { SearchIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { SearchBar } from "../../schemas/global";

const SearchBar = ({ placeHolder, query, setQuery, 
    className }: SearchBar) => {

    return (
        <div 
            className={`flex rounded-2xl
                px-4 py-2 bg-gray-800 items-center ${className}`}>
            <article 
                className="flex items-center w-44 mr-2">
                <input
                    value={query}
                    placeholder={placeHolder}
                    className="bg-gray-800 outline-0 w-40
                        capitalize"
                    onChange={e => {
                        setQuery(e.currentTarget.value)
                    }}>
                </input>
                {
                    query
                        && <XIcon 
                                className="h-5 w-5 cursor-pointer
                                    font-medium"
                                onClick={() => {
                                    setQuery('');
                                }} />
                }
            </article>
            <SearchIcon 
                className="h-5 w-5
                    text-gray-400" />
        </div>
    )
}

export default SearchBar;