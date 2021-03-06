import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import { UALContext } from 'ual-reactjs-renderer';
import SearchBar from "../filters/SearchBar";

const TopBar = () => {
    const [addr, setAddr] = useState('');
    const ual: any = useContext(UALContext);
    const [query, setQuery] = useState('');

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
        <header className="md:ml-24 flex justify-between px-4
            md:px-8 py-4 border-b border-gray-800">
            <SearchBar
                placeHolder="search a collection"
                query={query}
                setQuery={setQuery}
                className={undefined} />
            <Button name={ addr ? addr : 'login' } 
                onClick={addr ? () => {} : login}
                variant="filled"
                className={undefined}
                disabled={undefined} />
        </header>
    )
}

export default TopBar;