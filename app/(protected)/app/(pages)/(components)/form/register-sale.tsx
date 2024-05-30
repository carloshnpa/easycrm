'use client'
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Input} from "@/components/ui/input";
import {useEffect, useState} from "react";
import {createClient} from "@/utils/supabase/client";

type IClient = {
    id: string,
    name: string,
    company: string,
}

type IProduct = {
    id: string,
    name: string,
    price: number
}
export default function RegisterSale() {

    const supabase = createClient()
    const [clients, setClients] = useState<IClient[]>([])
    const [products, setProducts] = useState<IProduct[]>([])
    const getClients = async () => {
        try {
            const customers = await supabase.from('clients').select('*, clients_company(name)')
            if (customers.error) throw customers.error
            if (customers.data) {
                // @ts-ignore
                const clientsFormated = customers.data.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        company: x.clients_company?.name || ""
                    }
                })
                // @ts-ignore
                setClients(clientsFormated)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getProducts = async () => {
        try {
            const products = await supabase.from('products').select()
            if (products.error) throw products.error
            if (products.data) {
                // @ts-ignore
                const productsFormated = products.data.map(x => {
                    return {
                        id: x.id,
                        name: x.name,
                        price: x.price
                    }
                })
                // @ts-ignore
                setProducts(productsFormated)
            }
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getClients()
        getProducts()
    }, [])

    return (
        <>
            <Dialog>

                <DialogTrigger asChild>
                    <Button
                        onClick={() => {
                        }}
                    >New Sale</Button>
                </DialogTrigger>
                <DialogContent>
                    <Card>
                        <CardHeader>
                            <CardTitle>Register Sale</CardTitle>
                            <CardDescription>Complete the sale registration form.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="client">Client</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select client"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clients.map((client) =>
                                                <SelectItem key={client.id}
                                                            value={client.id}
                                                >{client.name} ({client.company})</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="product">Product</Label>

                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select product"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {products.map((p) =>
                                                <SelectItem key={p.id}
                                                            value={p.id}
                                                >{p.name} ({p.price})</SelectItem>
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="amount">Amount</Label>
                                    <Input id="amount" placeholder="Enter amount" type="number"/>
                                </div>
                                <Button className="w-full" type="submit">
                                    Register Sale
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </DialogContent>
            </Dialog>
        </>
    )

}
