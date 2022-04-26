import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BigSelect from "../components/BigSelect";
import { Data, Drop, ShopItems } from "../schemas/global";
import { getCollectionNames, getShopItems, 
    getTemplates } from "../utils/api";
import type { NextPage } from "next";
import ShopItem from "../components/ShopItem";
import Container from "../components/Container";

const getData = async () => {
    const collectionNames: Data = await getCollectionNames();
    const shopItems: Data = await getShopItems('', 10);
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

    return {
        collectionNames,
        drops
    }
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

    useEffect(() => {
        let isMounted = true;

        getData().then(data => { 
            isMounted && setColData(data.collectionNames);
            isMounted && setDrops(data.drops);
        });

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <section className="flex flex-col md:flex-row items-center
            md:items-start m-8">
            <SideBar colData={colData} />
            <main>
                <Container>
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
            </main>
        </section>
    )
}


const SideBar = ({ colData }: { colData: Data | undefined }) => {

    return (
        <section className="md:pt-16 md:mr-8 mb-8">
            <BigSelect data={colData} />
        </section>
    )
}

export default Shop;