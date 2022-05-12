import { CardMedia } from "../../schemas/global"
import Media from "./Media"

const CardMedia = ({ src, alt, type, provider, 
    className }: CardMedia) => {

    return (
        <Media
            src={src}
            alt={alt}
            h='h-40'
            w='w-40'
            type={type}
            provider={provider}
            className={className} />
    )
}

export default CardMedia;