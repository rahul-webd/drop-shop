import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BigSelect from "../components/BigSelect";
import { Data } from "../schemas/global";
import { getCollectionNames, getShopItems } from "../utils/api";
import type { NextPage } from "next";

const getData = async () => {
    const collectionNames: Data = await getCollectionNames();
    const shopItems: Data = await getShopItems();

    return {
        collectionNames,
        shopItems
    }
}

const Shop: NextPage = () => {
    const [colData, setColData]: [
        colData: Data | undefined,
        setColData: Dispatch<SetStateAction<Data | undefined>>
    ] = useState();
    const [shopItems, setShopItems]: [
        shopItems: Data | undefined,
        setShopItems: Dispatch<SetStateAction<Data | undefined>>
    ] = useState();

    useEffect(() => {
        let isMounted = true;

        getData().then(data => { 
            isMounted && setColData(data.collectionNames);
            isMounted && setShopItems(data.shopItems);
        });

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <section className="flex">
            <SideBar colData={colData} />
            <main className="bg-gray-800">
                
            </main>
        </section>
    )
}

const SideBar = ({ colData }: { colData: Data | undefined }) => {

    return (
        <section className="pt-16 px-4">
            <BigSelect data={colData} />
        </section>
    )
}

export default Shop;