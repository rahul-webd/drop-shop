import { AssetsQuery, Data } from "../schemas/global";
import { addAmpersand, fetcher } from "./helpers";

const ATOMICASSETSV1: string 
    = 'https://wax.api.atomicassets.io/atomicassets/v1';

export const getAssets 
    = async (queryParams: AssetsQuery): Promise<Data> => {

    const endpoint: string = 'assets';
    let query: string = '';

    for (const param in queryParams) {

        let d: any = (queryParams as any)[param]
        if (d) {

            query = addAmpersand(query);
            query += `${param}=${d}`;
        }
    }

    const res: Data 
        = await fetcher(`${ATOMICASSETSV1}/${endpoint}?${query}`, 
            undefined);

    return res;
}