import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BigSelect from "../components/BigSelect";
import { Data, Drop, ShopItems } from "../schemas/global";
import { getCollectionDrops, getCollectionNames, getShopItems, 
    getTemplates } from "../utils/api";
import type { NextPage } from "next";
import Container from "../components/Container";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ShopItem from "../components/ShopItem";

const defaultCol: string = 'all';

const getDrops = async (colName: string, lowerBound: string) => {
    let shopItems: Data;

    if (colName === defaultCol) {
        shopItems = await getShopItems(lowerBound, 10);
    } else {
        shopItems = await getCollectionDrops(colName, lowerBound, 10);
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
            ids.push(items[name].item.Memo);
        }

        if (ids.length) {
            templates = await getTemplates(undefined, ids);

            const itemValues = Object.values(items);
            drops = itemValues.map((iv, i) => {
                return {
                    ...iv,
                    templateData: templates.data[i].TemplateData
                }
            })
        }
    }

    const nextKey = drops.length 
        ? drops[drops.length - 1].item.Memo
        : '';

    return { drops, nextKey }
} 

const getData = async () => {
    const collectionNames: Data = await getCollectionNames();

    return {
        collectionNames
    }
}

const Shop: NextPage = () => {
    const [colData, setColData]: [
        colData: Data | undefined,
        setColData: Dispatch<SetStateAction<Data | undefined>>
    ] = useState();

    const [drops, setDrops]: [
        Drop[] | undefined,
        Dispatch<SetStateAction<Drop[] | undefined>>
    ] = useState();

    const [currentCol, setCurrentCol]: [
        string,
        Dispatch<SetStateAction<string>>
    ] = useState('');

    const [lowerBound, setLowerBound] = useState('');

    const changeCurrentCol = (name: string) => {
        setCurrentCol(name);
    }

    const setDefaultCol = () => {
        setCurrentCol(defaultCol);
    }

    const [fetchingNext, setFetchingNext] = useState(false);

    const changeDrops = async (lowerBound: string) => {
        await getDrops(currentCol, lowerBound).then(data => {
            if (lowerBound) {
                setDrops(prev => prev?.concat(data.drops));
            } else {
                setDrops(data.drops);
            }
            setLowerBound(data.nextKey);
        });
    }

    useEffect(() => {
        let isMounted = true;

        getData().then(data => { 
            isMounted && setColData(data.collectionNames);
        });

        return () => {
            isMounted = false;
        }
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        isMounted && setDrops(undefined);

        changeDrops('');

        return () => {
            isMounted = false;
        }
    }, [currentCol]);

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