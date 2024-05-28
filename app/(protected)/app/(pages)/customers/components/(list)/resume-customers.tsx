"use client"

import * as React from "react"
import {Eye, EyeOff} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export function ResumeCollapse() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full space-y-2"
        >
            <div className="flex items-center justify-between space-x-4">
                <h3 className="text-sm font-semibold">
                    Insights
                </h3>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-9 p-0">
                        {isOpen ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            {/*<div className="rounded-md border px-4 py-3 font-mono text-sm">*/}
            {/*    Insights*/}
            {/*</div>*/}
            <CollapsibleContent className="space-y-2">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

                    <Card>
                        <CardHeader>
                            <CardTitle>Total Leads</CardTitle>
                            <CardDescription>The total number of leads in your CRM</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">1,234</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>New Leads</CardTitle>
                            <CardDescription>The number of new leads added this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">234</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Lead Conversion Rate</CardTitle>
                            <CardDescription>The percentage of leads that have been converted to
                                customers</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold">45%</div>
                        </CardContent>
                    </Card>
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}
