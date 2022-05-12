import React from "react";
import { Text } from "../../schemas/global";

const H1 = ({ text, className }: Text) => {

    let t: string = '';

    if (typeof text !== 'string') {
        t = text();
    } else {
        t = text;
    }

    return (
        <p className={`text-xl capitalize font-medium ${className}`}>
            { t }
        </p>
    )
}

export default H1;