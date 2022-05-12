import { useState } from "react";
import { Media } from "../../schemas/global";
import Spinner from "../Spinner";

const Media = ({ src, alt, h, w, type, provider, className }: Media) => {

    const [mediaLoaded, setMediaLoaded] = useState(false);
    const [err, setErr] = useState('');

    const ipfs = 'https://ipfs.io/ipfs';
    const resizedIpfs = 'http://ipfs-resizer.ledgerwise.io/api/v1/resized';
    const size = '200';

    let url: string = ``;

    if (provider === 'ipfs') {
        url = `https://ipfs.io/ipfs/${src}`;
    } else if (provider === 'resized') {
        url = `${resizedIpfs}?cid=${src}&size=${size}`;
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
                            className={`${h} ${w} rounded object-contain
                                transition 
                                duration-1000 hover:scale-150`}
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
                            className={`object-contain ${h} ${w} rounded`}
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
