import { shopApi } from "../data";
import { Data } from "../schemas/global";
import { fetcher } from "./helpers";

export const getCollectionNames = async () => {
    const endpoint: string = `get_collection_names`;

    const data: Data = await fetcher(`${shopApi}/${endpoint}`);

    return data;
}

export const getShopItems = async () => {
    const endpoint: string = `get_drops`;

    const data: Data = await fetcher(`${shopApi}/${endpoint}`);

    return data;
}