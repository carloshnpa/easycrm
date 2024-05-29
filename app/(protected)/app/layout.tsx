import SideBar from "@/components/app/layouts/SideBar";
import NavBar from "@/components/app/layouts/NavBar";
import {Separator} from "@/components/ui/separator";
import {Toaster} from "@/components/ui/toaster";
import Script from "next/script";

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
            <Script id="clarity-script" strategy="afterInteractive">
                {process.env.ENVIRONMENT === 'production' && `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
            </Script>
        </>
    );
}
