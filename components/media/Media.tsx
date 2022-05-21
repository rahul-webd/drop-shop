import { useEffect, useState } from "react";
import { Media } from "../../schemas/global";
import { resize } from "../../utils/api";
import Spinner from "../Spinner";

const Media = ({ src, alt, h, w, type, provider, className }: Media) => {

    const [mediaLoaded, setMediaLoaded] = useState<boolean>(false);
    const [err, setErr] = useState('');
    const [triedFallBack, setTriedFallBack] = useState<boolean>(false);
    const [url, setUrl] = useState<string>();

    const ipfs = `https://ipfs.io/ipfs/${src}`;
    const resizedIpfs 
        = `https://storage.googleapis.com/cait-49fc0.appspot.com/resized/${src}`;

    useEffect(() => {
        setUrl(resizedIpfs);
    }, [src]);

    const tryOriginal = () => {
        resize(src);
        setUrl(ipfs);
        setTriedFallBack(true);
    }


    return (
        <div className={`${h} ${w} rounded relative
            bg-gray-300 overflow-hidden ${className}`}>
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
                            loading='lazy'
                            className={`${h} ${w} rounded object-contain
                                transition 
                                duration-1000 hover:scale-150`}
                            onLoad={() => {
                                setMediaLoaded(true)
                            }}
                            onError={e => {
                                if (!triedFallBack) {
                                    tryOriginal();
                                } else {
                                    const ecn = e.currentTarget.nodeValue;
                                    if (ecn) setErr(ecn)
                                }
                            }} />
                || type === 'video'
                    && <video
                            controls
                            autoPlay
                            loop
                            src={url}
                            title={alt || 'no video found'}
                            className={`object-contain ${h} ${w} rounded`}
                            onLoadStart={
                                () => {
                                    setMediaLoaded(true);
                                }
                            }
                            onLoad={() => {
                                console.log('loaded');
                                setMediaLoaded(true)
                            }}
                            onError={e => {
                                if (!triedFallBack) {
                                    tryOriginal();
                                } else {
                                    const ecn = e.currentTarget.nodeValue;
                                    if (ecn) setErr(ecn)
                                }
                            }} />
            }
        </div>
    )
}

export default Media;
