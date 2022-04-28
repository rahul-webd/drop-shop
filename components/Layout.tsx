import NavBar from "./NavBar";
import TopBar from "./TopBar";

const Layout = ({ children }: any) => { 
    
    return (
        <section className="min-h-screen text-green-50">
            <TopBar />
            <main className="mb-20 md:ml-24 md:mb-0 p-8">
                {children}
            </main>
            <NavBar />
        </section>
    )
}

export default Layout;