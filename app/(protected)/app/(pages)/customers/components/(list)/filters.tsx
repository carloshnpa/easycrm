import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {Icons} from "@/components/icons";
import React from "react";

export default function Filter() {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size={"sm"}>
                        <Icons.FilterIcon className="h-4 w-4 mr-2"/>
                        Filters
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                    <DropdownMenuLabel>Filter Leads</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuCheckboxItem>
                        <div className="flex items-center justify-between">
                            <span>Lead Type</span>
                            <Icons.ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        <div className="flex items-center justify-between">
                            <span>Lead Category</span>
                            <Icons.ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        <div className="flex items-center justify-between">
                            <span>Lead Status</span>
                            <Icons.ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                        <div className="flex items-center justify-between">
                            <span>Lead Source</span>
                            <Icons.ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-gray-400"/>
                        </div>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem>
                        <Button className="w-full" variant="outline">
                            Apply Filters
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}
