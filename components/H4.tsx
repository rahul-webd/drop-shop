import React from "react";
import { Text } from "../schemas/global";

const H4 = ({ text, className }: Text) => {

    return (
        <p className={`text-sm font-medium ${className}`}>
            { text }
        </p>
    )
}

export default H4;