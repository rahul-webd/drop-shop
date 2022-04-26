import { Data, fetchOptions } from "../schemas/global";

export const fetcher = async (url: string, 
    options: fetchOptions | undefined) => {
    let error: string = '';

    const data: Data = await fetch(url, options)
        .then(resp => resp.json())
        .catch(err => { error = err });

    return { data, error }
}