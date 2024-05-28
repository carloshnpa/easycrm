"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {SubmitHandler, useForm} from "react-hook-form";
import {login} from "@/app/login/components/actions";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

type Inputs = {
    email: string
    password: string
}

export function UserLoginForm({className, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsLoading(true)
        await login(data)
        setIsLoading(false)
    }

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Enter your account
                </h1>
            </div>
            <div className={cn("grid gap-6", className)} {...props}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                {...register("email")}
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
                                {...register("password")}
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
                        </div>
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                            )}
                            Sign In with Email
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
        </>
    )
}
