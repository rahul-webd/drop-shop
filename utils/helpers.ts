import { Data, fetchOptions, Quantity, SwapFactor } from "../schemas/global";
import { JsonRpc } from 'eosjs';
import { rpcProviders } from "../data";

const rpc = new JsonRpc(rpcProviders[0]);

export const fetcher = async (url: string, 
    options: fetchOptions | undefined) => {
    let error: string = '';

    const data: Data = await fetch(url, options)
        .then(resp => resp.json())
        .catch(err => { error = err });

    return { data, error }
}

const getCurrentTime = () => {
    const d = new Date();
    return d.getTime();
}

const getTimeInMillis = (date: string) => {
    const d = new Date(date);
    return d.getTime();
}

export const isTimeEnded = (date: string) => {
    const c = getCurrentTime();
    const e = getTimeInMillis(date);

    return c >= e;
}

export const getMillisLeft = (date: string) => {
    const s = getTimeInMillis(date);
    const c = getCurrentTime();

    const m = s - c;

    if (m > 0) {

        return m;
    } else {
        
        return 0;
    }
}

export const convertMillisToTime = (ms: number) => {
    const Second: number = 1000;
    const Minute: number = 60 * Second;
    const Hour: number = 60 * Minute;
    const Day: number = 24 * Hour;

    let daysLeft: number = 0;
    let hoursLeft: number = 0;
    let minutesLeft: number = 0;
    let secondsLeft: number = 0;

    if (ms >= Day) {
        daysLeft = Math.floor(ms / Day);
        ms = Math.floor(ms % Day);
    } 

    if (ms >= Hour) {
        hoursLeft = Math.floor(ms / Hour);
        ms = Math.floor(ms % Hour);
    }

    if (ms >= Minute) {
        minutesLeft = Math.floor(ms / Hour);
        ms = Math.floor(ms % Minute);
    }

    if (Second >= secondsLeft) {
        secondsLeft = Math.floor(ms / Second);
        ms = Math.floor(ms % Second);
    }

    const h: string = hoursLeft >= 10 
        ? `${hoursLeft}` 
        : `0${hoursLeft}`;

    const m: string = minutesLeft >= 10 
        ? `${minutesLeft}` 
        : `0${minutesLeft}`;

    const s: string = secondsLeft > 10
        ? `${secondsLeft}`
        : `0${secondsLeft}`;

    return `${daysLeft} days, ${h}:${m}:${s}`;
}

export const getTableRows = async (code: string, scope: string, 
    table: string, limit: number, lowerBound: any): Promise<Data> => {

    let error: string = '';

    let payload: any = {
        json: true,
        code,
        scope,
        table,
        limit
    }

    if (lowerBound) {
        payload['lower_bound'] = lowerBound;
    }

    const data = await rpc.get_table_rows(payload).catch(err => {
        error = err;
    })

    return {
        data,
        error
    }
}

export const getExchangeRates = async (limit: number, 
    lowerBound: any): Promise<Data> => {

    const code: string = 'alcorammswap';
    const scope: string = 'alcorammswap';
    const table: string = 'pairs';

    const res = await getTableRows(code, scope, table, limit, lowerBound);
    return res;
}

export const calcQuantity = (quantity: string): Quantity => {
    const splitter: string = ' ';
    const [v, s] = quantity.split(splitter);

    return {
        value: Number(v),
        symbol: s
    }
}

export const calcSwapFactor = (quantity1: string,
    quantity2: string): SwapFactor => {

    let q1: Quantity = calcQuantity(quantity1);
    let q2: Quantity = calcQuantity(quantity2);

    return {
        factor: Number((q1.value/q2.value).toFixed(2)),
        sym1: q1.symbol,
        sym2: q2.symbol
    }
}

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