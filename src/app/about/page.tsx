"use client";

import ContactElement from '@/components/ContactElement'
import Image from 'next/image';
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
    <>
      <div className="block w-full min-h-screen h-full absolute">
        <iframe
          title="Google Map"
          style={{ border: 0 }}
          src={`https://maps.google.com/maps?q=37.7749,-122.4194d&zoom=15&disableDefaultUI=true&maptype=roadmap&output=embed`}
          allowFullScreen
          className="w-full h-full fixed top-0 left-0"
        />
        <section className="bg-gray-50 top-0 start-0 fixed m-8 w-1/2 h-full p-8 rounded-md mt-24 shadow">
          <main className="space-y-4">
            <div className="prose">
              <h2>La nostra squadra</h2>
            </div>
            <div className="relative">
              <input type="text" placeholder="Rossi Mario" className="px-4 py-2 rounded-full w-full"
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
              {filteredPersons.length === 0 ? <p>No person found matching "{searchTerm}".</p> : <></>}
            </ul>
          </main >
        </section>
      </div>
    </>
  )
}

