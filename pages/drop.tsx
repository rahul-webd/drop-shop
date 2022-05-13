import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import Button from "../components/Button";
import H1 from "../components/text/H1";
import H2 from "../components/text/H2";
import H3 from "../components/text/H3";
import Media from "../components/media/Media";
import Tag from "../components/Tag";
import { AtomicRes, Data, ShopItem, Template } from "../schemas/global";
import { getDrop } from "../utils/api";
import { convertMillisToTime, getErrorAlertParams, getMillisLeft, 
    isTimeEnded, 
    noDataFoundParams} from "../utils/helpers";
import { MainContext } from '../components/Layout';
import { getTemplate } from "../utils/atomicAssets";

type DropData = {
    drop: ShopItem | undefined,
    immData: any
}

type Drop = DropData | undefined;

const DropPage: NextPage = () => {
    const router = useRouter();
    const { memo } = router.query;
    const [data, setData] = useState<Drop>();
    const [isDropEnded, setIsDropEnded] = useState(false);
    const [msLeft, setMsLeft] = useState(0);
    const [startTimeLeft, setStartTimeLeft] = 
        useState('- days, --:--:--');

    const { buyShopItem, setAlert } = useContext(MainContext);

    useEffect(() => {
        let isMounted = true;

        handleDropData();

        return () => {
            isMounted = false;
        }
    }, [memo]);

    const handleDropData = async () => {

        if (memo && typeof memo === 'string') {

            const dropData: Data = await getDrop(memo);
            let drop: ShopItem | undefined = undefined;
            let immData: any = undefined;

            if (dropData && !dropData.error && dropData.data) {
                drop = dropData.data;

                if (drop?.item.Memo) {
                    const id: string = drop.item.TemplateId.toString();

                    const d: Data = 
                        await getTemplate(id);

                    if (!d.error && d.data) {

                        const a: AtomicRes = d.data;

                        if (a.success && a.data) {

                            const ts: Template[] = a.data;

                            if (ts.length) {

                                const t: Template = ts[0]

                                let i: any = t.immutable_data;

                                if (i) {
                                    immData = i;

                                    let d: DropData = {
                                        drop,
                                        immData: i
                                    }

                                    setData(d);

                                    if (drop.limits) {

                                        const { StartTime, StopTime } 
                                            = drop.limits;
    
                                        setIsDropEnded(isTimeEnded(StopTime));
                                        setMsLeft(getMillisLeft(StartTime));

                                    }
                                } else {

                                    setAlert(getErrorAlertParams(`no 
                                        immutable  data found on template`))
                                }
                            } else {

                                setAlert(noDataFoundParams);
                            }
                        } else {

                            setAlert(getErrorAlertParams(a.data));
                        }
                    } else {

                        setAlert(getErrorAlertParams(d.error))
                    }
                }
            } else {

                setAlert(getErrorAlertParams(dropData.error))
            }
        } else {

            setAlert(noDataFoundParams);
        }
    }

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

    return (
        <section className="flex flex-col items-center
            lg:flex-row lg:justify-center">
            <div className="mb-4 flex flex-col items-center
                lg:items-start md:mt-8 lg:mt-12 xl:mt-16 lg:mr-16">
                <H1
                    text={data?.drop?.item.CollectionName || 'collection'}
                    className='mb-8 lg:ml-4'/>
                <section className="flex flex-col items-center">
                    <article className="bg-gray-800 p-4 rounded-3xl
                        mb-4">
                        {
                            <Media
                                src={
                                    data?.immData.img || 
                                        data?.immData.video
                                }
                                alt={data?.immData.name || 'name'}
                                h='h-48 md:h-60 lg:h-76 xl:h-96'
                                w='w-48 md:w-60 lg:w-76 xl:w-96'
                                type={
                                    (data?.immData.video && 'video') ||
                                    'img'
                                }
                                provider='ipfs'
                                className="" />
                        }
                    </article>
                    <article className="flex flex-col items-center
                        mb-4">
                        <Tag
                            text={data?.drop?.item.SchemaName || 
                                'schema'}
                            fontSize='text-lg'
                            variant="primary"
                            className="mb-2" />
                        <H3
                            text={`#${data?.drop?.item.TemplateId}` || 
                                'template ID'}
                            className='text-gray-400' />
                    </article>
                </section>
            </div>
            <div>
                <article className="bg-gray-800 p-4 rounded-2xl mb-8">
                    <table className="table">
                        <tbody>
                            {
                                Object.keys(data?.immData || []).map((k, i) => {

                                    return (
                                        <tr key={i}>
                                            <td className="px-2 py-4
                                                capitalize">
                                                { k }
                                            </td>
                                            <td className={
                                                `break-all py-2
                                                px-4`
                                            }>
                                                { data?.immData[k] }
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </article>
                <article className="bg-gray-800 capitalize
                    px-8 py-4 mb-8 rounded-3xl flex justify-around">
                    <H3
                        text={
                            `left: ${data?.drop?.limits?.
                                LeftToSell !== undefined 
                                ? data?.drop?.limits?.
                                LeftToSell 
                                : '--'}`
                        }
                        className={undefined} />
                    <H3
                        text={
                            `max: ${data?.drop?.limits?.
                                MaxToSell !== undefined
                                ? data?.drop?.limits?.
                                MaxToSell
                                : '--'}`
                        }
                        className={undefined} />
                </article>
                <article className="flex flex-col items-center">
                    {
                        msLeft > 0
                            && <H3
                                    text={`starting in ${startTimeLeft}`}
                                    className='mb-4' />
                    }
                    <H2
                        text={`price: ${Number(data?.drop?.item?.Price
                            .quantity.split(' ')[0]).toFixed(0)} 
                            ${data?.drop?.item?.Price.quantity.
                                split(' ')[1] || '--'}`}
                        className='capitalize mb-4' />
                    <Button
                        name='buy'
                        onClick={() => {
                            if (data && data.drop && data.drop.item) {
                                const { Price: {
                                    quantity,
                                    contract
                                }, Memo } = data.drop.item;
                                buyShopItem(quantity, contract, Memo);
                            }
                        }}
                        variant='filled'
                        className='px-12 text-lg mb-16'
                        disabled={isDropEnded || msLeft !== 0} />
                </article>
            </div>
        </section>
    )
}

export default DropPage;