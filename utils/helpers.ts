import { Data, fetchOptions } from "../schemas/global";

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
    return d;
}

const getEpoch = (date: string) => {
    const d = new Date(date);
    return d;
}

export const isTimeEnded = (date: string) => {
    const c = getCurrentTime();
    const e = getEpoch(date);

    return c >= e;
}