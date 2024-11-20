import Link from "next/link";
import React from 'react'
import { allEventsSortedByDate } from "./sorted";
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="max-w-prose mx-auto w-full p-4 space-y-2">
      <h1 className="text-3xl font-bold">Eventi</h1>
      <ul className="space-y-4">
        {allEventsSortedByDate.map((e, i) => {
          return (
            <li key={i}>
              <Link href={`/events/${e.id}`}>
                <Card className="prose !space-y-2 p-4 rounded-md mx-auto">
                  <span>
                    {e.dateStart} {e.dateEnd}
                  </span>
                  <h2>{e.name}</h2>
                  <p>
                    {e.description}
                    <br />
                    <Link href={e.website!}>Website</Link>
                  </p>
                </Card>
              </Link>
            </li>)
        })}
      </ul>
    </div>
  )
}

export default page;
