import { AssetsQuery, Data, TemplatesQuery } from "../schemas/global";
import { addAmpersand, fetcher, joinIds, makeQuery } from "./helpers";

const ATOMICASSETSV1: string 
    = 'https://wax.api.atomicassets.io/atomicassets/v1';

const limit: number = 10;

export const getAssets 
    = async (queryParams: AssetsQuery): Promise<Data> => {

    const endpoint: string = 'assets';
    const query = makeQuery(queryParams);

    const res: Data 
        = await fetcher(`${ATOMICASSETSV1}/${endpoint}?${query}`, 
            undefined);

    return res;
}

export const getTemplates 
    = async (queryParams: TemplatesQuery): Promise<Data> => {

    const endpoint: string = 'templates';
    const query = makeQuery(queryParams);

    const res: Data 
        = await fetcher(`${ATOMICASSETSV1}/${endpoint}?${query}`, 
            undefined);

    return res;
}

export const getTemplatesByIds
    = async (idList: string[]): Promise<Data> => {

    const ids: string = joinIds(idList);

    const params: TemplatesQuery = {
        collection_name: undefined,
        schema_name: undefined,
        ids,
        page: 1,
        limit,
        order: 'desc',
        sort: 'created'
    }

    const res: Data = await getTemplates(params);
    return res;
}

export const getTemplate
    = async (id: string): Promise<Data> => {

    const params: TemplatesQuery = {
        collection_name: undefined,
        schema_name: undefined,
        ids: id,
        page: 1,
        limit,
        order: 'desc',
        sort: 'created'
    }

    const res: Data = await getTemplates(params);
    return res;
}
