"use client";

import ContactElement from '@/components/ContactElement'
import React, { useState } from 'react'
import { allPeople, Person } from "content-collections";



export default function AboutPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredPersons, setFilteredPersons] = useState<Person[]>(allPeople);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredPersons(allPeople.filter(person => person.name.toLowerCase().includes(term.toLowerCase())));
  };

  return (
    <div className="max-w-prose mx-auto flex flex-col gap-8 w-full px-4 md:p-0">
      <main className="space-y-4">
        <div className="prose">
          <h2>La nostra squadra</h2>
        </div>
        <div className="relative">
          <input type="text" placeholder="Nome Cognome" className="px-4 py-2 rounded-full w-full bg-white shadow"
            value={searchTerm} onChange={handleSearch} />
          {searchTerm.length > 0 ? <button className="absolute end-0 px-4 py-2
          bg-black text-white font-bold rounded-full" onClick={() => {
              setSearchTerm('')
              setFilteredPersons(allPeople)
            }}>Clear</button> :
            <></>}
        </div>
        <ul className="flex flex-col gap-2">
          {filteredPersons.map((person, index) => (
            <li key={index}><ContactElement {...person} /></li>
          ))}
          {filteredPersons.length === 0 ? <p>No person found matching {searchTerm}.</p> : <></>}
        </ul>
      </main >
    </div>
  )
}

