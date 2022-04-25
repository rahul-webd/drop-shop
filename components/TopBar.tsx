import React, { useContext, useEffect, useState } from "react";
import Button from "./Button";
import { UALContext } from 'ual-reactjs-renderer';
import SearchBar from "./SearchBar";

const TopBar = () => {
    const [addr, setAddr] = useState('');
    const ual: any = useContext(UALContext);

    const login = () => {
        ual.logout();
        ual.showModal();
    }

    useEffect(() => {
        let isMounted = true;
        if (ual && ual.activeUser) {
            setAddr(ual.activeUser.accountName);
        }
        return () => {
            isMounted = false;
        }
    }, [ual])

    return (
        <header className="md:ml-40 flex justify-between items-center
            px-8 py-4 border-b border-pink-400">
            <SearchBar />
            <Button name={ addr ? 'wallet' : 'login' } 
                onClick={addr ? () => {} : login} />
        </header>
    )
}

export default TopBar;