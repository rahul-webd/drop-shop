import { Drop } from "../schemas/global";
import Button from "./Button";
import H1 from "./H1";
import H2 from "./H2";
import Media from "./Media";
import Tag from "./Tag";

const ShopItem = ({ item }: { 
    item: Drop
}) => {
    
    const { 
        item: { 
            Memo, 
            CollectionName, 
            Price: { contract, quantity },
            SchemaName
            },
        templateData: { immutable_data: { img, video, name } }
        } = item

    return (
        <section className="bg-gray-900 m-4 flex flex-col justify-center
            items-center text-center p-4 w-52 rounded-xl shadow-md
            transition duration-500 hover:scale-105">
            <div className="mb-4">
                {
                    item.templateData
                        && <Media 
                                h='h-40' 
                                w='w-40'
                                src={img || video}
                                alt={name}
                                type={(img && "img") || (video && "video")}
                                provider="ipfs" />
                }
            </div>
            {
                item.item
                    && <div className="flex flex-col items-center">
                        <H1 text={name} className='mb-1 text-blue-100' />
                        <H2 
                            text={CollectionName} 
                            className='text-blue-300 mb-2' />
                        <Tag text={SchemaName} className='mb-2' />
                        <H2 
                            text={
                                `price: ${Number(quantity.split(' ')[0])
                                .toFixed(0)} ${quantity.split(' ')[1]}`
                            }
                            className='text-blue-100 capitalize mb-2' />
                        <Button
                            name="buy"
                            onClick={undefined}
                            variant='filled'
                            className="px-6 py-1" />
                    </div>
            }
        </section>
    )
}

export default ShopItem;
