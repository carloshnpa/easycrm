'use client'
import {EyeIcon, FileIcon, PenIcon, TrashIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {Icons} from "@/components/icons";
import {Tables} from "@/lib/database.types";
import {useRouter} from "next/navigation";
import {ScrollArea} from "@/components/ui/scroll-area";
import Preview from "@/app/(protected)/app/(pages)/campaigns/components/preview";
import {toast} from "@/components/ui/use-toast";

export default function Campaigns() {

    const [campaigns, setCampaigns] = useState<Tables<'campaigns'>[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<string>("")
    const [campaignPreview, setCampaignPreview] = useState<Tables<'campaigns'>>()
    const [loadingCampaignPreview, setLoadingCampaignPreview] = useState<boolean>(false)
    const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
    const supabase = createClient()
    const router = useRouter()

    const handlePreview = async (campaignId: string) => {
        setLoadingCampaignPreview(true)
        try {
            const data = await supabase.from('campaigns')
                .select()
                .eq('id', campaignId)
                .single()
            if (data.data) {
                setCampaignPreview(data.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoadingCampaignPreview(false)
        }

    }

    const handleDeleteCampaign = async (campaignId: string) => {
        try {
            setLoadingDelete(campaignId)
            const {error} = await supabase.from('campaigns').delete().eq('id', campaignId)
            if (error) throw error
            toast({
                title: 'Campaign deleted'
            })
            await getCampaigns()
            if (campaignId === campaignPreview?.id) {
                setCampaignPreview(undefined)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoadingDelete("")
        }
    }

    const getCampaigns = async () => {
        setLoading(true)
        try {
            const data = await supabase.from('campaigns').select()
            if (data.data) {
                setCampaigns(data.data)
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCampaigns()
    }, [])

    const createCampaign = async () => {
        try {
            setLoadingCreate(true)
            const data = await supabase.from('campaigns').insert({
                name: 'NewCampaign',
                html: ""
            }).select()
            if (data.data) {
                console.log(data.data)
                const campaignId = data.data[0].id
                // revalidatePath('/app/campaigns/', 'page')
                console.log(campaignId, '/app/campaigns/' + campaignId)
                router.push('/app/campaigns/' + campaignId)
            }
        } catch (e) {
            console.error(e)
        } finally {
            setLoadingCreate(false)
        }
    }

    return (
        <div className="grid py-5">
            <div className="grid grid-cols-[320px_1fr] gap-5">
                <div className="ml-5">
                    <div
                        className="flex h-full w-full max-w-xs flex-col border-r border-gray-200">
                        <div className="flex-1 overflow-auto p-2">
                            <h2 className="">Select Your Campaign</h2>
                            <Separator className='my-2'/>
                            {loading ? <div className="flex-1 align-middle justify-center flex p-5">
                                    <Icons.spinner className="mr-2 h-10 w-10 animate-spin"/>
                                </div> :

                                <div className="grid gap-1">
                                    <ScrollArea className="h-100 w-full rounded-md border">
                                        {campaigns.map((campaign, index) => {
                                            return (
                                                <div className="flex align-middle justify-between border-b-2"
                                                     key={"camp" + index}>
                                                    <a href={`/app/campaigns/${campaign.id}`}
                                                       className="group flex cursor-pointer items-center gap-2 rounded-md p-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
                                                        <FileIcon
                                                            className="h-5 w-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50"/>
                                                        <span>{campaign.name}</span>
                                                    </a>
                                                    <div
                                                        className="grid-cols-3 gap-2 flex align-middle my-auto mr-2">
                                                        <Button className={"w-4 h-4 p-0"} variant={"outline"}
                                                                onClick={() => handlePreview(campaign.id)}>
                                                            <EyeIcon className={"w-3 h-3"}/>
                                                        </Button>
                                                        <Button className={"w-4 h-4 p-0"} variant={"outline"}>
                                                            <PenIcon className={"w-3 h-3"}/>
                                                        </Button>
                                                        <Button className={"w-4 h-4 p-0"} variant={"outline"}
                                                                onClick={() => handleDeleteCampaign(campaign.id)}>
                                                            {loadingDelete === campaign.id ?
                                                                <Icons.spinner className="h-3 w-3 animate-spin"/> :
                                                                <TrashIcon className={"w-3 h-3"}/>}
                                                        </Button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </ScrollArea>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex mr-5">
                    <div className="w-full">
                        <div className="flex">
                            <div className="ml-auto">

                                <Button disabled={loadingCreate} onClick={() => createCampaign()} className="">
                                    {loadingCreate && (
                                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                    )}
                                    Create Campaign
                                </Button>
                            </div>
                        </div>
                        <div className="flex">
                            {loadingCampaignPreview &&
                                <div className={"flex align-middle justify-center mx-auto"}><Icons.spinner
                                    className="mr-2 h-20 w-20 animate-spin text-persian-blue-950"/>
                                </div>
                            }
                            {campaignPreview && (
                                <>
                                    <div className="block">
                                        <Preview html={campaignPreview.html}/>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
