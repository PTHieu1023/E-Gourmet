'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname } from "@/i18n/routing";
import { Bell } from "lucide-react";

export default function NoticeButton() {
    const pathname = usePathname()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild disabled={pathname === 'notifications' || pathname.startsWith("/notifications/")}>
                <span className={"h-[32px] w-[32px] rounded-full hover:bg-slate-500 text-cream-white flex justify-center items-center"}>
                    <Bell size={20} />
                </span>
            </DropdownMenuTrigger>
            <NoticeMenu />
        </DropdownMenu>
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
