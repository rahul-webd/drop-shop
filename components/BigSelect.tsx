import { Data } from "../schemas/global";
import ErrorBox from "./ErrorBox";
import SearchBar from "./SearchBar";
import Spinner from "./Spinner";

const BigSelect = ({ data }: { data: Data | undefined}) => {
    const d: string[] = data?.data;
    const e: string | undefined = data?.error;

    return (
        <section className="border border-pink-300 p-4
            rounded-2xl">
            <SearchBar />
            <div className="overflow-auto max-h-40 m-4 bg-gray-800
                rounded-2xl p-2">
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
        <div className="text-center m-1 font-medium text-pink-50">
            { name }
        </div>
    )
}

export default BigSelect;