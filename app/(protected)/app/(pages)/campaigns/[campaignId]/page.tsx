"use client"
import * as React from "react";
import {useRef, useState} from "react";
import {EmailEditor} from "react-email-editor";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {createClient} from "@/utils/supabase/client";
import {Tables} from "@/lib/database.types";
import {toast} from "@/components/ui/use-toast";

export const dynamic = 'force-dynamic'
// @ts-ignore
export default function Page({params}) {
    const campaignId = params.campaignId
    const [loading, setLoading] = useState<boolean>(false)
    const [campaignName, setCampaignName] = useState<string | null>("")
    const [campaign, setCampaign] = useState<Tables<'campaigns'>>()
    const emailEditorRef = useRef(null);
    const supabase = createClient()
    const getCampaign = async () => {
        try {
            const {data} = await supabase.from('campaigns').select().eq('id', campaignId).single()
            if (data) {
                setCampaignName(data.name)
                setCampaign(data)
                //@ts-ignore
                emailEditorRef?.current.editor.loadDesign(data.json || {});
            }
        } catch (e) {
            console.error(e)
        }
    }
    const exportHtml = async () => {
        setLoading(true)

        try {

            // @ts-ignore
            emailEditorRef?.current.editor.exportHtml(async (d) => {
                const {design, html} = d;
                const data = await supabase.from('campaigns').update({
                    html: html,
                    json: design,
                    name: campaignName
                }).eq('id', campaignId)
            });
            toast({
                title: 'Saved',
                description: 'Your campaign has been saved'
            })

        } catch (e) {
            toast({
                title: 'Error',
                description: 'Something went wrong =(',
                variant: 'destructive'
            })
            console.error(e)
        } finally {
            setLoading(false)
        }
    };

    const onLoad = async () => {
        await getCampaign()
        // console.log('onLoad', campaign)
        // @ts-ignore

        // editor instance is created
        // you can load your template here;
        // const templateJson = {};
        // emailEditorRef.current.editor.loadDesign(templateJson);
    }

    const onReady = () => {
        // editor is ready
        console.log('onReady');
    };

    return (
        <>
            <div className="flex justify-around p-4" style={{
                alignItems: 'end'
            }}>
                <div className="container mx-auto grid grid-cols-12 gap-6">
                    <div className="flex-1 col-span-10">
                        <Label htmlFor="campaigns-name">Campaigns Name</Label>
                        <Input className="flex h-10 w-full rounded-md border border-input bg-background"
                               value={campaignName ?? ""}
                               onChange={(e) => setCampaignName(e.target.value)}
                               id="campaigns-name"/>
                    </div>
                </div>
                <div className="col-span-2">
                    <Button onClick={exportHtml}>Save Campaign</Button>
                </div>

            </div>

            <EmailEditor
                style={{minHeight: 900}}
                ref={emailEditorRef}
                onLoad={onLoad}
                onReady={onReady}
            />
        </>
    )
}
