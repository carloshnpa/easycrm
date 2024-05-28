import SideBar from "@/components/app/layouts/SideBar";
import NavBar from "@/components/app/layouts/NavBar";
import {Separator} from "@/components/ui/separator";
import {Toaster} from "@/components/ui/toaster";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="grid min-h-screen w-full lg:grid-cols-[200px_1fr]">
                <SideBar/>
                <div className="flex flex-col">
                    <NavBar/>
                    <Separator className=""/>
                    <div className="">
                        {children}
                    </div>
                </div>
            </div>
            <Toaster/>
        </>
    );
}
