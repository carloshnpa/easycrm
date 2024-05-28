'use client'

import Image from "next/image"
import Link from "next/link"

import {cn} from "@/lib/utils"
import {Button, buttonVariants} from "@/components/ui/button"
import {UserAuthForm} from "@/app/login/components/user-auth-form"
import {useState} from "react";
import {UserLoginForm} from "@/app/login/components/user-login-form";

export default function AuthenticationPage() {
    const [formLogin, setFormLogin] = useState(false);
    return (
        <div className="d-flex items-center h-[100vh]">
            <div
                className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
            >

                <Button
                    onClick={() => setFormLogin(!formLogin)}
                    className={cn(
                        buttonVariants({variant: "secondary", className: "btn btn-outline"}),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    {formLogin ? 'Sign Up' : 'Log In'}
                </Button>
                <div
                    className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r"
                    style={{backgroundColor: "#22222F"}}

                >
                    <div className="m-auto">
                        <Image
                            src="/img/logo.png"
                            width={400}
                            height={400}
                            // className="m-auto"
                            alt="Logo"
                        />
                        <div className="">
                            <div className="space-y-2">
                                <p className="text-center italic">
                                    Simplify Your Success
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        {formLogin ? <UserLoginForm/> : <UserAuthForm/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

