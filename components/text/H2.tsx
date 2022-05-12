import React from "react";
import { Text } from "../../schemas/global";

const H2 = ({ text, className }: Text) => {

    let t: string = '';

    if (typeof text !== 'string') {
        t = text();
    } else {
        t = text;
    }

    return (
        <p className={`text-lg font-medium ${className}`}>
            { t }
        </p>
    )
}

export default H2;