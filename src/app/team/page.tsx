"use client";

import ContactElement from "@/components/ContactElement";
import React, { useState } from "react";
import { allPeople, Person } from "content-collections";

export default function AboutPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const [filteredPersons, setFilteredPersons] = useState<Person[]>(allPeople);

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  // 	const term = event.target.value;
  // 	setSearchTerm(term);
  // 	setFilteredPersons(
  // 		allPeople.filter((person) =>
  // 			person.name.toLowerCase().includes(term.toLowerCase()),
  // 		),
  // 	);
  // };

  const direttivoPeopleSenior = allPeople
  .filter(
    (person) => person.occupation === "direttivo" && person.level === "senior",
  )
  .sort((a, b) => a.name.localeCompare(b.name));
	
  const direttivoPeopleYoung = allPeople.filter(
    (person) => person.occupation === "direttivo" && person.level === "young",
  );

  const comitatoPeople = allPeople.filter(
    (person) => person.occupation === "comitato",
  );

  const smmPeople = allPeople.filter((person) => person.occupation === "smm");

  const youngPeople = allPeople.filter((person) => person.level === "young");
  const seniorPeople = allPeople.filter((person) => person.level === "senior");

  return (
    <div className="max-w-prose mx-auto flex flex-col gap-8 w-full px-4 md:p-0">
      <main className="space-y-4">
        <div className="prose">
          <h2>Direttivo Infolife</h2>
        </div>
        <ul className="grid flex-col gap-4 ">
          {direttivoPeopleSenior.map((person, index) => (
            <li key={index}>
              <ContactElement {...person} />
            </li>
          ))}
        </ul>
        <div className="prose">
          <h2>Comitato Infolife</h2>
        </div>
        <ul className="grid flex-col gap-4 grid-cols-2">
          {comitatoPeople.map((person, index) => (
            <li key={index}>
              <ContactElement {...person} />
            </li>
          ))}
        </ul>
        <div className="prose">
          <h2>Direttivo Young</h2>
        </div>
        <ul className="grid flex-col gap-4 ">
          {direttivoPeopleYoung.map((person, index) => (
            <li key={index}>
              <ContactElement {...person} />
            </li>
          ))}
        </ul>
        <div className="prose">
          <h2>Gestori Web e Social</h2>
        </div>
        <ul className="grid flex-col gap-4 grid-cols-2">
          {smmPeople.map((person, index) => (
            <li key={index}>
              <ContactElement {...person} />
            </li>
          ))}
        </ul>
        <div className="prose pt-10">
          <h2>La nostra squadra Infolife</h2>
        </div>
        <ul className="grid flex-col gap-4 grid-cols-2 pb-15">
          {seniorPeople.map((person, index) => (
            <li key={index}>
              <ContactElement {...person} />
            </li>
          ))}
        </ul>
        <div className="prose pt-10">
          <h2>La nostra squadra Young</h2>
        </div>
        {/* <div className="relative">
					<input
						type="text"
						placeholder="Nome Cognome"
						className="px-4 py-2 rounded-full w-full bg-white shadow"
						value={searchTerm}
						onChange={handleSearch}
					/>
					{searchTerm.length > 0 ? (
						<button
							className="absolute end-0 px-4 py-2
          bg-black text-white font-bold rounded-full"
							onClick={() => {
								setSearchTerm("");
								setFilteredPersons(allPeople);
							}}
						>
							Clear
						</button>
					) : (
						<></>
					)}
				</div> */}
        <ul className="grid flex-col gap-4 grid-cols-2 pb-32">
          {youngPeople.map((person, index) => (
            <li key={index}>
              <ContactElement {...person} />
            </li>
          ))}
          {/* {filteredPersons.length === 0 ? (
						<p>No person found matching {searchTerm}.</p>
					) : (
						<></>
					)} */}
        </ul>
      </main>
    </div>
  );
}
