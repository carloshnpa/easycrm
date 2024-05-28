import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import LogoutButton from "@/components/app/layouts/auth/logout-button";
import UserAvatar from "@/components/app/layouts/user/user-avatar";
import {ModeToggle} from "@/components/app/layouts/theme/theme-selector";

export default function NavBar() {

    return (
        <header className="flex h-[59px] w-full shrink-0 items-center px-4 md:px-6">
            <div className="ml-auto">
                <div className="flex align-middle">
                    <ModeToggle/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="rounded-full" size="icon" variant="outline">
                                <UserAvatar/>
                                <span className="sr-only">User menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem asChild>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <>
                                    <LogoutButton/>
                                </>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
