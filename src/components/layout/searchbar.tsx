'use client'

import { cn } from "@/lib/utils"
import clsx from "clsx";
import { useState } from "react";

interface SearchBarProps {
    className?: string
}

export default function SearchBar({ className }: SearchBarProps) {
    const [search, setSearch] = useState<string>("");
    // const [searchedItems, setSearchedItems] = useState<[]>();
    const searchedItems = [
        "Apple",
        "Banana",
        "Cherry",
        "Date",
        "Grapes",
        "Mango",
        "Orange",
        "Peach",
    ];
    return (
        <div className={"relative w-full z-10"}>
            <div className={cn("flex p-1 overflow-hidden justify-between", className)}>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => {
                        e.preventDefault();
                        setSearch(e.target.value)
                    }}
                    className={"bg-inherit w-full h-full focus-visible:outline-none pl-3"} />
                <button
                    className={clsx({ "hidden": search === "" })}
                    onClick={() => setSearch("")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                </button>
            </div>
            {search && <SearchItemList items={searchedItems} />}
        </div>
    )
}

function SearchItemList({ items }: { items?: string[] }) {
    if (!items || items.length === 0)
        return null
    return (
        <div className="absolute w-full top-full mt-1 bg-background text-foreground border rounded-lg max-h-60 overflow-y-auto scrollbar-thin custom-scrollbar z-10">
            {
                items.map((item, index) => (
                    <div
                        key={index}
                        className="p-3 hover:bg-muted cursor-pointer"
                    >
                        {item}
                    </div>
                ))
            }
        </div>
    )
}