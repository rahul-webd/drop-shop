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