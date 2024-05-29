'use client'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"

import {SubmitHandler, useForm} from "react-hook-form"
import * as React from "react";
import {createClient} from "@/utils/supabase/client";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

type Inputs = {
    name: string
    website: string
    address: string
}

export default function Onboarding() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const supabase = createClient()
        setIsLoading(true)
        try {
            const {
                data: {user},
            } = await supabase.auth.getUser()
            if (user) {
                const company = await supabase.from('company')
                    .insert({
                        name: data.name,
                        website: data.website,
                        address: data.address,
                    }).select()

                if (company.data) {
                    const companyId = company.data[0].id
                    const {data, error} = await supabase.from('profiles').update({
                        company_id: companyId
                    }).eq(
                        'id', user.id
                    )
                    if (!error) {
                        revalidatePath('/app/onboarding') // Update cached posts
                        redirect(`/app`)
                    }
                }
            }

        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="flex-1 ">
                <div className="container mx-auto grid grid-cols-12 gap-6 py-8">

                    <div className="col-span-12 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold mb-2">Company Configuration</h1>
                                <p className="text-gray-500 dark:text-gray-400">Set up your company details and
                                    preferences, then you can navigate throw the application </p>
                            </div>
                            <div className=" grid-cols-12 space-y-4">
                                <div>
                                    <Label htmlFor="company-name">Company Name <span
                                        className="text-red-600">*</span></Label>
                                    <Input id="company-name" {...register("name", {
                                        required: "Inform your Company name"
                                    })}/>
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="company-website">Company Website</Label>
                                    <Input id="company-website" {...register("website")}/>
                                </div>
                                <div>
                                    <Label htmlFor="company-address">Address</Label>
                                    <Textarea id="company-address" {...register("address")}
                                              placeholder="123 Main St, Anytown USA" rows={3}/>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <Button variant="default" type={"submit"}>Save Changes</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
