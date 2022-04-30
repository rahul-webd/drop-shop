import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import H1 from "../components/H1";
import H2 from "../components/H2";
import H3 from "../components/H3";
import Media from "../components/Media";
import Tag from "../components/Tag";
import { Data, ShopItem } from "../schemas/global";
import { getDrop, getTemplates } from "../utils/api";
import { convertMillisToTime, getMillisLeft, isTimeEnded } from "../utils/helpers";

type DropData = {
    drop: ShopItem | undefined,
    immData: any
}

type Drop = DropData | undefined;

const getData = async (memo: string) => {
    const dropData: Data = await getDrop(memo);
    let drop: ShopItem | undefined = undefined;
    let immData: any = undefined;

    if (dropData && !dropData.error && dropData.data) {
        drop = dropData.data;

        if (drop?.item.Memo) {
            const memo = drop.item.Memo;

            const templateData: Data = 
                await getTemplates(memo, undefined);

            if (templateData && !templateData.error
                    && templateData.data) {

                let i: any = templateData.data[0]
                    .TemplateData.immutable_data
                
                if (i) {
                    immData = i;
                }
            }
        }
    }

    return {
        drop,
        immData
    }
}

const DropPage: NextPage = () => {
    const router = useRouter();
    const { memo } = router.query;
    const [data, setData] = useState<Drop>();
    const [isDropEnded, setIsDropEnded] = useState(false);
    const [msLeft, setMsLeft] = useState(0);
    const [startTimeLeft, setStartTimeLeft] = 
        useState('- days, --:--:--');

    useEffect(() => {
        let isMounted = true;

        if (memo && typeof memo === 'string') {
            getData(memo).then((data: DropData) => {

                if (data.drop && data.immData) {
                    isMounted && setData(data);

                    const l = data.drop.limits;

                    if (l) {
                        isMounted
                        && setIsDropEnded(isTimeEnded(l.StopTime));

                        isMounted
                        && setMsLeft(getMillisLeft(l.StartTime));
                    }
                }
            })
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
                            provider='ipfs' />
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
                                                `${((k === 'img' ||
                                                k === 'video') &&
                                                'break-all') || ''} py-2
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
                    <Button
                        name='buy'
                        onClick={() => {}}
                        variant='filled'
                        className='px-12 text-lg mb-16'
                        disabled={isDropEnded || msLeft !== 0} />
                </article>
            </div>
        </section>
    )
}

export default DropPage;