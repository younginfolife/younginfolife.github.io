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
import { Card } from "@/components/ui/card";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
  message: z.string(),
});

interface ApplyPageProps {
  params: {
    locale: string;
  };
}

export default function ApplyPage({ params: { locale } }: ApplyPageProps) {
  const isItalian = locale === "it";

  const labels = {
    title: isItalian ? "Iscrizioni - Modulo di Contatto" : "Sign Up - Contact Form",
    email: isItalian ? "Email" : "Email",
    message: isItalian ? "Messaggio" : "Message",
    send: isItalian ? "Invia" : "Send",
    orGoogleForm: isItalian ? "O iscriviti via Google Form" : "Or sign up via Google Form",
    googleFormDesc: isItalian ? "Puoi anche iscriverti compilando il nostro modulo Google" : "You can also sign up by filling out our Google Form",
    googleFormButton: isItalian ? "Iscriviti su Google Form" : "Sign Up via Google Form",
    emailPlaceholder: "me@email.com",
    messagePlaceholder: isItalian ? "Il tuo messaggio" : "Your message",
  };

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
          <h2 className="text-2xl font-bold mb-4">{labels.title}</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{labels.email}</FormLabel>
                    <FormControl>
                      <Input placeholder={labels.emailPlaceholder} {...field} />
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
                    <FormLabel>{labels.message}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={labels.messagePlaceholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-brand">
                {labels.send}
              </Button>
            </form>
          </Form>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">{labels.orGoogleForm}</h2>
          <p className="text-gray-700 mb-4">{labels.googleFormDesc}</p>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScnU4WZapdWtZn5Bl6r6adntj8XL7MRhsWFyfsCKNon72xxmQ/viewform?usp=sf_link">
            <Button className="font-bold" variant="brand">
              {labels.googleFormButton}
            </Button>
          </Link>
        </Card>
      </section>
    </div>
  );
}
