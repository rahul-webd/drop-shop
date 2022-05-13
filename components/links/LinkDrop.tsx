import Link from "next/link";
import { LinkInternal } from "../../schemas/global";

const LinkDrop = ({ children, memo, className }: LinkInternal) => {

    return (
        <Link href={`./drop?memo=${memo}`}>
            <a className={`flex flex-col items-center ${className}`}>
                { children }
            </a>
        </Link>
    )
}

export default LinkDrop;