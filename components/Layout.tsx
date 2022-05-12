import { cloneElement, useState, createContext, useContext, 
    useEffect } from "react";
import { AlertStateParams, Data } from "../schemas/global";
import { buy } from "../utils/shop";
import AlertBox from "./alerts/AlertBox";
import NavBar from "./appBars/NavBar";
import TopBar from "./appBars/TopBar";
import { UALContext } from 'ual-reactjs-renderer';
import { closeAlertParams } from "../utils/helpers";

type MainContext = any;
const mainContextVal: any = {}

export const MainContext = createContext(mainContextVal);

const Layout = ({ children }: any) => {
    const [alert, setAlert] = useState<AlertStateParams>({
        state: 'closed',
        message: undefined
    });
    const [address, setAddress] = useState<string>();

    const ual: any = useContext(UALContext);

    useEffect(() => {

        if (ual && ual.activeUser) {

            const addr: string = ual.activeUser.accountName;
            setAddress(addr);
        }
    }, [ual]);

    const buyShopItem = async (quantity: string, contract: string,
        memo: string) => {

        setAlert({
            state: 'processing',
            message: undefined
        })

        const res: Data = await buy(ual, quantity, contract, memo);

        if (res && !res.error && res.data) {

            setAlert({
                state: 'success',
                message: `transaction successfully push with ID 
                    ${res.data.transactionId}`
            });
        } else if (res.error) {

            setAlert({
                state: 'danger',
                message: res.error
            })
        } else {
            
            setAlert({
                state: 'warning',
                message: 'some unknown error occured'
            });
        }
    }

    const closeAlert = () => {

        setAlert(closeAlertParams);
    }
    
    return (
        <section 
            className="min-h-screen text-green-50">
            <TopBar />
            <MainContext.Provider value={{ 
                    ual,
                    address,
                    setAlert: setAlert,
                    buyShopItem: buyShopItem
                }}>
                <main className="mb-20 md:ml-24 md:mb-0 p-8
                    flex flex-col items-center">
                    <main className="container">
                        { children }
                    </main>
                    <AlertBox 
                        state={alert.state} 
                        closeAlert={closeAlert}
                        message={alert.message}
                        className={undefined} />
                </main>
            </MainContext.Provider>
            <NavBar />
        </section>
    )
}

export default Layout;