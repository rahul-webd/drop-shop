import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BigSelect, Data } from "../../schemas/global";
import SearchBar from "./SearchBar";
import Spinner from "../Spinner";

const BigSelect = ({ data, setSelect, setDefault }: BigSelect) => {

    const defaultSelection = '';

    const [selected, setSelected] = useState(defaultSelection);
    const [query, setQuery] = useState('');
    const [collections, setCollections] = useState<string[]>();
    const [filteredCollections, setFilteredCollections] 
        = useState<string[]>();

    useEffect(() => {
        let isMounted = true;
        
        if (selected !== defaultSelection) {
            isMounted && setSelect(selected)
        } else {
            isMounted && setDefault(defaultSelection);
        }

        return () => {
            isMounted = false;
        }
    }, [selected]);

    useEffect(() => {

        if (data) {

            if (!data.error && data.data) {

                setCollections(data.data);
                setFilteredCollections(data.data);
            }
        }
    }, [data]);

    useEffect(() => {

        if (collections && collections.length) {

            const fc = collections.filter(c => c.includes(query));
            setFilteredCollections(fc);
        }
    }, [query]);

    return (
        <section 
            className="p-4 rounded-3xl bg-gray-900 border
                border-gray-700 shadow-lg">
            <SearchBar 
                placeHolder="filter collections"
                query={query} 
                setQuery={setQuery}
                className={undefined} />
            <div 
                className="overflow-auto max-h-44 m-4 bg-gray-800
                    rounded-2xl p-2">
                <div 
                    className="w-full flex flex-col justify-center
                        items-center">
                    {
                        filteredCollections && filteredCollections.length
                            ? filteredCollections.map((name: string, i: number) => {
                                return <Option 
                                    name={name} 
                                    key={i}
                                    selected={selected}
                                    defaultSelection={defaultSelection}
                                    setSelected={setSelected} />
                            })
                            : <Spinner />
                    }
                </div>
            </div>
        </section>
    )
}

// overflow-auto does not go well with flex

const Option = ({ name, defaultSelection, selected, setSelected }: { 
    name: string,
    selected: string,
    defaultSelection: string,
    setSelected: Dispatch<SetStateAction<string>>
    }) => {

    return (
        <div 
            className={`text-center m-1 cursor-pointer
                ${selected === name ? 'text-green-300': 'text-green-50'}`}
            onClick={() => {
                setSelected(prev => 
                    name !== prev 
                        ? name 
                        : defaultSelection 
                    )
            }}>
            { name }
        </div>
    )
}

export default BigSelect;