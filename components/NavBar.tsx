import { ReactElement } from "react";
import { HomeIcon, ShoppingBagIcon, TemplateIcon, UserIcon } 
    from '@heroicons/react/outline';
import Link from "next/link";
import { useRouter } from 'next/router';

type NavItem = {
    path: string,
    icon: ReactElement,
    name: string
}

const classNavIcon: string = 'w-5 md:w-8';
const classNavIconExpanded: string = 'mr-2'
const classActive: string = `flex px-4 py-2 rounded-xl
    md:justify-center border border-pink-400`;
const classNav: string = `fixed bottom-0 500-x-0 w-screen md:left-0 
    md:inset-y-0 md:h-screen md:w-40`;
const classNavList: string = `flex py-4 md:py-0 flex-row 
    justify-around items-center md:flex-col md:justify-start 
    md:items-start md:pt-32 md:h-full md:px-4
    md:border-r border-pink-400 text-pink-400`;
const classItem: string = `flex items-center mb-0 md:mb-12`;

const NavBar = () => {
    const navItems: NavItem[] = [
        {
            path: '/',
            icon: <HomeIcon />,
            name: 'home'
        },
        {
            path: '/shop',
            icon: <ShoppingBagIcon />,
            name: 'shop'
        },
        {
            path: '/tools',
            icon: <TemplateIcon />,
            name: 'tools'
        },
        {
            path: '/profile',
            icon: <UserIcon />,
            name: 'profile'
        }
    ]
    
    return (
        <nav className={`${classNav}`}>
                <ul className={`flex ${classNavList}`}>
                    {
                        navItems.map(({ path, icon, 
                            name }: NavItem, i: number) => {
                            
                            return (
                                <NavItem path={path} icon={icon}
                                    name={name} key={i} />
                            )
                        })
                    }
                </ul>
            </nav>
    )
}

const NavItem = ({ path, icon, name }: NavItem) => {
    const router = useRouter();
    const active: boolean = router.pathname === path;

    return (
        <li className={`${classItem}
            ${active && classActive}`}>
            <Link href={ path }>
                <a>
                    <div className={`${classNavIcon} 
                        ${active && classNavIconExpanded}`}>
                        { icon }
                    </div>
                </a>
            </Link>
            {active ? name : <></>}
        </li>
    )
}

export default NavBar;