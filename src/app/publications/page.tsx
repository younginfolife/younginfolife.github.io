import { allPublications } from "content-collections"
import React from 'react'

const page = () => {
  return (
    <div className="max-w-3xl mx-auto w-full p-4 space-y-2">
      <h1 className="text-3xl font-bold">Publicazioni</h1>
      <ul className="space-y-4">
        {allPublications.map((e, i) => {
          return (
            <li key={i} className="prose !space-y-2 bg-white shadow-lg p-4 rounded-md">
              <span>{e.Authors.split(";").join("")}</span>
              <h3>{e.Title}</h3>
              <i>{e.Year}</i>
              <br />
              <p>
                <span>{e.Publisher}</span><br />
                <span>{e.Publication}{" "}{e.Volume}</span>
              </p>
            </li>)
        })}
      </ul>

    </div>
  )
}

export default page;
