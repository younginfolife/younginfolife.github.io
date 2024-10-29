import { allEvents } from "content-collections";
import Link from "next/link";

import React from 'react'

const page = () => {
  return (
    <div className="max-w-3xl mx-auto w-full p-4 space-y-2">
      <h1 className="text-3xl font-bold">Eventi</h1>
      <ul className="space-y-4">
        {allEvents.map((e, i) => {
          return (
            <li key={i} className="prose !space-y-2 bg-white shadow-lg p-4 rounded-md">
              <span>
                {/* TODO: date formatting */}
                {e.dateStart} {e.dateEnd}
              </span>
              <h2>{e.name}</h2>
              <p>
                {e.description}
              </p>
              {e.website ??
                <Link href={e.website!}>Website</Link>}
            </li>)
        })}
      </ul>
    </div>
  )
}

export default page;
