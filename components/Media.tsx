import { useState } from "react";
import Spinner from "./Spinner";

const Media = ({ src, alt, h, w, type, provider }: {
    src: string | undefined,
    alt: string | undefined,
    h: string,
    w: string,
    type: 'img' | 'video'
    provider: 'ipfs'
}) => {
    const [mediaLoaded, setMediaLoaded] = useState(false);
    const [err, setErr] = useState('');

    let url: string = ``;

    if (provider === 'ipfs') {
        url = `https://ipfs.io/ipfs/${src}`;
    }

    return (
        <div className={`${h} ${w} rounded relative`}>
            {
                !mediaLoaded
                    && <div className={`${h} ${w} bg-gray-700 absolute
                        mx-auto my-auto rounded flex justify-center
                        items-center`}>
                        {
                            err
                                ? <p>{ err }</p>
                                : <Spinner />
                        }
                    </div>
            }
            {
                src &&
                type === 'img'
                    && <img 
                            src={url} 
                            alt={alt || 'no image found'}
                            className={`object-cover ${h} ${w} rounded`}
                            onLoad={() => {
                                setMediaLoaded(true)
                            }}
                            onError={e => {
                                const ecn = e.currentTarget.nodeValue;
                                if (ecn) setErr(ecn)
                            }} />
                || type === 'video'
                    && <iframe
                            src={url}
                            title={alt || 'no video found'}
                            className={`object-cover ${h} ${w} rounded`}
                            onLoad={() => {
                                setMediaLoaded(true)
                            }}
                            onError={e => {
                                const ecn = e.currentTarget.nodeValue;
                                if (ecn) setErr(ecn)
                            }} />
            }
        </div>
    )
}

export default Media;
