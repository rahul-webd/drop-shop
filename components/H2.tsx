import React from "react";
import { Text } from "../schemas/global";

const H2 = ({ text, className }: Text) => {

    return (
        <p className={`text-sm font-medium ${className}`}>
            { text }
        </p>
    )
}

export default H2;