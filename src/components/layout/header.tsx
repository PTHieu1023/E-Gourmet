import Link from "next/link";
import UserButtons from "@/components/layout/user-buttons";
import SearchBar from "@/components/layout/searchbar";
import { pacifico } from "@/lib/font";
import { ChefHat, Home, Utensils } from "lucide-react";
import NavBar, { NavItemProps } from "@/components/layout/navbar";
import NoticeButton from "./notice-button";
import { getTranslations } from "next-intl/server";

export default async function Header() {
    const t = await getTranslations();
    const navLinks: NavItemProps[] = [
        { href: "/", label: t("Header.NavBar.home"), icon: <Home aria-hidden="true" /> },
        { href: "/restaurants", label: t("Header.NavBar.restaurant"), icon: <ChefHat aria-hidden="true" /> },
        { href: "/foods", label: t("Header.NavBar.food"), icon: <Utensils aria-hidden="true" /> }
    ]
    return (
        <div className={"h-[56px] w-full bg-dark-teal-blue px-[20px] flex justify-between items-center sticky top-0"}>
            <div className={"flex gap-8 w-1/4 h-full items-center"}>
                <Link href={"/"} className={"h-full flex items-center gap-2"}>
                    <h1 className={`text-2xl text-cream-white w-max ${pacifico.className}`}>E-Gourmet</h1>
                </Link>
            </div>
            <NavBar items={navLinks} />
            <div className={"flex items-center gap-8 w-1/4 h-full"}>
                <SearchBar className={"rounded-full h-[32px] bg-background"} />
                <div className={"flex gap-4 items-center h-full"}>
                    <NoticeButton />
                    <UserButtons />
                </div>
            </div>
        </div>
    )
}
