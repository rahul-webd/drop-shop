import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Data } from "../schemas/global";
import ErrorBox from "./ErrorBox";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

const BigSelect = ({ data, setSelect, setDefault }: 
    { 
        data: Data | undefined,
        setSelect: any,
        setDefault: any
    }) => {

    let d: string[] = []
    let e: string = ''
    const defaultSelection = '';

    const [selected, setSelected] = useState(defaultSelection);

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

    if (data) {
        d = Object.values(data.data);
        e = data.error;
    }

    return (
        <section className="p-4 rounded-3xl bg-gray-900 border
            border-gray-700 shadow-lg">
            <SearchBar />
            <div className="overflow-auto max-h-44 m-4 bg-gray-800
                rounded-2xl p-2">
                <div className="w-full flex flex-col justify-center
                    items-center">
                    {
                        data
                            ? d
                                ? d.map((name: string, i: number) => {
                                    return <Option 
                                        name={name} 
                                        key={i}
                                        selected={selected}
                                        defaultSelection={defaultSelection}
                                        setSelected={setSelected} />
                                })
                                : e 
                                    ? <ErrorBox message={e} />
                                    : <ErrorBox message="" />
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