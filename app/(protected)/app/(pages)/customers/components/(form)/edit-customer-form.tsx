'use client'

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Separator} from "@/components/ui/separator"
import {Button} from "@/components/ui/button"
import {createClient} from "@/utils/supabase/client";
import * as React from "react";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {TablesInsert} from "@/lib/database.types"
import {toast} from "@/components/ui/use-toast";

type ICustomer = {
    id: string
    email: string
    linkedin: string
    name: string
    phone: string
    role: string
    stage: string
    tags: string[]
}

type ICompany = {
    id: string
    linkedin: string
    name: string
    segment: string
    website: string
}

type ICustomerProp = {
    customer: ICustomer
    company: ICompany
}

const FormSchema = z.object({
    customer: z.object({
        email: z.string({required_error: 'Email is required'}).email(),
        linkedin: z.string().url().optional(),
        name: z.string({required_error: 'Name is required'}),
        phone: z.string().optional(),
        role: z.string().default('other').optional(),
        stage: z.string({required_error: 'Stage is required'}),
        tags: z.string().optional()
    }),
    company: z.object({
        linkedin: z.string({invalid_type_error: 'Inform a valid url'}).optional(),
        name: z.string({required_error: 'Name is required'}),
        segment: z.string().optional(),
        website: z.string().optional(),
    }),
})

const industrySegments = [
    {value: "technology", label: "Technology"},
    {value: "finance", label: "Finance"},
    {value: "energy", label: "Energy"},
    {value: "construction", label: "Construction"},
    {value: "transportation", label: "Transportation"},
    {value: "healthcare", label: "Healthcare"},
    {value: "sales", label: "Sales"},
    {value: "food", label: "Food"},
    {value: "retail", label: "Retail"},
    {value: "other", label: "Other"},
]


export default function EditCustomerForm({propEdit}: { propEdit: ICustomerProp }) {
    const supabase = createClient()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        const {
            data: {user},
        } = await supabase.auth.getUser()
        setIsLoading(true)
        try {
            const companyRow = data.company as TablesInsert<'clients_company'>
            companyRow.user_id = user?.id
            const company = await supabase.from('clients_company')
                .insert(companyRow)
                .select('*')
            if (company.error) throw company.error

            if (company.data.length) {
                const clientRow = data.customer as TablesInsert<'clients'>
                clientRow.user_id = user?.id
                clientRow.client_company_id = company.data[0].id

                const customer = await supabase.from('clients').insert(clientRow)
                if (customer.error) throw customer.error

                toast({
                    title: "Yeah! Custumer inserted.",
                    description: "Send an email ; )",
                })

            }
        } catch (e) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
        } finally {

        }
        // console.log(data)
        // await login(data)
        setIsLoading(false)
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                    <CardDescription>Please provide the following details about the client and the
                        company</CardDescription>
                </CardHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="customer.name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Name <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="customer.email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="customer.phone"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    {/*// @ts-ignore*/}
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="customer.linkedin"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Customer LinkedIn</FormLabel>
                                                <FormControl>
                                                    {/*// @ts-ignore*/}
                                                    <Input placeholder="Enter LinkedIn profile"  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="customer.role"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Customer Role</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select role"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="owner">Owner</SelectItem>
                                                        <SelectItem value="manager">Manager</SelectItem>
                                                        <SelectItem value="employee">Employee</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                    <FormMessage/>
                                                </Select>
                                            </FormItem>
                                        )}/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <FormField

                                        control={form.control}
                                        name="customer.tags"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Tags</FormLabel>
                                                <FormControl>
                                                    {/*// @ts-ignore*/}
                                                    <Input placeholder="Enter tags separated by commas" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="customer.stage"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Customer Stage <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select current stage"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="prospect">Prospect</SelectItem>
                                                        <SelectItem value="lead">Lead</SelectItem>
                                                        <SelectItem value="opportunity">Opportunity</SelectItem>
                                                        <SelectItem value="customer">Customer</SelectItem>
                                                    </SelectContent>
                                                    <FormMessage/>
                                                </Select>
                                            </FormItem>
                                        )}/>
                                </div>
                            </div>
                            <Separator/>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="company.name"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Company Name <span
                                                    className="text-red-600">*</span></FormLabel>
                                                <FormControl>
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="company.website"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Company Website</FormLabel>
                                                <FormControl>
                                                    {/*// @ts-ignore*/}
                                                    <Input  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="company.linkedin"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Company LinkedIn</FormLabel>
                                                <FormControl>
                                                    {/*// @ts-ignore*/}
                                                    <Input placeholder="Enter LinkedIn profile"  {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <div className="space-y-2">
                                    <FormField
                                        control={form.control}
                                        name="company.segment"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Industry Segment</FormLabel>
                                                <Select onValueChange={field.onChange}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select your industry"/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {industrySegments.map((x) => <SelectItem key={"seg_" + x.value}
                                                                                                 value="prospect">x.label</SelectItem>)}
                                                    </SelectContent>
                                                    <FormMessage/>
                                                </Select>
                                            </FormItem>
                                        )}/>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">Cancel</Button>
                            <Button type="submit">Save</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </>
    )
}
