"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./ui/spinner";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function GetStartedForm() {
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Store email in localStorage - this is safe as it's in an event handler
    if (typeof window !== 'undefined') {
        localStorage.setItem("userEmail", values.email);
    }
    
    router.push("/dashboard");
    setLoading(false);
  }

  if (!isFormVisible) {
    return (
        <div className="flex justify-center">
             <Button size="lg" className="w-full sm:w-auto" onClick={() => setFormVisible(true)}>
                Get Started
             </Button>
        </div>
    );
  }

  return (
      <div className="max-w-md mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-start space-x-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Enter your email to get started" {...field} className="h-11 text-base"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="lg" className="h-11" disabled={loading}>
              {loading && <Spinner className="mr-2" />}
              Submit
            </Button>
          </form>
        </Form>
        <p className="mt-4 text-sm text-muted-foreground">
            or{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
             Continue as Guest
            </Link>
        </p>
    </div>
  );
}
