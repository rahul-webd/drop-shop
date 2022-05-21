import { shopApi } from "../data";
import { Data, fetchOptions } from "../schemas/global";
import { fetcher } from "./helpers";

export const getCollectionNames = async () => {
    const endpoint: string = `get_collection_names`;

    const data: Data = await fetcher(`${shopApi}/${endpoint}`, undefined);

    return data;
}

export const getShopItems = async (lowerBound: string, limit: number) => {
    const endpoint: string = `get_drops`;

    const options: fetchOptions = getPostOptions({
        lowerBound,
        limit
    })

    const data: Data = await fetcher(`${shopApi}/${endpoint}`, options);

    return data;
}

export const getTemplates = async (memo: string | undefined, 
    ids: string[] | undefined) => {
    const endpoint: string = 'get_templates';

    const options: fetchOptions = getPostOptions({
        memo,
        ids
    });

    const data: Data = await fetcher(`${shopApi}/${endpoint}`, options);

    return data;
}

export const getCollectionDrops = async (colName: string, 
    lowerBound: string, limit: number ) => {
    const endpoint: string = 'get_collection_drops';

    const options: fetchOptions = getPostOptions({
        colName,
        lowerBound,
        limit
    });

    const data: Data = await fetcher(`${shopApi}/${endpoint}`, options);

    return data;
}

export const getDrop = async (name: string) => {
    const endpoint: string = 'get_drop';

    const options: fetchOptions = getPostOptions({
        name
    });

    const data: Data = await fetcher(`${shopApi}/${endpoint}`, options);

    return data;
}

export const resize = async (hash: string | undefined) => {

    const endpoint: string = 'resize';

    const data = {
        hash
    }
    const options: fetchOptions = getPostOptions(data);

    const res = await fetcher(`${shopApi}/${endpoint}`, options);
}

const getPostOptions = (body: any): fetchOptions => {

    return {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    }
}