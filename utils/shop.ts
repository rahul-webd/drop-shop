import { Data } from '../schemas/global';
import { transact } from './helpers';

const SHOP = 'shop.cait';
const METATOKEN = 'metatoken.gm';

export const buy = async (ual: any, quantity: string, code: string,
    memo: string): Promise<Data> => {
    
    const address: string = ual.activeUser.accountName;
    const name = 'transfer';
    const data = {
        from: address,
        to: SHOP,
        quantity,
        memo
    }

    const result: Data = 
        await transact(ual, code, name, data, address);

    return result;
}