import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {DeleteIcon, TrashIcon} from "lucide-react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function Products() {
    return (
        <>
            <div className="container px-4 md:px-6 grid md:grid-cols-[240px_1fr] gap-10 items-start py-8">
                <div className="flex flex-col gap-4 items-start">
                    <Accordion className="w-full" collapsible type="single">
                        <AccordionItem value="filters">
                            <AccordionTrigger className="text-base font-semibold">Filters</AccordionTrigger>
                            <AccordionContent>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label className="text-sm font-medium">Category</Label>
                                        <RadioGroup className="flex flex-col gap-2" defaultValue="all" id="category">
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="category-all">
                                                <RadioGroupItem id="category-all" value="all"/>
                                                All
                                            </Label>
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="category-software">
                                                <RadioGroupItem id="category-software" value="software"/>
                                                Software
                                            </Label>
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="category-hardware">
                                                <RadioGroupItem id="category-hardware" value="hardware"/>
                                                Hardware
                                            </Label>
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="category-services">
                                                <RadioGroupItem id="category-services" value="services"/>
                                                Services
                                            </Label>
                                        </RadioGroup>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-sm font-medium">Price</Label>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label className="text-sm font-medium">Status</Label>
                                        <RadioGroup className="flex flex-col gap-2" defaultValue="all" id="status">
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="status-all">
                                                <RadioGroupItem id="status-all" value="all"/>
                                                All
                                            </Label>
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="status-active">
                                                <RadioGroupItem id="status-active" value="active"/>
                                                Active
                                            </Label>
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="status-draft">
                                                <RadioGroupItem id="status-draft" value="draft"/>
                                                Draft
                                            </Label>
                                            <Label className="flex items-center gap-2 text-sm font-normal"
                                                   htmlFor="status-archived">
                                                <RadioGroupItem id="status-archived" value="archived"/>
                                                Archived
                                            </Label>
                                        </RadioGroup>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </div>
                <div className="grid gap-6 md:gap-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold tracking-tight">Products</h1>
                            <p className="text-gray-500 dark:text-gray-400">Manage your digital products here.</p>
                        </div>
                        <Button className="ml-auto" size="sm">
                            Create Product
                        </Button>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">

                        <Card>
                            <CardHeader
                                className="p-3"
                            >
                                <img
                                    alt="Product Image"
                                    className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
                                    height={300}
                                    src="/img/placeholder.svg"
                                    width={300}
                                />
                            </CardHeader>
                            <CardTitle>
                                <div className="flex-1 p-2">
                                    <h3 className="font-semibold tracking-tight">Acme Analytics</h3>
                                    <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                                        Advanced analytics and reporting platform
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className="p-3">
                                <div className="text-right">
                                    <h4 className="font-semibold">$19.99/mo</h4>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-around">
                                <Button size="icon" variant="outline">
                                    <DeleteIcon className="w-4 h-4"/>
                                    <span className="sr-only">Edit</span>
                                </Button>
                                <Button className="text-red-500" size="icon" variant="outline">
                                    <TrashIcon className="w-4 h-4"/>
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
