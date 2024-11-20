import { Card } from "@/components/ui/card"
import { allPublications } from "content-collections"
import React from 'react'

const page = () => {
  return (
    <div className="max-w-prose mx-auto w-full p-4 space-y-2">
      <h1 className="text-3xl font-bold">Publicazioni</h1>
      <ul className="space-y-4 max-w-full">
        {allPublications.map((e, i) => {
          return (
            <li key={i}>
              <Card className="prose !space-y-2 p-4 mx-auto">
                <p><b>{e.Year}</b> <span>{e.Publisher}</span> - <span>{e.Publication}{" "}{e.Volume}</span></p>
                <h3>{e.Title}</h3>
                <p>
                  <span>{e.Authors.split(";").join("")}</span>
                </p>
              </Card>
            </li>)
        })}
      </ul>

    </div >
  )
}

export default page;
