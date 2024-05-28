import * as React from "react"
import {useEffect, useState} from "react"
import {MailIcon, PaperclipIcon, PhoneIcon} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Skeleton} from "@/components/ui/skeleton";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SubmitHandler, useForm} from "react-hook-form";
import {Icons} from "@/components/icons";
import {createClient} from "@/utils/supabase/client";


type EmailProps = {
    name: string
    email: string
}

type IUserInfo = {
    name: string | null
    email: string | null
    company: string | null
    avatarUrl: string | null
}
type Inputs = {
    email: string
    name: string
    subject: string
    content: string
    attachments?: Blob[]
}


export function EmailSender({info, closeEmailDialog}: { info?: EmailProps, closeEmailDialog: () => void }) {


    const supabase = createClient()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        name: null,
        email: null,
        company: null,
        avatarUrl: null,
    })
    const getUser = async () => {
        setIsLoadingUser(true)
        const {
            data: {user},
        } = await supabase.auth.getUser()

        if (user?.id) {
            const {data, error, status} = await supabase
                .from('profiles')
                .select(`full_name, avatar_url, phone, website, company(name)`)
                .eq('id', user?.id)
                .maybeSingle()


            let urlAvatar = '/img/placeholder.svg'
            if (data?.avatar_url) {
                const urlPublic = await supabase.storage.from('avatars').createSignedUrl(data?.avatar_url, 24 * 60 * 60)
                if (urlPublic.data?.signedUrl) urlAvatar = urlPublic.data?.signedUrl
            }
            if (data) {
                setUserInfo({
                    name: data.full_name,
                    email: user?.email ?? null,
                    avatarUrl: urlAvatar,
                    company: data.company?.name ?? null
                })
            }

            setIsLoadingUser(false)
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()


    const onClickSend: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        try {
            const resp = await fetch('/api/email/customer-contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    sender: userInfo
                })
            })
            console.log(resp)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>


            <Drawer shouldScaleBackground={false} open>
                <DrawerContent className={"w-[600px] ml-auto"}>
                    {
                        isLoadingUser ?
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full"/>
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]"/>
                                    <Skeleton className="h-4 w-[200px]"/>
                                </div>
                            </div> :
                            <div className="mx-auto w-full max-w-lg">
                                <DrawerHeader>
                                    <DrawerTitle>
                                        {info?.name ? 'Send Email to ' + info.name : 'Send Email'}
                                    </DrawerTitle>
                                    <DrawerDescription>Initiate email communication with leads directly from the
                                        CRM.</DrawerDescription>
                                </DrawerHeader>
                                <Card>
                                    <CardContent>
                                        <form onSubmit={handleSubmit(onClickSend)}>
                                            <div className="grid gap-4 mt-3">
                                                <div className="flex items-center gap-4">
                                                    <Avatar>
                                                        <AvatarImage alt="John Doe" src="/placeholder.jpg"/>
                                                        <AvatarFallback></AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{info?.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                                            {info?.email}
                                                        </div>
                                                    </div>
                                                    <div className="ml-auto flex items-center gap-2">
                                                        <Button size="icon" variant="outline">
                                                            <MailIcon className="h-4 w-4"/>
                                                        </Button>
                                                        <Button size="icon" variant="outline">
                                                            <PhoneIcon className="h-4 w-4"/>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="grid gap-2">
                                                    <Input
                                                        {...register("subject", {
                                                            required: "Enter email subject"
                                                        })}
                                                        placeholder="Subject"
                                                        type="text"
                                                        name="subject"
                                                        id="subject"
                                                        disabled={isLoading}
                                                    />
                                                    {errors.subject &&
                                                        <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                                                    <Input
                                                        className="hidden"
                                                        {...register("email")}
                                                        name="email"
                                                        value={info?.email}
                                                    />
                                                    <Textarea
                                                        {...register("content", {
                                                            required: "Blank email is not allowed"
                                                        })}
                                                        className="min-h-[150px]"
                                                        placeholder="Compose email..."
                                                        name="content"
                                                        id="content"
                                                        disabled={isLoading}
                                                    />
                                                    {errors.content &&
                                                        <p className="text-red-500 text-sm">{errors.content.message}</p>}

                                                    <div className="flex align-middle justify-between">
                                                        <div className="py-2">
                                                            <DrawerFooter className="p-0">
                                                                <DrawerClose asChild>
                                                                    <Button onClick={closeEmailDialog} color="warning"
                                                                            variant="outline">Cancel</Button>
                                                                </DrawerClose>
                                                            </DrawerFooter>
                                                        </div>
                                                        <div className={
                                                            "flex items-center gap-2"
                                                        }>
                                                            <Button variant="outline">
                                                                <PaperclipIcon className="h-4 w-4 mr-2"/>
                                                                Attach
                                                            </Button>
                                                            <Button disabled={isLoading}>
                                                                {isLoading && (
                                                                    <Icons.spinner
                                                                        className="mr-2 h-4 w-4 animate-spin"/>
                                                                )}
                                                                Send
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>

                            </div>
                    }
                </DrawerContent>
            </Drawer>

        </>
    )
}
