import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Drop } from "../../schemas/global";
import { convertMillisToTime, getMillisLeft, 
    isTimeEnded, 
    loginAlertParams} from "../../utils/helpers";
import Button from "../Button";
import H3 from "../text/H3";
import H4 from "../text/H4";
import Media from "../media/Media";
import Tag from "../Tag";
import { MainContext } from "../Layout";
import CardMedia from "../media/CardMedia";
import LinkDrop from "../links/LinkDrop";

const ShopItem = ({ item }: { 
    item: Drop
}) => {
    const [isDropEnded, setIsDropEnded] = useState(false);
    const [msLeft, setMsLeft] = useState(0);
    const [startTimeLeft, setStartTimeLeft] = 
        useState('- days, --:--:--');
    const { buyShopItem, setAlert, address } = useContext(MainContext);

    const { limits } = item;

    const { 
        item: { 
            Memo, 
            CollectionName, 
            Price: { contract, quantity },
            SchemaName,
            },
        templateData: { immutable_data: { img, video, name } }
        } = item;

    useEffect(() => {
        let isMounted = true;

        if (limits) {
            isMounted
                && setIsDropEnded(isTimeEnded(limits.StopTime));

            isMounted
                && setMsLeft(getMillisLeft(limits.StartTime));
        }

        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;

        const Second = 1000;
        let stlInterval: any = undefined;

        if (msLeft) {
            stlInterval = setInterval(() => {

                const timeLeft = convertMillisToTime(msLeft);
                isMounted && setStartTimeLeft(timeLeft);
                const m = msLeft - Second;
                if (m > 0) {
                    setMsLeft(msLeft);
                } else {
                    setMsLeft(0);
                }
            }, Second);
        }

        return () => {
            isMounted = false;
            clearInterval(stlInterval);
        }
    }, []);

    const handleBuyDrop = async () => {

        if (address) {

            await buyShopItem(quantity, contract, Memo);
        } else {

            setAlert(loginAlertParams)
        }
    }

    return (
        <section className="bg-gray-900 m-4 flex flex-col justify-center
            items-center text-center p-4 w-52 rounded-xl shadow-md
            transition duration-500 hover:scale-105">
            <div className="mb-4">
                {
                    item.templateData
                        && (
                            <LinkDrop memo={Memo} className=''>
                                <CardMedia 
                                    src={img || video}
                                    alt={name}
                                    type={(img && "img") || (video && "video")}
                                    provider="ipfs"
                                    className="" />
                            </LinkDrop>
                        )
                }
            </div>
            {
                item.item
                    && <div className="flex flex-col items-center">
                        <LinkDrop memo={Memo} className=''>
                            <H3 text={name} className='mb-1' />
                        </LinkDrop>
                        <H4 
                            text={CollectionName} 
                            className='text-green-200 mb-2' />
                        <Tag 
                            text={SchemaName} 
                            fontSize='text-xs'
                            variant='primary'
                            className='mb-2' />
                        {
                            limits
                                && <div className="flex mb-2">
                                    <Tag 
                                        text={`${limits.LeftToSell} left`}
                                        fontSize='text-xs'
                                        className='mr-2'
                                        variant="warning" />
                                    {
                                        isDropEnded
                                            && <Tag
                                                text='ended'
                                                fontSize="text-xs"
                                                className={undefined}
                                                variant='danger' />
                                    }
                                </div>
                            }
                        <H4
                            text={
                                `price: ${Number(quantity.split(' ')[0])
                                .toFixed(0)} ${quantity.split(' ')[1]}`
                            }
                            className='text-blue-100 capitalize mb-2' />
                        <Button
                            name="buy"
                            onClick={handleBuyDrop}
                            variant='filled'
                            className="px-6 py-1"
                            disabled={isDropEnded || msLeft !== 0} />
                        {
                            msLeft > 0 &&
                                <H3
                                    text={`starting in ${startTimeLeft}`}
                                    className='w-full bg-green-300
                                        text-green-900' />
                        }
                    </div>
            }
        </section>
    )
}

export default ShopItem;
