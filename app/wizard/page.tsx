import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";
import {CurrencyComboBox} from "@/components/CurrencyComboBox";

const page = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container flex flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Welcome, <span className=" font-bold ml-2">{user?.firstName}!👋</span>
        </h1>
        <h2 className="mt-4 text-center text-muted-foreground text-md">
          Let&rsquo;s get started by setting up your currency
        </h2>
        <h3 className="mt-4 text-center text-muted-foreground text-sm">
          You can change these settings at any time
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Set your default currency for transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox/>
        </CardContent>
      </Card>
      <Separator />

      <Button className="w-full" asChild >
        <Link href={"/"}>I&rsquo;m done! Take me to the dashboard</Link>
      </Button>
    </div>
  );
};

export default page;
