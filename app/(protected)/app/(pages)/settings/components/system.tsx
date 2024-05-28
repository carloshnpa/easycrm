import type {User} from "@supabase/auth-js";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function Settings({user}: { user: User }) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>
                        Change your password here. After saving, youll be logged out.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Label htmlFor="current">Current password</Label>
                        <Input id="current" type="password"/>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="new">New password</Label>
                        <Input id="new" type="password"/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save password</Button>
                </CardFooter>
            </Card>

        </>
    )
}
