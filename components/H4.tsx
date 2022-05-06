import React from "react";
import { Text } from "../schemas/global";

const H4 = ({ text, className }: Text) => {

    let t: string = '';

    if (typeof text !== 'string') {
        t = text();
    } else {
        t = text;
    }

    return (
        <p className={`text-sm font-medium ${className}`}>
            { t }
        </p>
    )
}

export default H4;