'use client'
import {Button} from "@/components/ui/button";
import {ResumeCollapse} from "@/app/(protected)/app/(pages)/customers/components/(list)/resume-customers";
import {Icons} from "@/components/icons";
import {NewCustomerButton} from "@/app/(protected)/app/(pages)/customers/components/(btn)/new-customer-button";
import Filter from "@/app/(protected)/app/(pages)/customers/components/(list)/filters";
import {Input} from "@/components/ui/input";
import {EmailSender} from "@/app/(protected)/app/(pages)/customers/components/(form)/email-writer-form";
import {useEffect, useState} from "react";
import CustomersTable from "@/app/(protected)/app/(pages)/customers/components/(list)/customers-table";
import ButtonExcelExport from "@/components/app/export/button-excel-export";
import {createClient} from "@/utils/supabase/client";


interface IEmailProps {
    name: string
    email: string
}

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

export default function Customers() {

    const [showEmail, setShowEmail] = useState<boolean>(false)
    const [showEdit, setShowEdit] = useState<boolean>(false)
    const [emailPros, setEmailProps] = useState<IEmailProps>({
        name: "",
        email: "",
    })
    const [loading, setLoading] = useState<boolean>(true)
    const supabase = createClient()
    const [customers, setCustomers] = useState<ICustomer[]>([])
    const [offsetTable, setOffsetTable] = useState<number>(0)
    const columns = [
        {value: "name", columnName: "Name"},
        {value: "phone", columnName: "Phone Num"},
        {value: "email", columnName: "Email"},
        {value: "role", columnName: "Role"},
        {value: "tags", columnName: "Tags"},
        {value: "stage", columnName: "Stage"},
        {value: "company", columnName: "Company"}
    ]
    const tableRows = 20
    const getCustomers = async () => {
        setLoading(true)
        const {
            data: {user},
        } = await supabase.auth.getUser()

        if (user) {

            const {data, error, status} = await supabase
                .from('clients')
                .select(`*, clients_company(*)`)
                .eq('user_id', user?.id)
                .range((offsetTable * tableRows), (offsetTable + 1) * tableRows)

            setCustomers(data?.map(x => x as ICustomer) ?? [])
            setLoading(false)
        }
    }

    useEffect(() => {
        getCustomers()
    }, [])

    const prepareExportData = () => {
        return customers.map((cons) => {
            return {
                ...cons,
                tags: cons.tags?.tags.join(',')
            }
        })
    }

    const filterItems = (event: any) => {
        console.log(event)
    }

    const openEditDialog = (customerId: string) => {
        console.log(customerId)
    }

    function openEmailDialog(props: IEmailProps) {
        setEmailProps(props)
        setShowEmail(true)
    }

    function closeEmailDialog() {
        setShowEmail(false)
    }


    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <ResumeCollapse/>
            {showEmail &&
                <EmailSender closeEmailDialog={() => closeEmailDialog()} info={emailPros}/>
            }
            <div className="border shadow-sm rounded-lg">
                <div className="">
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <h2 className="font-semibold text-lg">Leads</h2>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 mr-2">
                                <Input
                                    className="max-w-md h-9"
                                    placeholder="Search leads..."
                                    type="search"
                                />
                                <Button variant="outline" size="sm">
                                    <Icons.SearchIcon className="h-4 w-4 mr-2"/>
                                    Search
                                </Button>
                            </div>
                            <div className="flex items-center gap-4 mr-2">
                                <Filter></Filter>
                                <ButtonExcelExport
                                    columnNames={columns.map(c => c.columnName)}
                                    rows={prepareExportData()}
                                    sheetName={"Customers"}
                                    filename={"ExportCustomers.xlsx"}
                                />
                            </div>
                            <NewCustomerButton/>
                        </div>
                    </div>
                    <CustomersTable
                        customers={customers}
                        columns={columns.map(c => c.columnName)}
                        loading={loading}
                        openEmailDialog={(props) => openEmailDialog(props)}
                        openEditDialog={(clientId: string) => openEditDialog(clientId)}
                    />
                </div>
            </div>
        </main>
    )
}
