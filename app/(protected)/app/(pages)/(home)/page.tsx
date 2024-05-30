import {createClient} from '@/utils/supabase/server'
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import Link from "next/link";
import {DollarSignIcon, PercentIcon} from "lucide-react";

export default async function Account() {
    const supabase = createClient()

    const {
        data: {user},
    } = await supabase.auth.getUser()

    return (
        <>
            <div className="flex-1 bg-gray-100 dark:bg-gray-950 p-6 md:p-10 grid gap-6">
                <div>
                    <h2 className={"font-semibold text-lg"}>Dashboard</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                        <div className="grid grid-cols-[1fr_4fr]">
                            <div className={"flex items-center justify-center"}>
                                <span className={"font-bold text-7xl"}>$</span>
                            </div>
                            <div>
                                <CardHeader className="flex items-center justify-between pb-2">
                                    <CardTitle className="text-lg font-bold">Total Sales</CardTitle>
                                </CardHeader>
                                <CardContent className={"text-center"}>
                                    <div className="text-3xl font-bold">$1,234,567</div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">+15% from last quarter</p>
                                </CardContent>

                            </div>
                        </div>

                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Average Deal Size</CardTitle>
                            <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$15,000</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+5% from last quarter</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                            <PercentIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">65%</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+2% from last quarter</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                            <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400"/>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">$3,456,789</div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">+20% from last quarter</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader className="flex items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Recent Deals</CardTitle>
                            <Link
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                View All
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Deal</TableHead>
                                        <TableHead>Stage</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Close Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <Link className="hover:underline" href="#">
                                                Acme Inc. - Website Redesign
                                            </Link>
                                        </TableCell>
                                        <TableCell>Negotiation</TableCell>
                                        <TableCell>$25,000</TableCell>
                                        <TableCell>June 15, 2023</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <Link className="hover:underline" href="#">
                                                Globex Corp. - CRM Implementation
                                            </Link>
                                        </TableCell>
                                        <TableCell>Proposal</TableCell>
                                        <TableCell>$35,000</TableCell>
                                        <TableCell>July 1, 2023</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            <Link className="hover:underline" href="#">
                                                Stark Industries - Marketing Campaign
                                            </Link>
                                        </TableCell>
                                        <TableCell>Closed Won</TableCell>
                                        <TableCell>$18,000</TableCell>
                                        <TableCell>May 30, 2023</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pipeline Overview</CardTitle>
                            <Link
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                View Details
                            </Link>
                        </CardHeader>
                        <CardContent>
                            {/*<StackedbarChart className="aspect-[9/4]"/>*/}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
