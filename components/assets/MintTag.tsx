import { MintTag } from "../../schemas/global";
import H5 from "../text/H5";

const MintTag = ({ text, className }: MintTag) => {

    return (
        <section 
            className={`border border-gray-600 text-gray-00 
                font-medium rounded-full px-2 py-1 ${className}`}>
            <H5
                text={text}
                className='' />
        </section>
    )
}

export default MintTag;