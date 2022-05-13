import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import BigSelect from "../components/filters/BigSelect";
import { AtomicRes, Data, Drop, ShopItems, Template, TemplateObj } from "../schemas/global";
import { getCollectionDrops, getCollectionNames, getShopItems, 
    getTemplates } from "../utils/api";
import type { NextPage } from "next";
import Container from "../components/Container";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ShopItem from "../components/shop/ShopItem";
import { MainContext } from "../components/Layout";
import { closeAlertParams, getErrorAlertParams, noDataFoundParams } from "../utils/helpers";
import { getTemplatesByIds } from "../utils/atomicAssets";

const defaultCol: string = 'all';

const Shop: NextPage = () => {
    const [colData, setColData] = useState<Data | undefined>();
    const [drops, setDrops] = useState<Drop[] | undefined>();
    const [currentCol, setCurrentCol] = useState<string>('');
    const [lowerBound, setLowerBound] = useState<string>('');
    const [fetchingNext, setFetchingNext] = useState<boolean>(false);
    const { setAlert } = useContext(MainContext);

    useEffect(() => {
        handleCollectionNames();
    }, []);

    useEffect(() => {
        
        setDrops(undefined);
        changeDrops('');

    }, [currentCol]);

    const changeDrops = async (lowerBound: string) => {
        setAlert(closeAlertParams);
        
        let shopItems: Data = {
            data: '',
            error: ''
        };
    
        if (currentCol === defaultCol) {
            shopItems 
                = await getShopItems(lowerBound, 10);
        } else if (currentCol) {
            shopItems 
                = await getCollectionDrops(currentCol, lowerBound, 10);
        }
    
        let templates: Data = {
            data: [],
            error: ''
        }
        let drops: Drop[] = [];
    
        if (shopItems && !shopItems.error && shopItems.data) {
            const items: ShopItems = shopItems.data;
    
            const ids: string[] = [];
    
            for (const name in items) {
                ids.push(items[name].item.TemplateId.toString());
            }
    
            if (ids.length) {
                templates = await getTemplatesByIds(ids);

                if (!templates.error && templates.data) {

                    const a: AtomicRes = templates.data;

                    if (a.success && a.data) {

                        const d: Template[] = a.data;

                        if (d.length) {

                            let t: TemplateObj = {}

                            for (const v of d) {

                                t[v.template_id] = v
                            }

                            const itemValues = Object.values(items);
                            drops = itemValues.map((iv) => {
                                return {
                                    ...iv,
                                    templateData: t[iv.item.TemplateId]
                                }
                            })

                            const nextKey = drops.length 
                                ? drops[drops.length - 1].item.Memo
                                : '';

                                if (lowerBound) {
                                    setDrops(prev => prev?.concat(drops));
                                } else {
                                    setDrops(drops);
                                }
                                setLowerBound(nextKey);
                        } else {

                            setAlert(noDataFoundParams);
                        }
                    } else {

                        setAlert(getErrorAlertParams(a.data));
                    }
                } else {

                    setAlert(getErrorAlertParams(templates.error));
                }
            } else {

                setAlert(noDataFoundParams);
            }
        } else {

            setAlert(getErrorAlertParams(shopItems.error));
        }
    }

    const handleCollectionNames = async () => {

        const collectionNames: Data = await getCollectionNames();
        setColData(collectionNames);
    }

    const changeCurrentCol = (name: string) => {
        setCurrentCol(name);
    }

    const setDefaultCol = () => {
        setCurrentCol(defaultCol);
    }

    const loadMore = () => {

        setFetchingNext(true);

        changeDrops(lowerBound).then(() => {
            setFetchingNext(false);
        })
    }

    return (
        <section className="flex flex-col md:flex-row items-center
            md:items-start relative">
            <SideBar 
                colData={colData}
                setSelect={changeCurrentCol}
                setDefault={setDefaultCol} />
            <main className='flex flex-col justify-center
                items-center flex-grow'>
                <Container className="mb-4 min-w-full">
                    <>
                        {
                            drops
                                ? drops.map((drop, i) => {
                                    return (
                                        <ShopItem item={drop} key={i} />
                                    )
                                })
                                : <Spinner />
                        }
                    </>
                </Container>
                {
                    fetchingNext
                        ? <span className="mb-4">
                            <Spinner />
                        </span>
                        : <></>
                }
                <Button
                    name="load more"
                    variant="outline"
                    onClick={loadMore}
                    className='rounded-3xl'
                    disabled={!lowerBound} />
            </main>
        </section>
    )
}

const SideBar = ({ colData, setSelect, setDefault }: { 
    colData: Data | undefined
    setSelect: any,
    setDefault: any
}) => {

    return (
        <section className="md:pt-16 md:mr-8 mb-8 md:sticky 
            md:top-0 md:left-0">
            <BigSelect 
                data={colData} 
                setSelect={setSelect} 
                setDefault={setDefault} />
        </section>
    )
}

export default Shop;