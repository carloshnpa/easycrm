import {Dialog, DialogContent, DialogFooter, DialogTrigger} from "@/components/ui/dialog";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {createClient} from "@/utils/supabase/client";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import * as React from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Textarea} from "@/components/ui/textarea";

const FormSchema = z.object({
    name: z.string({required_error: 'Name is required'}).email(),
    price: z.number().default(0),
    description: z.string(),
    photo_url: z.string().optional()
})


export default function CreateProduct() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })


    const supabase = createClient()
    const addProduct = async () => {

    }

    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button size="sm" className="h-7 gap-1">
                        <PlusCircle className="h-3.5 w-3.5"/>
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Product
                          </span>
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <Form {...form}>
                        <Card>
                            <CardHeader>
                                Create New Product
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-[1fr_2fr]">
                                    <div className="photo">
                                        <Avatar>
                                            <AvatarImage></AvatarImage>
                                            <AvatarFallback>P</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="form">

                                        <div className="space-y-2">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Name
                                                            <span className="text-red-600">*</span>
                                                        </FormLabel>
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
                                                name="price"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Price
                                                            <span className="text-red-600">*</span>
                                                        </FormLabel>
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
                                                name="description"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Description
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea  {...field} />
                                                        </FormControl>
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <DialogFooter>

                            <Button type={"submit"} className="mt-4">Add Product</Button>
                        </DialogFooter>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}
