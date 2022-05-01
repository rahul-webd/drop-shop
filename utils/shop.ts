import { Data } from '../schemas/global';

const SHOP = 'shop.cait';
const METATOKEN = 'metatoken.gm';

export const transact = async (ual: any, code: string, name: string,
    data: any, address: string) => {
    
    let res: Data = {
        data: '',
        error: ''
    }
    
    try {

        const transaction = {
            actions: [{
                account: code,
                name,
                authorization: [{
                    actor: address,
                    permission: 'active'
                }],
                data
            }]
        }

        const config = {
            blocksBehind: 3,
            expireSeconds: 300
        }

        const r = await ual.activeUser.signTransaction(transaction, config);
        res.data = r;
    } catch (error: any) {

        res.error = error
    }

    console.log(res)

    return res;
}

export const buy = async (ual: any, quantity: string, code: string,
    memo: string) => {
    
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