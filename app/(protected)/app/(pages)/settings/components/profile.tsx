'use client'
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import type {User} from "@supabase/auth-js";
import {z} from 'zod'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {createClient} from "@/utils/supabase/client";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";

type TProfile = {
    full_name: string
    avatar_url: string
    phone: string
    website: string
}
const profileSchema = z.object({
    full_name: z.string(),
    phone: z.string(),
    website: z.string()
})

type ProfileData = z.infer<typeof profileSchema>
export default function Profile({user, profile, avartarUrl}: {
    user: User | null,
    profile: TProfile | null,
    avartarUrl: string
}) {

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<ProfileData>({
        resolver: zodResolver(profileSchema)
    })

    const supabase = createClient()

    async function updateProfile({
                                     full_name,
                                     website,
                                     phone
                                 }: ProfileData) {
        try {
            const {error} = await supabase.from('profiles').upsert({
                id: user?.id as string,
                full_name: full_name,
                website: website,
                phone: phone,
                updated_at: new Date().toISOString(),
            })
            if (error) throw error
            toast({
                title: "Scheduled: Catch up ",
                description: "Friday, February 10, 2023 at 5:57 PM"
            })
        } catch (error) {
            console.log(error)
            // alert('Error updating the data!')
        } finally {
            // setLoading(false)
        }
    }


    return (

        <>
            <Card>
                <form onSubmit={handleSubmit(updateProfile)}>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>
                            Make changes to your account here. Click save when youre done.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" {...register('full_name')} placeholder="Enter your name"
                                       defaultValue={profile?.full_name}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" {...register('phone')} defaultValue={profile?.phone}
                                       placeholder="Enter your phone number"
                                       type="tel"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="LinkedIn">LinkedIn</Label>
                                <Input id="LinkedIn" {...register('website')} defaultValue={profile?.website}
                                       placeholder="Enter your LinkedIn"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profile-picture">Profile Picture</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage alt="Profile Picture" src={avartarUrl}/>
                                        <AvatarFallback>JP</AvatarFallback>
                                    </Avatar>
                                    <Button variant="outline">Upload</Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Save changes</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}
