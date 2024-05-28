import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {createClient} from "@/utils/supabase/server";
import {SettingsIcon, UserIcon, WorkflowIcon} from "lucide-react";
import Profile from "@/app/(protected)/app/(pages)/settings/components/profile";

export default async function Setting() {
    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser()

    const {data, error, status} = await supabase
        .from('profiles')
        .select(`full_name, avatar_url, phone, website`)
        .eq('id', user?.id)
        .maybeSingle()

    let urlAvatar = '/img/placeholder.svg'
    if (data?.avatar_url) {
        const urlPublic = await supabase.storage.from('avatars').createSignedUrl(data?.avatar_url, 24 * 60 * 60)
        if (urlPublic.data?.signedUrl) urlAvatar = urlPublic.data?.signedUrl
    }

    return (
        <div className="flex-1 md:p-8 p-4 align-middle">
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 md:p-8">
                <Tabs defaultValue="profile" className="w-[100%]">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="profile">
                            <UserIcon className="w-5 mr-2"/>
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="system">
                            <SettingsIcon className="w-5 mr-2"/>
                            System Settings
                        </TabsTrigger>
                        <TabsTrigger value="company">
                            <WorkflowIcon className="w-5 mr-2"/>
                            Company Settings
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Profile user={user} profile={data} avartarUrl={urlAvatar}></Profile>
                    </TabsContent>
                    <TabsContent value="system">
                    </TabsContent>
                    <TabsContent value="company">
                        <Card>
                            <CardHeader>
                                <CardTitle>Password</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you will be logged out.
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
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
