import React, { ReactChild } from "react"

const Container = ({ children, className }: { 
    children: ReactChild,
    className: string | undefined
}) => {
    return (
        <section className={`bg-gray-800 p-4 rounded-2xl flex flex-wrap
        justify-center ${className}`}>
            { children }
        </section>
    )
}

export default Container;