import { AssetCardParams } from "../../schemas/global"
import CardMedia from "../media/CardMedia";
import H3 from "../text/H3";
import CollectionTag from "./CollectionTag";
import MintTag from "./MintTag";

const AssetCard = ({ params }: AssetCardParams) => {

    const { 
        name,
        template_mint,
        collection,
        schema: {
            schema_name
        },
        data
    } = params;

    return (
        <section 
            className="bg-gray-800 m-4 p-4 flex flex-col items-center
                rounded-2xl shadow-xl transition duration-500 
                hover:scale-105 w-48">
            <div className="w-full flex justify-end mb-2">
                <MintTag
                    text={`#${template_mint}`}
                    className='' />
            </div>
            <div 
                className="mb-1">
                <CardMedia
                    src={data.img || data.video}
                    alt={name}
                    type={data.video ? 'video' : 'img'}
                    provider='ipfs'
                    className="mb-4" />
            </div>
            <div 
                className="flex flex-col items-center
                    text-center">
                <CollectionTag
                    name={collection.name}
                    id={collection.collection_name}
                    className='mb-1' />
                <H3
                    text={name}
                    className='mb-1' />
            </div>
        </section>
    )
}

export default AssetCard;