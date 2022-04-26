import React from "react";
import { Text } from "../schemas/global";

const H1 = ({ text, className }: Text) => {

    return (
        <p className={`font-medium ${className}`}>
            { text }
        </p>
    )
}

export default H1;