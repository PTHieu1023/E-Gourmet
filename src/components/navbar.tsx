'use client'

import clsx from "clsx";
import { Link, usePathname } from "@/i18n/routing";
import { ReactNode } from "react";

export interface NavItemProps {
    href: string,
    label: string,
    icon: ReactNode
}

export default function NavBar({ items }: { items: NavItemProps[] }) {
    return (
        <nav className="w-max h-full flex justify-center items-center" aria-label="Main Navigation">
            <ul className="flex gap-4 h-full items-center w-full text-cream-white">
                {items.map(item => <NavItem href={item.href} label={item.label} icon={item.icon} key={item.href} />)}
            </ul>
        </nav>
    )
}

function NavItem({ href, label, icon }: NavItemProps) {
    const pathname = usePathname();
    const isActice = pathname === href || pathname.startsWith(`${href}/`);
    return (
        <li className={clsx("h-full w-20 py-1.5 relative",
            "after:transition-all after:duration-300 after:border-b-4 after:border-solid after:border-forest-green after:absolute after:left-0 after:h-0 after:bottom-0",
            { "after:w-full": isActice },
            { "after:w-0": !isActice })}
        >
            <Link
                href={href}
                className={clsx("group flex gap-2 w-full h-full items-center justify-center px-2 hover:bg-slate-800 rounded-lg",
                    { "text-forest-green": isActice }
                )}
                aria-label={label}>
                {icon}
                <h2 className={"hidden absolute top-full py-1 px-3 bg-foreground text-background rounded-xl group-hover:block"}>
                    {label}
                </h2>
            </Link>
        </li >
    )
}