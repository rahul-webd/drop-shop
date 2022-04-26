import React, { ReactChild } from "react"

const Container = ({ children }: { children: ReactChild }) => {
    return (
        <section className="bg-gray-800 p-4 rounded-2xl flex flex-wrap
            justify-center">
            { children }
        </section>
    )
}

export default Container;