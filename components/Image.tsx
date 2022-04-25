import { useState } from "react";
import Spinner from "./Spinner";

const Image = ({ src, alt, h, w }: {
    src: string,
    alt: string | undefined,
    h: string,
    w: string
}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [err, setErr] = useState('');

    return (
        <div className={`${h} ${w} rounded`}>
            {
                imgLoaded
                    ? <img src={src} alt={alt || 'no image found'}
                        className="object-cover" 
                            onLoad={() => {
                            setImgLoaded(true)
                            }}
                            onError={e => {
                                const ecn = e.currentTarget.nodeValue;
                                if (ecn) setErr(ecn)
                            }} />
                    : <div className={`${h} ${w} bg-gray-800`}>
                        {
                            err
                                ? <p>{ err }</p>
                                : <Spinner />
                        }
                    </div>
            }
        </div>
    )
}

export default Image;