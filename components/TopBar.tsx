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
        <header className="md:ml-40 flex justify-between
            px-8 py-4 border-b border-gray-800">
            <SearchBar />
            <Button name={ addr ? 'wallet' : 'login' } 
                onClick={addr ? () => {} : login}
                variant="outline"
                className={undefined}
                disabled={undefined} />
        </header>
    )
}

export default TopBar;