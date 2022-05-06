import { Data, ValidCpuTokens } from "../schemas/global";
import { getExchangeRates, getTableRows, transact } from "./helpers";

const waxSteakPairKey: number = 521;
const cpuCode: string = 'cpu.steak';
const scope: string = 'cpu.steak';
const defaultMemo: string = 'caittoken.io';

export const getSteakWaxExchRate = async (): Promise<Data> => {

    const res = await getExchangeRates(1, waxSteakPairKey);
    return res;
}

export const getCpuConfig = async (): Promise<Data> => {

    const table: string = 'configs';
    const limit: number = 2;
    const lowerBound: any = undefined;

    const res = 
        await getTableRows(cpuCode, scope, table, limit, lowerBound);
    return res;
}

export const buyCpu = async (ual: any, quantity: string, 
    memo: string | undefined, token: ValidCpuTokens): Promise<Data> => {

    const address: string = ual.activeUser.accountName;
    const actionName: string = 'transfer';
    const data = {
        from: address,
        to: cpuCode,
        quantity,
        memo: memo || defaultMemo
    }

    let tokenCode: string = '';

    switch (token) {

        case 'STEAK':
            tokenCode = 'token.steak';
            break;

        case 'WAX':
            tokenCode = 'eosio.token';
            break;
    }

    const res: Data = 
        await transact(ual, tokenCode, actionName, data, address);

    return res;
}
