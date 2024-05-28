'use client'
import {Button} from "@/components/ui/button";
import {ResumeCollapse} from "@/app/(protected)/app/(pages)/customers/components/(list)/resume-customers";
import {Icons} from "@/components/icons";
import {NewCustomerButton} from "@/app/(protected)/app/(pages)/customers/components/(btn)/new-customer-button";
import Filter from "@/app/(protected)/app/(pages)/customers/components/(list)/filters";
import {Input} from "@/components/ui/input";
import {EmailSender} from "@/app/(protected)/app/(pages)/customers/components/(form)/email-writer-form";
import {useState} from "react";
import CustomersTable from "@/app/(protected)/app/(pages)/customers/components/(list)/customers-table";


interface IEmailProps {
    name: string
    email: string
}

export default function Customers() {

    const [showEmail, setShowEmail] = useState<boolean>(false)
    const [emailPros, setEmailProps] = useState<IEmailProps>({
        name: "",
        email: "",

    })
    const filterItems = (event: any) => {
        console.log(event)
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
                                <Button variant="outline" size="sm">
                                    <Icons.DownloadIcon className="h-4 w-4 mr-2"/>
                                    Export
                                </Button>
                            </div>
                            <NewCustomerButton/>
                        </div>
                    </div>
                    <CustomersTable openEmailDialog={(props) => openEmailDialog(props)}/>
                </div>
            </div>
        </main>
    )
}
