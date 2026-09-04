import AppSocials from "@/components/app-socials";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="max-w-3xl mx-auto p-2 prose">
      <section className="not-prose">
        <Card className="p-4 prose mx-auto mb-6">
          <h2 className="text-2xl font-bold">Iscrizioni</h2>
          <p className="text-gray-700">Unisciti a Young InfoLife compilando il form sottostante</p>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScnU4WZapdWtZn5Bl6r6adntj8XL7MRhsWFyfsCKNon72xxmQ/viewform?usp=sf_link">
            <Button className="font-bold" variant="brand">
              Iscriviti
            </Button>
          </Link>
        </Card>

        <Card className="p-4 prose mx-auto">
          <h2 className="text-2xl font-bold">Contatti</h2>
          <p className="text-gray-700">Per qualsiasi domanda o informazione, contattaci:</p>
          <a
            href="mailto:contact@ciniyounginfo.life"
            className="text-blue-600 hover:underline font-semibold"
          >
            contact@ciniyounginfo.life
          </a>
        </Card>
      </section>
      <section className="max-w-prose mx-auto mt-8">
        <AppSocials />
      </section>
    </div>
  );
};

export default page;
