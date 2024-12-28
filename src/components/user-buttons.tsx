'use client'
import { DropdownMenuSubContent } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Bell, LayoutDashboard, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { locales } from "@/lib/locale.utils";
import { redirect, usePathname } from "@/i18n/routing";

export default function UserButtons({ locale }: { locale?: string }) {
    const pathname = usePathname()
    return (
        <div className={"flex gap-4 items-center h-full"}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="w-8 h-8 cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <UserMenu locale={locale} />
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={pathname === 'notifications' || pathname.startsWith("/notifications/")}>
                    <span className={"h-[32px] w-[32px] rounded-full hover:bg-slate-500 text-cream-white flex justify-center items-center"}>
                        <Bell size={20} />
                    </span>
                </DropdownMenuTrigger>
                <NoticeMenu />
            </DropdownMenu>
        </div>
    )
}

function NoticeMenu() {
    return (
        <DropdownMenuContent className="w-64 border border-solid border-light-gray" align="end" sideOffset={14}>
            <div className="flex justify-between">
                <button className={"underline hover:text-slate-blue text-muted-foreground"}> Mark as read</button>
            </div >
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Ok bro
            </DropdownMenuItem>
        </DropdownMenuContent >
    )
}

function UserMenu({ locale = 'en' }: { locale?: string }) {
    const { setTheme, resolvedTheme } = useTheme();
    const pathName = usePathname();
    return (
        <DropdownMenuContent className="w-56  border-light-gray" align="end" sideOffset={14}>
            <DropdownMenuItem>
                <User />
                <span>Pham Trung Hieu</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LayoutDashboard />
                <span>Dashboard</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    {resolvedTheme === 'light' ? <Sun /> : <Moon />}
                    <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className={" rounded border border-solid border-light-gray p-1"} sideOffset={8}>
                    <DropdownMenuItem onSelect={() => setTheme('light')}>
                        <Sun /> Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setTheme('dark')} >
                        <Moon /> Dark
                    </DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                    <Image src={locales[locale].image} width={18} height={18} alt={locale} />
                    <span>Language</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className={" rounded border border-solid border-light-gray p-1"} sideOffset={8}>
                    {Object.keys(locales).map(key => (
                        <DropdownMenuItem key={key} onSelect={() => redirect({ href: pathName, locale: key })}>
                            <Image src={locales[key].image} width={18} height={18} alt={key} key={key} />
                            <p>{locales[key].name}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
        </DropdownMenuContent >
    )
}