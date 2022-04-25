import { ReactElement } from "react";

const Button = ({ name, onClick }: { 
    name: string,
    onClick: any
}): ReactElement => {

    return (
        <button 
            className="border border-pink-400 rounded-xl px-5 py-2
                text-pink-400 transition duration-500 
                hover:bg-pink-500 hover:text-pink-50" 
            onClick={onClick}>
            { name }
        </button>
    )
}

export default Button;