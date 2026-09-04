import ImageCarousel from "@/components/ImageCarousel";
import Image from "next/image";
import { allEvents } from "content-collections";
import { notFound } from "next/navigation";
import React from "react";
import EventPageContent from "@/app/[locale]/events/EventPageContent";
import {setRequestLocale} from 'next-intl/server';

export async function generateStaticParams({params: {locale}}: {params: {locale: string}}) {
  return allEvents.map((e) => ({
    locale,
    eventID: e.id,
  }));
}

interface EventPageParams {
  eventID: string;
  locale: string;
}

const EventPage = ({ params }: { params: EventPageParams }) => {
  setRequestLocale(params.locale);
  const e = allEvents.find((event) => event.id === params.eventID);
  if (!e) {
    notFound();
  }

  // Check if there's an English version available
  const eEN = allEvents.find((event) => event.id === `${params.eventID}-en`);

  return <EventPageContent event={e} eventENVersion={eEN} />;
};

export default EventPage;
