import React from "react";
import { Tag } from "../schemas/global";

const Tag = ({ text, className, variant }: Tag) => {

    let variantClasses: string = '';

    switch (variant) {
        case 'primary':
            variantClasses = 'border-green-300 text-green-200';
            break;

        case 'warning':
            variantClasses = 'border-yellow-400 text-yellow-400';
            break;

        case 'danger':
            variantClasses = 'border-red-400 text-red-400';
    }

    return (
        <p className={`text-xs px-4 py-1 border ${variantClasses}
            rounded-xl font-medium ${className}`}>
            { text }
        </p>
    )
}

export default Tag;