import ImageCarousel from "@/components/ImageCarousel";
import Image from "next/image";
import { allEvents } from "content-collections";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  return allEvents.map((e) => ({
    eventID: e.id,
  }));
}

interface EventPageParams {
  eventID: string;
}

const EventPage = ({ params }: { params: EventPageParams }) => {
  const e = allEvents.find((event) => event.id === params.eventID);
  if (!e) {
    notFound();
  }

  return (
    <div className="prose mx-auto pb-32">
      <h1>{e.name}</h1>
      <div className="not-prose">
        <div className="mx-auto flex flex-row items-center gap-6">
          <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 bg-gray-50 rounded relative">
            {e.logo && (
              <Image
                src={e.logo}
                fill
                alt={e.name}
                className="object-contain rounded"
              />
            )}
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <div className="text-sm text-gray-500 truncate">
              {e.dateStart} {e.dateEnd}
            </div>
            <p className="text-gray-700">{e.description}</p>
            {e.link && (
              <a
                href={e.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm mt-1"
              >
              Visit event website
              </a>
            )}
          </div>
        </div>
      </div>
      <ImageCarousel images={e.carouselImages || []} />
      <div dangerouslySetInnerHTML={{ __html: e.html }} />
      <p className="text-gray-700">{e.long_description}</p>
    </div>
  );
};

export default EventPage;
