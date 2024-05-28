import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link"
import {CardTitle, CardDescription, CardHeader, CardContent, Card} from "@/components/ui/card"
import {CheckIcon} from "lucide-react";

export default function Home() {

  return (
      <div className="flex flex-col min-h-[100dvh]">
        <header className="bg-persian-blue-950 px-4 lg:px-6 h-14 py-8 flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <img
                alt=""
                className="h-10"
                src="/img/logo-horizontal.png"
            />
            <span className="sr-only">Acme SaaS</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
            <Link
                className="text-white text-sm font-medium hover:underline underline-offset-4"
                href="#features">
              Features
            </Link>
            <Link
                className="text-white text-sm font-medium hover:underline underline-offset-4"
                href="#pricing">
              Pricing
            </Link>
            <Link
                className="text-white text-sm font-medium hover:underline underline-offset-4"
                href="#about">
              About
            </Link>
            <Link
                className="text-white text-sm font-medium hover:underline underline-offset-4"
                href="#contact">
              Contact
            </Link>
            <Button className="h-7" variant="outline">
              <Link className="text-persian-blue-950" href="/login">
                Login
              </Link>
            </Button>
          </nav>
        </header>
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="text-persian-blue-950 lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Unlock the Power of SaaS with Acme
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                  Streamline your business operations with our cutting-edge SaaS platform. Boost
                  productivity, enhance
                  collaboration, and drive growth.
                </p>
                <div className="mt-6 space-x-4">
                  <Link
                      className="inline-flex h-9 items-center justify-center rounded-md bg-persian-blue-950  px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      href="/auth/login"
                  >
                    Get Started
                  </Link>
                  <Link
                      className="text-persian-blue-950 inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                      href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">

                <h2 className="text-persian-blue-950 text-3xl font-bold tracking-tighter sm:text-5xl">Streamline
                  Your Business
                  Operations</h2>
                <div
                    className="text-persian-blue-950 inline-block ml-auto mr-[10px] rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">New
                  Features
                </div>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our SaaS platform is designed to help you optimize your workflows, boost productivity,
                  and drive growth.
                  Leverage our cutting-edge features to take your business to new heights.
                </p>
              </div>
            </div>
            <Image
                alt="Hero"
                className="mx-auto aspect-[3/1] overflow-hidden rounded-t-xl object-cover"
                height="300"
                src="/img/placeholder_img.svg"
                width="1270"
            />
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Elevate Your Business with Our SaaS Platform
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our SaaS platform is designed to help you streamline your operations, boost
                  productivity, and drive
                  growth. Discover the key features that set us apart.
                </p>
              </div>
            </div>
            <div
                className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Automated Workflows</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Streamline your business processes with our intuitive workflow automation tools.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Collaborative Workspace</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Empower your team to work together seamlessly with our integrated collaboration
                  features.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Advanced Analytics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Gain valuable insights into your business performance with our powerful analytics tools.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Scalable Infrastructure</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Easily scale your business as it grows with our highly scalable and reliable
                  infrastructure.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Secure Data Management</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Protect your sensitive data with our robust security features and compliance standards.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Seamless Integrations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Extend the functionality of our SaaS platform by seamlessly integrating with your
                  existing tools and
                  systems.
                </p>
              </div>
            </div>
            <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
              <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
              >
                Contact Sales
              </Link>
              <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <div
                  className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Flexible Pricing to Fit Your Needs
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Choose the plan that works best for your business and scale as you grow.
              </p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>Perfect for small businesses and startups.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">per month</span>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        5 users
                      </li>
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        50GB storage
                      </li>
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        Basic features
                      </li>
                    </ul>
                    <Button className="w-full">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>Ideal for growing businesses and teams.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">per month</span>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        10 users
                      </li>
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        100GB storage
                      </li>
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        Advanced features
                      </li>
                    </ul>
                    <Button className="w-full">Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>Tailored for large organizations and custom needs.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center space-y-4">
                    <span className="text-4xl font-bold">Custom</span>
                    <span
                        className="text-sm text-gray-500 dark:text-gray-400">Contact us for pricing</span>
                    <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        Unlimited users
                      </li>
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        Unlimited storage
                      </li>
                      <li>
                        <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500"/>
                        Enterprise-grade features
                      </li>
                    </ul>
                    <Button className="w-full">Contact Sales</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme SaaS. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
      </div>
  );
}
