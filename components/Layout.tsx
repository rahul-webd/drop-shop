import { cloneElement, useState, createContext, useContext } from "react";
import { Alert, Data } from "../schemas/global";
import { buy } from "../utils/shop";
import AlertBox from "./AlertBox";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { UALContext } from 'ual-reactjs-renderer';

type MainContext = any;
const mainContextVal: any = {}

export const MainContext = createContext(mainContextVal);

const Layout = ({ children }: any) => {
    const [alert, setAlert] = useState<Alert>({
        state: 'closed',
        message: undefined
    });

    const ual = useContext(UALContext);

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
    
    return (
        <section className="min-h-screen text-green-50">
            <TopBar />
            <MainContext.Provider value={ { 
                    setAlert: setAlert,
                    buyShopItem: buyShopItem
                } }>
                <main className="mb-20 md:ml-24 md:mb-0 p-8">
                    { cloneElement(children) }
                    <AlertBox state={alert.state} message={alert.message} />
                </main>
            </MainContext.Provider>
            <NavBar />
        </section>
    )
}

export default Layout;