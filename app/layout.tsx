import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/app/layouts/theme/theme-provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Easy CRM",
    description: "Simplify your success!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <body className={inter.className}>{children}</body>
        </ThemeProvider>
        </html>
    );
}
