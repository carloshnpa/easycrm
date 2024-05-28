"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {useForm, SubmitHandler} from "react-hook-form"
import {useRef} from "react";
import {signup} from "@/app/login/components/actions";
import Link from "next/link";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type Inputs = {
    email: string
    password: string
    confirm_password: string
}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()

    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        await signup(data)
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Create an account
                </h1>
                <p className="text-sm text-muted-foreground">
                    Enter your email below to create your account
                </p>
            </div>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register("email", {
                                    required: "Inform your email address"
                                })}
                                className="mb-1"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            <Label className="sr-only" htmlFor="email">
                                Password
                            </Label>
                            <Input
                                {...register("password", {
                                    required: "You must specify a password",
                                    minLength: {
                                        value: 8,
                                        message: "Password must have at least 8 characters"
                                    }
                                })}
                                className="mb-1"
                                id="password"
                                name="password"
                                placeholder="password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            <Label className="sr-only" htmlFor="email">
                                Confirm Password
                            </Label>
                            <Input
                                {...register("confirm_password", {
                                    required: true,
                                    validate: value => value === password.current || 'Password must match'
                                })}
                                className="mb-1"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="confirm password"
                                type="password"
                                autoCapitalize="none"
                                autoComplete="password"
                                autoCorrect="off"
                                disabled={isLoading}
                            />
                            {errors.confirm_password &&
                                <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign Up with Email
                        </Button>
                    </div>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                    </div>
                </div>
                <Button variant="outline" type="button" disabled={isLoading}>
                    {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4" style={{color: "#FE0000"}}/>
                    )}{" "}
                    Google
                </Button>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                    href="/terms"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-primary"
                >
                    Privacy Policy
                </Link>
                .
            </p>
        </>
    )
}
