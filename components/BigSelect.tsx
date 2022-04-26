import { Data } from "../schemas/global";
import ErrorBox from "./ErrorBox";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

const BigSelect = ({ data }: { data: Data | undefined}) => {
    let d: string[] = []
    let e: string = ''

    if (data) {
        d = Object.values(data.data);
        e = data.error;
    }

    return (
        <section className="p-4 rounded-2xl bg-gray-900 border
            border-blue-400">
            <SearchBar />
            <div className="overflow-auto max-h-44 m-4 bg-gray-800
                rounded-2xl p-2 ">
                {
                    data
                        ? d
                            ? d.map((name: string, i: number) => {
                                return <Option name={name} key={i} />
                            })
                            : e 
                                ? <ErrorBox message={e} />
                                : <ErrorBox message="" />
                        : <Spinner />
                }
            </div>
        </section>
    )
}

const Option = ({ name }: { name: string }) => {
    return (
        <div className="text-center m-1 text-blue-100">
            { name }
        </div>
    )
}

export default BigSelect;