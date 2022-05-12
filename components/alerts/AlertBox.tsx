import { useEffect, useState } from "react";
import { AlertParams } from "../../schemas/global";
import H2 from "../text/H2";
import Spinner from "../Spinner";
import Button from '../Button';

const AlertBox = ({ state, message, closeAlert, 
    className }: AlertParams) => {

    const [stateClasses, setStateClasses] = useState<string>('');

    useEffect(() => {
        let isMounted = true;
        let s: string = stateClasses;

        switch (state) {

            case 'closed':
                s = 'hidden';
                break;
                
            case 'danger':
                s = `text-red-400 border-red-400`
                break;
                
            case 'info':
                s = `text-blue-400 border-blue-400`
                break;

            case 'processing':
                s = `text-green-50 border-green-300`
                break;

            case 'success':
                s = `text-green-400 border-green-400`
                break;

            case 'warning':
                s = `text-yellow-400 border-yellow-400`
                break;

            default:
                s = `text-green-50 border-green-300`
        }

        isMounted && setStateClasses(s);

        return () => {
            isMounted = false;
        }
    }, [state, message]);

    return (
        <section className={`fixed bottom-0 right-0 left-0
            mb-20 md:ml-24 flex justify-center md:mb-28`}>
            <article className={`py-8 px-4 rounded-3xl shadow-2xl
                border-2 capitalize font-medium ${stateClasses} flex 
                justify-center text-center w-full md:w-1/2 
                bg-gray-900 mx-4 break-all ${className}`}>
                {
                    state === 'processing'
                        ? <Spinner />
                        : <div>
                            <H2
                                text={message || 'no message'}
                                className='mb-8 text-base md:text-lg' />
                            <Button
                                name='OK'
                                onClick={() => {closeAlert}}
                                variant='filled'
                                className='px-8 text-sm'
                                disabled={undefined} />
                        </div>
                }
            </article>
        </section>
    )
}

export default AlertBox;