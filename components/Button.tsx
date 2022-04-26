import { ReactElement } from "react";

const Button = ({ name, onClick, variant, className }: { 
    name: string,
    onClick: any,
    variant: "outline" | "filled",
    className: string | undefined
}): ReactElement => {

    let variantClasses: string = '';

    if (variant === "outline") {
        variantClasses = `border border-blue-400 text-blue-300
            hover:bg-blue-300 hover:text-blue-900`
    } else if (variant === "filled") {
        variantClasses = `bg-blue-400 hover:bg-blue-500 text-gray-900
        font-medium`
    }

    return (
        <button 
            className={`${variantClasses} rounded-2xl px-4 py-2
                transition duration-500 
                capitalize ${className}`}
            onClick={onClick}>
            { name }
        </button>
    )
}

export default Button;