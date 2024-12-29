'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname } from "@/i18n/routing";
import clsx from "clsx";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NoticeButton() {
    const pathname = usePathname();
    const t = useTranslations();
    const isActive = pathname === '/notifications' || pathname.startsWith("/notifications/");
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={isActive}>
                <span className={clsx("h-[32px] w-[32px] rounded-full text-cream-white flex justify-center items-center relative group",
                    { "bg-slate-500": isActive },
                    { "hover:bg-slate-500": !isActive }
                )}>
                    <Bell size={20} />
                    <p className={clsx("absolute text-foreground top-full w-max mt-4 bg-background rounded border-solid border-light-gray border py-1 px-2 hidden",
                        { "group-hover:block": !isActive }
                    )}>
                        {t("Header.NoticeMenu.newNotice", { newNotice: 10 })}
                    </p>
                </span>
            </DropdownMenuTrigger>
            <NoticeMenu />
        </DropdownMenu >
    )
}

function NoticeMenu() {
    const t = useTranslations()
    return (
        <DropdownMenuContent className="w-72 border border-solid border-light-gray m-1" sideOffset={14}>
            <div className="flex justify-between px-2">
                <button className={"underline hover:text-blue-600 text-muted-foreground"}>{t("Header.NoticeMenu.markAsRead")}</button>
                <Link className={"hover:text-blue-600 text-muted-foregroun font-thin"} href={"/notifications"}>{t("Header.NoticeMenu.more")}</Link>
            </div >
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                Ok bro
            </DropdownMenuItem>
        </DropdownMenuContent >
    )
}
