import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import UserMenu from "@/components/layout/user-menu";

export default function UserButtons() {
    const user = 'Pham Trung Hieu'
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <UserMenu user={user} />
        </DropdownMenu>
    )
}
