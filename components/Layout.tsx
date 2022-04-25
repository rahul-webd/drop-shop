import NavBar from "./NavBar";
import TopBar from "./TopBar";

const Layout = ({ children }: any) => { 
    
    return (
        <section className="bg-gray-900 min-h-screen
            text-pink-50">
            <TopBar />
            <main className="mb-20 md:ml-40 md:mb-0">
                {children}
            </main>
            <NavBar />
        </section>
    )
}

export default Layout;