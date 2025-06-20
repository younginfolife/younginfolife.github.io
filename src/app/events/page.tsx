import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { allEventsSortedByDate } from "./sorted";
import Image from "next/image";

const page = () => {
  return (
    <div className="max-w-prose mx-auto w-full p-4 space-y-2 pb-32">
      <h1 className="text-3xl font-bold">Eventi</h1>
      <ul className="space-y-4">
        {allEventsSortedByDate.map((e, i) => {
          return (
            <li key={i}>
              <Link href={`/events/${e.id}`}>
                <Card className="rounded-md mx-auto flex flex-row items-center gap-6 p-6 shadow-md bg-white">
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
                      <div className="text-sm text-gray-500 truncate">
                        {e.dateEnd
                          ? `From ${e.dateStart} to ${e.dateEnd}`
                          : e.dateStart}
                    </div>
                    <h2 className="text-xl font-semibold">{e.name}</h2>
                    <p className="text-gray-700">{e.description}</p>
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default page;
