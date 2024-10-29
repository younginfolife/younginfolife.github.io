import ContactElement from "@/components/ContactElement";
import { Card } from "@/components/ui/card";
import { allPeople } from "content-collections";
import Image from "next/image";
import Link from "next/link";

interface Highlight {
  title: string;
  image: string;
}

export default function Home() {
  const highlights: Highlight[] = [
    { title: "Networking", image: "/assets/networking.png" },
    { title: "Formazione", image: "/assets/formazione.png" }
  ]
  return (
    <main className="max-w-prose mx-auto flex flex-col gap-8 w-full px-4 md:p-0">
      <article className="prose text-balance">
        <h1>Sei un giovane appassionato
          di <span className="text-brand">bioinformatica</span>?</h1>
        <p>
          Entra nel mondo di CINI Young-InfoLife, la piattaforma creata da
          giovani (bio)informatici per giovani (bio)informatici!
        </p>
        <p>
          Connettiti con studenti, dottorandi e ricercatori come te, condividi
          la tua passione e accresci le tue competenze grazie a eventi, corsi,
          seminari e molto altro.
        </p>
        <div className="not-prose flex w-full gap-2 ">
          {highlights.map((e, i) =>
            <Card key={i} className="w-full p-2 space-y-4 text-center flex flex-col items-center">
              <div className="relative w-24 h-24">
                <Image src={e.image} alt={e.title} layout="fill" />
              </div>
              <h2 className="font-bold text-xl">
                {e.title}
              </h2>
            </Card>
          )}
        </div>
      </article>
      <article className="prose text-balance">
        <h2>La nostra squadra</h2>
        <div className="relative not-prose mb-8">
          <ul className="flex flex-col gap-4">
            {allPeople.slice(0, 3).map((e, key) => {
              return <li key={key}>
                <ContactElement {...e} />
              </li>
            })}

          </ul>
          <div className="w-full from-background to-transparent bg-gradient-to-t bottom-0 h-16 absolute">
          </div>
          <Link href="/about" className="absolute px-4 py-2 bg-white shadow-lg rounded-full left-1/2 -translate-x-1/2 font-bold">
            Mostra Tutti
          </Link>
        </div>
      </article>
      <article className="prose text-balance">
        <h2>Seguici sui social</h2>
      </article>
    </main>
  );
}
