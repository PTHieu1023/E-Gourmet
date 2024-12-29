"use client"

import { LayoutDashboard, LogOut, Moon, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"

import {

    DropdownMenuSubContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { redirect, usePathname } from "@/i18n/routing";
import Image from "next/image";
import { useLocale } from "next-intl";


type Locales = {
    [key: string]: {
        name: string;
        image: string;
    };
};

export const locales: Locales = {
    "vi": {
        name: "Tiếng Việt",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACVklEQVR4nO1XPW8TQRC935BAUkMoLPt2Zs8WxudIkaAhoUMCCqgoKKmo+Qg9AoEiQccfoKPJbwDC3e7ZiRRFfEkOyCAhKOI4EovmcCIry93u+i5dnjTSaW5v39uZ2d05zzvGBNhoNE4I3wfB+aWYsaWYMdatVKa9o0QSBGck4rIAiCSi+p8JgPcS8YGs1eZKIxa+PysAViTAMItYMxoL8CwCmClGHgShQNy2JtYj0o8ZW5iMHPGaQBxMSn4gAnEgOL/qRC45b5dBPiZi1zoSwvdnJeLXssjHRGyvcX7SLABgpWzyMXtq3mrgUO3ByBxSIRg7nZ17xIcuK9q6UVdb1+uuO+N+noDYZbLvL5qq/7zpWgtrmcerdMknRzVM2mrYCdNnBwF/kmp1Ss8/Is/7sNNE9el2Q30eWW/5rFL9+dToed9PY2hsrgjfB01AzNiSSf2Hm3W1t9E+ID5se5tt9fGWuSYSgEU9AgCLNiFcX+Dq1+uWRv57taXWz3O7VABc1AuQc7TN4+bluiaAfLbf0/WtCehWKtO2E3x79C//u1GYGj2Tr1AREkb3uXGSwZtQ/Xx1TnXnueqEXP142Ux9lgt462VBUjNhqoELXH2509D85KN3xggA3M0WUKvN0XFpmwpXo7kjgFOZAgjUyRyZAIDHngkRwEyRLiiHvEenrefQig1KDP1OzFjLinwf1EaV1JLtJIxd8SZBzFirYFPac175YVAbRZ2My+5IGw/EJ9Y5twF1MtRM0H2eQ/5OANwzbrWiSKrVKTrPR79l6a9Z5vF6DC8ffwHgnh55scU/FgAAAABJRU5ErkJggg=="
    },
    "en": {
        name: "English",
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAADeklEQVR4nO1W7UtTYRTfP1BUiEFEJAR9q4juncbanbuWmW/bzJd8ydKshS+QVhKIlvnBjPCDRdaHFBMVhErZ1Hx/tygVFU1lRhGJubl7d+/UTPGJ88Bsutc29yU68OPccw73+Z0953cuEwj+mwtGhdR7iSIajogVDeckclWwWFbvBznPkoY2HQqMeVugzO6bouRqlJzZgwIiGxE8K2/3IUquWqfk6gleSt5fpMj920Yck9S878OwdjwhrXP1RfU0mv5sQIHRjdhDnFs0iAzcCgpJaMbNGGkS8TSxykuJZwx1dJdb5GJZvV9AZMNcjLIDBUQ1ItmlFqRIasVE4CEOjm9GUSntOAdgKsv7TVhoVLdrGUbiEnlm7sD16jcza+evtKGMnAFUVjONfzl4iCFf/XoG+8KSEQxoQMcYNkGrZ38tsGzkX5GfCledDE1sXpnUsCgssQUVFA+juqavmAA8xJA31Z9XTmJAnY+X91sgNqyPOyuinCKXhtbtFcvVc0Gxbzeu1dqzrTpowBp4mvjGnvHd47CB8prpNrjqgcF5VPRkFMWndqKZLxz2EEPevH4j7x2+CZMIzTWwFfqurgd2ycPi2g7nFH5cg4PyHg6ha7d6UWBMEyqt+IQ9xJA3r19QdqBHpWMbN7BVA1v1oNfrD9hsQCxT5ZvvNxCAhxjyW/ffVI9IbsOwqQEzcEnR2TYbCIhsGDXt98X0LgQG3tr+m9fbe2cx7GngD4gRq+RUSL2X+X7D3tvb/031y60YjjRgAvd90vKzTYWrjjnad2v1xIwuVPVqBn+QHGlgQwsse8LK/NVBjvbdWj31Tj96PzSPJAq1UxoAGNJSgiwakMhU4SYluwPHGiDRor8wzKKBWtWUcGzyR7+7cEYDuqoKoUUDWq12h1bPrjszQ3eAOXS6nVY3waBMrHVmhu4AOGx+B4xSMs+ZGboFKZlrswEmK82HeVnW48wcXQKcnZXmI7BnOsbw2GPzZwwlAkfGazTe3NU49XbPHp+p0Xg7bADMKPU9ztPE0nbNnZeSPxclQsvVs2fczfRwprKs2/3Zl3XDWQJXTMsw/jqGnXV97uysy39KTcZxnBfztDifj1f0OD9zRQ+8A+8KtsuWT5M+PE3cM0qJCZ4m1y3/80GOGOdp4u4yJTwo8KSxItHuJZrwM9JECACeIedRUsG/ar8BU2x86/m/4ZAAAAAASUVORK5CYII="
    }
} //https://icons8.com/icon/set/flag/color


export default function UserMenu({ user }: { user: string }) {
    const pathName = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const locale = useLocale()
    return (
        <DropdownMenuContent className="w-56  border-light-gray" align="end" sideOffset={14}>
            <DropdownMenuItem>
                <User />
                <span>{user}</span>
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
                        <Sun />
                        <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setTheme('dark')} >
                        <Moon />
                        <span>Dark</span>
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
                            <Image src={locales[key].image} width={18} height={18} alt={key} key={key} unoptimized />
                            <p>{locales[key].name}</p>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuItem>
                <LogOut />
                <span>Log Out</span>
            </DropdownMenuItem>
        </DropdownMenuContent >
    )
}