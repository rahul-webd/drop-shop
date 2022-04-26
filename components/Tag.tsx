import React from "react";
import { Text } from "../schemas/global";

const Tag = ({ text, className }: Text) => {

    return (
        <p className={`text-xs px-4 py-1 border border-blue-300
            rounded-xl font-medium text-blue-200m ${className}`}>
            { text }
        </p>
    )
}

export default Tag;