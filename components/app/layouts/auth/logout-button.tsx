'use client'
import {Button} from "@/components/ui/button";
import {logout} from "@/components/app/layouts/auth/actions";

export default function LogoutButton() {
    const handleLogout = async () => {
        await logout()
    }
    return (
        <>
            <Button
                onClick={() => handleLogout()}
                className="h-6 w-[100%] my-2"
                variant="outline"
            >

                Logout
            </Button>
        </>
    )
}
