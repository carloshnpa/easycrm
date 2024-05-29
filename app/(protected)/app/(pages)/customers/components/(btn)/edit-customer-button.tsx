import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import CreateCustomerForm from "@/app/(protected)/app/(pages)/customers/components/(form)/create-customer-form";
import * as React from "react";

export default function EditCustomerButton(
    {
        customerId
    }: { customerId: string }) {

    console.log(customerId)

    return <>
        <Dialog open>
            <DialogContent className="sm:max-w-[800px] md:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>Create a new Customer</DialogTitle>
                </DialogHeader>
                <CreateCustomerForm/>
            </DialogContent>
        </Dialog>

    </>
}
