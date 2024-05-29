import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Icons} from "@/components/icons";
import * as React from "react";
import {useCallback} from "react";
import {PencilIcon, TrashIcon} from "lucide-react"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface ICustomer {
    id: string
    name: string
    phone: string
    email: string
    role: string
    tags: any
    stage: string,
    clients_company?: {
        name?: string
    }
}

export default function CustomersTable(
    {
        openEmailDialog,
        openEditDialog,
        loading,
        customers,
        columns
    }: {
        customers: ICustomer[],
        loading: boolean,
        columns: string[],
        openEditDialog: (clientId: string) => void,
        openEmailDialog: (props: {
            name: string,
            email: string
        }) => void
    }) {

    // const supabase = createClient()
    // const [loading, setLoading] = useState<boolean>(true)
    // const [offsetTable, setOffsetTable] = useState<number>(0)

    const tableRows = 20


    // const getCount = async () => {
    //     const {data, error} = await supabase
    //         .from('clients')
    //         .select('*', {count: 'exact', head: true})
    //
    //     if (!error) {
    //         // const count = data[0].count;
    //         console.log(data)
    //     }
    // }


    //
    // useEffect(() => {
    //     getCount()
    //     getCustomers()
    // }, [])

    const onButtonClickCapture = useCallback((event: React.MouseEvent<HTMLButtonElement>, row: ICustomer) => {
        // console.log(row)
        openEmailDialog({
            name: row.name,
            email: row.email
        })
    }, [openEmailDialog]);


    return (
        <>
            {loading ? (
                <div className="flex-1 align-middle justify-center flex p-5">
                    <Icons.spinner className="mr-2 h-10 w-10 animate-spin"/>
                </div>
            ) : (

                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((col, index) => <TableHead
                                key={"col_" + index}>{col}</TableHead>)}
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.length && customers.map((row, index) => {
                                return (
                                    <TableRow key={"row_" + index}>
                                        <TableCell>
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.phone}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                        <TableCell>
                                            {row.tags && row.tags.tags && row.tags.tags.map((tag: string) => (
                                                <Badge
                                                    key={"tag" + tag}
                                                    className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                                    variant="outline"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                                                variant="outline"
                                            >
                                                {row.stage}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                                                variant="outline"
                                            >
                                                {row.clients_company?.name ?? "-"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => openEditDialog(row.id)}
                                                    variant="outline"
                                                >
                                                    <PencilIcon className="w-4"/>
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClickCapture={(e) => onButtonClickCapture(e, row)}>
                                                    <Icons.MailIcon className="w-4"/>
                                                    <span className="sr-only">Email</span>
                                                </Button>
                                                <Button size="sm" variant="outline"
                                                        className="bg-red-300 text-white">
                                                    <TrashIcon className="w-4"/>
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        )}
                    </TableBody>
                </Table>

            )}
            <div className="flex items-center justify-between px-4 py-3 border-t">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#"/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink isActive href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationNext href="#"/>
                    </PaginationContent>
                </Pagination>
                <div className="text-sm text-gray-500 dark:text-gray-400">Showing 1-10 of 100 leads</div>
            </div>
        </>
    )
}
