import ImageCarousel from "@/components/ImageCarousel";
import { Card } from "@/components/ui/card";
import { allEvents } from "content-collections";
import Link from "next/link";
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
  const event = allEvents.find((event) => event.id === params.eventID);
  if (!event) {
    notFound();
  }

  return (
    <div className="prose mx-auto pb-32">
      <h1>{event.name}</h1>
      <Card className="prose !space-y-2 p-4 rounded-md mx-auto">
        <span>
          {event.dateStart} {event.dateEnd}
        </span>
        <h2>{event.name}</h2>
        <p>
          {event.description}
          <br />
          {event.website !== undefined && (
            <Link href={event.website}>Website</Link>
          )}
        </p>
      </Card>
      <ImageCarousel images={event.carouselImages || []} />
      <div dangerouslySetInnerHTML={{ __html: event.html }} />
    </div>
  );
};

export default EventPage;
