import { CollectionTag } from "../../schemas/global";
import H5 from "../text/H5";

const CollectionTag = ({ name, id, className }: CollectionTag) => {

    return (
        <section 
            className={`border-2 border-gray-600 rounded-full
                p-1 ${className}`}>
            <H5
                text={name}
                className='px-1' />
        </section>
    )
}

export default CollectionTag;