import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import CreateCustomerForm from "@/app/(protected)/app/(pages)/customers/components/(form)/create-customer-form";

export function NewCustomerButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size={"sm"}>New Customer</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] md:max-w-[950px]">
                <DialogHeader>
                    <DialogTitle>Create a new Customer</DialogTitle>
                </DialogHeader>
                <CreateCustomerForm/>
            </DialogContent>
        </Dialog>
    )
}
