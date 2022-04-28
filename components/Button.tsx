import { ReactElement } from "react";

const Button = ({ name, onClick, variant, className,
    disabled }: { 
    name: string,
    onClick: any,
    variant: "outline" | "filled",
    className: string | undefined,
    disabled: boolean | undefined
}): ReactElement => {

    let variantClasses: string = '';

    if (variant === "outline") {
        variantClasses = `border border-green-300 text-green-300
            hover:bg-green-400 hover:text-green-900 
            disabled:border-green-200`
    } else if (variant === "filled") {
        variantClasses = `bg-green-300 hover:bg-green-400 text-green-900
        font-medium disabled:bg-green-200`
    }

    return (
        <button 
            className={`${variantClasses} rounded-2xl px-4 py-2
                transition duration-500 
                capitalize ${className}`}
            onClick={onClick}
            disabled={disabled}>
            { name }
        </button>
    )
}

export default Button;