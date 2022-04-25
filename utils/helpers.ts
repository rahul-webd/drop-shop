import { Data } from "../schemas/global";

export const fetcher = async (url: string) => {
    let error: string = '';

    const data: Data = await fetch (url)
        .then(resp => resp.json())
        .catch(err => { error = err });

    return { data, error }
}