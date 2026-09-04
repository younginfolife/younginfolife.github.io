"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import AppSocials from "@/components/app-socials";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  message: z.string(),
});

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="max-w-3xl mx-auto p-4 pb-32">
      <section className="not-prose mb-8">
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Iscrizioni - Modulo di Contatto</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="me@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Messaggio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Il tuo messaggio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-brand">
                Invia
              </Button>
            </form>
          </Form>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">O iscriviti via Google Form</h2>
          <p className="text-gray-700 mb-4">Puoi anche iscriverti compilando il nostro modulo Google</p>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScnU4WZapdWtZn5Bl6r6adntj8XL7MRhsWFyfsCKNon72xxmQ/viewform?usp=sf_link">
            <Button className="font-bold" variant="brand">
              Iscriviti su Google Form
            </Button>
          </Link>
        </Card>
      </section>

      <section className="max-w-prose mx-auto mt-8">
        <AppSocials />
      </section>
    </div>
  );
};

export default Page;
