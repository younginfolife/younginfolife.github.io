import AppSocials from "@/components/app-socials";
import ImageCarousel from "@/components/ImageCarousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Highlight {
  title: string;
  image: string;
}

const images = [
  "/events/2024BITS-Napoli/IMG_4787.jpg",
  "/events/2025BioHackathon/12d48d39-1f82-451c-8ce8-067177d64a6e.JPG",
  "/carousel/1.jpg",
  "/carousel/2.jpg",
  "/carousel/3.jpg",
  "/carousel/4.JPG",
  "/carousel/5.jpeg",
];

export default function Home() {
  const highlights: Highlight[] = [
    { title: "Networking", image: "/assets/networking.png" },
    { title: "Formazione", image: "/assets/formazione.png" },
  ];
  return (
    <main className="max-w-prose mx-auto flex flex-col gap-8 w-full px-4 md:p-0">
      <article className="prose text-balance pb-32">
        <h1>
          Sei un giovane appassionato di{" "}
          <span className="text-brand">bioinformatica</span>?
        </h1>
        <ImageCarousel images={images} />
        <p>
          Entra nel mondo di CINI Young-InfoLife, la piattaforma creata da
          giovani (bio)informatici per giovani (bio)informatici!
        </p>
        <p>
          Connettiti con studenti, dottorandi e ricercatori come te, condividi
          la tua passione e accresci le tue competenze grazie a eventi, corsi,
          seminari e molto altro.
        </p>
        <div className="not-prose flex w-full gap-2">
          {highlights.map((e, i) => (
            <Card
              key={i}
              className="w-full p-2 space-y-4 text-center flex flex-col items-center"
            >
              <div className="relative w-24 h-24">
                <Image src={e.image} alt={e.title} layout="fill" />
              </div>
              <h2 className="font-bold text-xl">{e.title}</h2>
            </Card>
          ))}
        </div>
        <AppSocials />
      </article>
    </main>
  );
}
