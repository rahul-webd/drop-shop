import NavBar from "./NavBar";
import TopBar from "./TopBar";

const Layout = ({ children }: any) => { 
    
    return (
        <section className="min-h-screen text-blue-50">
            <TopBar />
            <main className="mb-20 md:ml-40 md:mb-0">
                {children}
            </main>
            <NavBar />
        </section>
    )
}

export default Layout;