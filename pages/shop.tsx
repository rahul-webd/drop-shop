import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BigSelect from "../components/BigSelect";
import { Data, Drop, ShopItems } from "../schemas/global";
import { getCollectionNames, getShopItems, 
    getTemplates } from "../utils/api";
import type { NextPage } from "next";
import ShopItem from "../components/ShopItem";
import Container from "../components/Container";
import Button from "../components/Button";

const getData = async (dropKey: string) => {
    const collectionNames: Data = await getCollectionNames();
    const { drops, nextKey } = await getDrops(dropKey);

    return {
        collectionNames,
        shopItems: {
            drops,
            lowerBound: nextKey
        }
    }
}

const getDrops = async (lowerBound: string) => {
    const shopItems: Data = await getShopItems(lowerBound, 10);
    let templates: Data = {
        data: [],
        error: ''
    }
    let drops: Drop[] = [];

    if (shopItems && !shopItems.error) {
        const items: ShopItems = shopItems.data;
        const ids: string[] = Object.keys(items);

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

const Shop: NextPage = () => {
    const [colData, setColData]: [
        colData: Data | undefined,
        setColData: Dispatch<SetStateAction<Data | undefined>>
    ] = useState();

    const [drops, setDrops]: [
        shopItems: Drop[] | undefined,
        setShopItems: Dispatch<SetStateAction<Drop[] | undefined>>
    ] = useState();

    const [lowerBound, setLowerBound] = useState('');

    useEffect(() => {
        let isMounted = true;

        getData(lowerBound).then(data => { 
            isMounted && setColData(data.collectionNames);
            isMounted && setDrops(data.shopItems.drops);
            isMounted && setLowerBound(data.shopItems.lowerBound);
        });

        return () => {
            isMounted = false;
        }
    }, []);

    const loadMore = () => {
        getDrops(lowerBound).then(data => {
            console.log(data.drops)
            setDrops(drops ? drops.concat(data.drops): data.drops);
            setLowerBound(data.nextKey);
        });
    }

    return (
        <section className="flex flex-col md:flex-row items-center
            md:items-start m-8 relative">
            <SideBar colData={colData} />
            <main className='flex flex-col justify-center
                items-center'>
                <Container className="mb-4">
                    <>
                        {
                            drops?.map((drop, i) => {
                                return (
                                    <ShopItem item={drop} key={i} />
                                )
                            })
                        }
                    </>
                </Container>
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

const SideBar = ({ colData }: { colData: Data | undefined }) => {

    return (
        <section className="md:pt-16 md:mr-8 mb-8 md:sticky 
            md:top-0 md:left-0">
            <BigSelect data={colData} />
        </section>
    )
}

export default Shop;