import { useContext, useEffect, useState } from "react";
import H1 from "../components/H1";
import H2 from "../components/H2";
import { CpuConfig, EosjsRes, ExchRate, 
    Quantity, 
    SwapFactor, 
    Transaction, 
    ValidCpuConfig,
    ValidCpuTokens} from "../schemas/global";
import { buyCpu, getCpuConfig, getSteakWaxExchRate } from "../utils/cpu";
import { calcQuantity, calcSwapFactor } from "../utils/helpers";
import { MainContext } from "../components/Layout";
import { UALContext } from 'ual-reactjs-renderer';
import { steakInfo } from "../data";
import H3 from "../components/H3";

const CpuBoost = () => {
    const [config, setConfig] = useState<CpuConfig[]>();
    const [swapFactor, setSwapFactor] = useState<SwapFactor>();
    const [curConfig, setCurConfig] = useState<ValidCpuConfig>();
    const [amt, setAmt] = useState<string>('');
    const [gift, setGift] = useState<boolean>(false);
    const [receiver, setReceiver] = useState<string>('');
    const { setAlert } = useContext(MainContext);
    const ual = useContext(UALContext);

    useEffect(() => {
        let isMounted = true;

        getCpuConfig().then(({data, error}) => {
            
            if (!error && data) {
                const d: EosjsRes = data;
                const r = d.rows;

                if (r.length) {

                    const c: CpuConfig[] = r;
                    isMounted && setConfig(c);
                    isMounted && setCurConfig(0);
                }
            } else {
                setAlert({
                    state: 'danger',
                    message: error
                });
            }
        });

        getSteakWaxExchRate().then(({ data, error }) => {

            if (!error && data) {
                const d: EosjsRes = data;
                const r = d.rows;

                if (r.length) {

                    const e: ExchRate[] = r;
                    const c: ExchRate = e[0];
                    const q1 = c.pool1.quantity;
                    const q2 = c.pool2.quantity;

                    const f: SwapFactor = calcSwapFactor(q1, q2);
                    isMounted && setSwapFactor(f);
                } else {
                    setAlert({
                        state: 'danger',
                        message: error
                    });
                }
            } 
        });
        
        return () => {
            isMounted = false;
        }
    }, []);

    const handleBoostText = (): string => {
        if (amt && config && (curConfig !== undefined)) {
            const qty: Quantity 
                = calcQuantity(config[curConfig].CPUBoostPerAsset)
    
            return `${(Number(amt) * qty.value).toFixed(8)} ${qty.symbol}`
        } else {

            return `0 SYM`
        }
    }

    const handleRewardText = (): string => {
        let res: string = `bonus reward: `;
        if (amt && swapFactor && config && (curConfig !== undefined)) {
            const qty: Quantity
                = calcQuantity(config[curConfig].rewardPerDepositAsset[0].quantity);
            
            const v: number = Number(amt) * qty.value

            res += `${v.toFixed(4)} ${qty.symbol}🥩 ~ ${(v * 1/swapFactor.factor).toFixed(8)} ${swapFactor.sym2}`
        } else {

            res += `0 SYM`
        }
        
        return res;
    }

    const handleBuyCpu = async () => {
        if (amt && config && (curConfig !== undefined)) {

            const defaultMemo: string = 'caittoken.io';
            let qty: string = '';
            let sym: ValidCpuTokens = 'WAX';
            let memo: string = '';

            if (curConfig === 0) {

                const w = `WAX`;
                qty = `${Number(amt).toFixed(8)} ${w}`
                sym = w

            } else if (curConfig === 1) {

                const s = `STEAK`;
                qty = `${Number(amt).toFixed(4)} ${s}`
                sym = s
            }

            if (gift) {
                memo = receiver;
            } else {
                memo = defaultMemo
            }

            const res = await buyCpu(ual, qty, memo, sym);

            if (!res.error && res.data) {
                let t: Transaction = res.data;

                setAlert({
                    state: 'success',
                    message: `transaction success with 
                        Id ${t.transactionId}`
                });
            } else {

                setAlert({
                    state: 'danger',
                    message: res.error.toString()
                });
            }
        }
    }

    return (
        <section className="text-blue-200 flex flex-col
            items-center justify-center">
            <article className="flex flex-col mt-8 md:mt-16 shadow-2xl
                border border-blue-300 p-4 md:p-16 rounded-3xl
                justify-center items-center text-center
                transition duration-300 w-full md:w-4/5 lg:w-2/3">
                {
                    (config && curConfig !== undefined)
                        && (
                            <>
                                <H1
                                    text={`boost your CPU by`}
                                    className='mb-4 capitalize text-blue-200' />
                                <H1
                                    text={handleBoostText}
                                    className='text-blue-300 mb-8' />
                                <div className="text-blue-900 rounded-2xl mb-8
                                    flex">
                                    <input 
                                        type="number"
                                        step={1}
                                        min={0}
                                        className="rounded-l-2xl p-2 font-medium"
                                        placeholder={config[curConfig].depositAsset}
                                        value={amt}
                                        onChange={e => {
                                            setAmt(e.currentTarget.value);
                                        }} />
                                    <select 
                                        className="bg-blue-300 rounded-r-2xl p-2
                                            font-medium"
                                        onChange={e => {
                                            const c: string = e.currentTarget.value;
                                            let v: ValidCpuConfig = 0;

                                            switch (c) {

                                                case 'WAX':
                                                    v = 0;
                                                    break;

                                                case 'STEAK':
                                                    v = 1;
                                                    break;
                                            }
                                            setCurConfig(v);
                                        }}>
                                        <option>
                                            WAX
                                        </option>
                                        <option>
                                            STEAK
                                        </option>
                                    </select>
                                </div>
                                <div className="mb-12 flex">
                                    <label className="flex items-center
                                        capitalize font-medium mr-2">
                                        <input
                                            type='checkbox'
                                            onChange={() => {
                                                setGift(!gift)
                                            }}
                                            className='h-5 w-5 mr-2' />
                                        gift to 
                                    </label>
                                    <input
                                        type='text'
                                        value={receiver}
                                        disabled={!gift}
                                        placeholder='mrcool123'
                                        onChange={e => {
                                            setReceiver(e.currentTarget.value);
                                        }}
                                        className='rounded-xl p-1 text-blue-900
                                            font-medium px-2 disabled:bg-blue-300' />
                                </div>
                                <button className="bg-blue-300 text-blue-900 capitalize
                                    rounded-3xl px-4 py-2 shadow-xl mb-8 hover:bg-blue-400
                                    transition duration-300"
                                    onClick={handleBuyCpu}>
                                    get boost 🚀
                                </button>
                                <div className="md:w-2/3">
                                    {
                                        config[curConfig].rewardPerDepositAsset.length
                                            ? (
                                                <H2
                                                    text={handleRewardText}
                                                className='capitalize' />
                                            )
                                            : <></>
                                    }
                                </div>
                            </>
                        )
                }
            </article>
        </section>
    )
}

export default CpuBoost;