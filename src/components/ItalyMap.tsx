"use client";

import React, { useState } from "react";
import { allPeople } from "content-collections";


const cityCoordinates: { [key: string]: { x: number; y: number } } = {
     "Genova": { x: 155, y: 198 },
  "Brescia": { x: 230, y: 110 },
  "Prato": { x: 235, y: 240 },
  "Taranto": { x: 545, y: 475 },
  "Reggio Emilia": { x: 228, y: 178 },
  "Reggio Calabria": { x: 458, y: 615 },
  "Ravenna": { x: 300, y: 195 },
  "Livorno": { x: 204, y: 263 },
  "Rimini": { x: 325, y: 228 },
  "Latina": { x: 322, y: 410 },
  "Giugliano in Campania": { x: 389, y: 450 },
  "Monza": { x: 202, y: 103 },
  "Bergamo": { x: 217, y: 99 },
  "Sassari": { x: 105, y: 445 },
  "Pescara": { x: 397, y: 344 },
  "Forlì": { x: 290, y: 215 },
  "Siracusa": { x: 430, y: 700 },
  "Vicenza": { x: 267, y: 114 },
  "Bolzano": { x: 235, y: 42 },
  "Terni": { x: 315, y: 335 },
  "Piacenza": { x: 205, y: 155 },
  "Andria": { x: 505, y: 420 },
  "Arezzo": { x: 275, y: 272 },
  "Cesena": { x: 305, y: 220 },
  "Pesaro": { x: 335, y: 240 },
  "Roma": { x: 305, y: 375 },
  "Torino": { x: 82, y: 155 },
  "Milano": { x: 195, y: 110 },
  "Padova": { x: 275, y: 125 },
  "Bologna": { x: 260, y: 185 },
  "Pisa": { x: 198, y: 248 },
  "Udine": { x: 325, y: 78 },
  "Catania": { x: 420, y: 675 },
  "Palermo": { x: 335, y: 635 },
  "Verona": { x: 255, y: 120 },
  "Firenze": { x: 245, y: 245 },
  "Napoli": { x: 396, y: 459 },
  "Bari": { x: 545, y: 435 },
  "Trento": { x: 250, y: 70 },
  "Trieste": { x: 360, y: 99 },
  "Venezia": { x: 298, y: 124 },
  "Parma": { x: 225, y: 175 },
  "Pavia": { x: 190, y: 135 },
  "Perugia": { x: 308, y: 297 },
  "Siena": { x: 240, y: 285 },
  "Ancona": { x: 356, y: 265 },
  "L'Aquila": { x: 350, y: 360 },
  "Messina": { x: 442, y: 615 },
  "Cagliari": { x: 136, y: 553 },
  "Camerino": { x: 335, y: 295 },
  "Salerno": { x: 427, y: 469 },
  "Catanzaro": { x: 505, y: 585 },
  "Cosenza": { x: 485, y: 540 },
  "Ferrara": { x: 265, y: 165 },
  "Foggia": { x: 460, y: 410 },
  "Cassino": { x: 365, y: 418 },
  "Urbino": { x: 330, y: 252 },
  "Benevento": { x: 430, y: 435 },
  "Viterbo": { x: 285, y: 345 },
  "Varese": { x: 185, y: 95 },
  "Novara": { x: 113, y: 126 },
  "Caserta": { x: 400, y: 435 },
  "Modena": { x: 245, y: 180 },
  "Chieti-Pescara": { x: 397, y: 360 },
};

function normalizeLocationToCity(location: string, email?: string): string {
    const loc = location.toLowerCase();

    // Fast-path: if the location is already a known city name, return it directly
    const knownCity = Object.keys(cityCoordinates).find(
        (city) => city.toLowerCase() === loc
    );
    if (knownCity) return knownCity;

    if (loc === "cnr") {
        if (email) {
            if (email.includes("unito.it")) return "Torino";
            if (email.includes("cibio") || email.includes("unitn.it")) return "Trento";
            if (email.includes("icar.cnr.it")) return "Napoli";
            if (email.includes("iac.cnr.it")) return "Roma";
            if (email.includes("unimi.it") || email.includes("humanitas") || email.includes("istitutotumori")) return "Milano";
        }
        return "Roma";
    }

    if (loc.includes("sapienza") || loc.includes("roma tor vergata") || loc.includes("campus bio-medico") || loc.includes("roma la sapienza")) return "Roma";
    if (loc.includes("politecnico di torino") || loc.includes("università di torino") || loc.includes("università degli studi di torino") || loc.includes("torino") || loc === "bits") return "Torino";
    if (loc.includes("politecnico di milano") || loc.includes("bicocca") || loc.includes("università di milano") || loc.includes("humanitas") || loc.includes("san raffaele") || loc.includes("tumori di milano") || loc.includes("milano")) return "Milano";
    if (loc.includes("padova")) return "Padova";
    if (loc.includes("bologna")) return "Bologna";
    if (loc.includes("pisa")) return "Pisa";
    if (loc.includes("udine")) return "Udine";
    if (loc.includes("catania")) return "Catania";
    if (loc.includes("palermo")) return "Palermo";
    if (loc.includes("verona")) return "Verona";
    if (loc.includes("firenze")) return "Firenze";
    if (loc.includes("federico ii") || loc.includes("parthenope") || loc.includes("napoli")) return "Napoli";
    if (loc.includes("bari")) return "Bari";
    if (loc.includes("trento")) return "Trento";
    if (loc.includes("trieste")) return "Trieste";
    if (loc.includes("venezia") || loc.includes("ca' foscari")) return "Venezia";
    if (loc.includes("parma")) return "Parma";
    if (loc.includes("pavia")) return "Pavia";
    if (loc.includes("perugia")) return "Perugia";
    if (loc.includes("siena")) return "Siena";
    if (loc.includes("marche") || loc.includes("ancona")) return "Ancona";
    if (loc.includes("l'aquila")) return "L'Aquila";
    if (loc.includes("messina")) return "Messina";
    if (loc.includes("cagliari")) return "Cagliari";
    if (loc.includes("camerino")) return "Camerino";
    if (loc.includes("salerno")) return "Salerno";
    if (loc.includes("catanzaro")) return "Catanzaro";
    if (loc.includes("calabria") || loc.includes("cosenza") || loc.includes("rende")) return "Cosenza";
    if (loc.includes("ferrara")) return "Ferrara";
    if (loc.includes("foggia")) return "Foggia";
    if (loc.includes("cassino")) return "Cassino";
    if (loc.includes("urbino")) return "Urbino";
    if (loc.includes("sannio") || loc.includes("benevento")) return "Benevento";
    if (loc.includes("tuscia") || loc.includes("viterbo")) return "Viterbo";
    if (loc.includes("insubria") || loc.includes("varese") || loc.includes("como")) return "Varese";
    if (loc.includes("piemonte orientale") || loc.includes("upo")) return "Novara";
    if (loc.includes("vanvitelli") || loc.includes("caserta")) return "Caserta";
    if (loc.includes("modena") || loc.includes("reggio emilia")) return "Modena";
    if (loc.includes("chieti") || loc.includes("pescara")) return "Chieti-Pescara";

    if (loc.includes("roma")) return "Roma";
    if (loc.includes("milano")) return "Milano";
    if (loc.includes("torino")) return "Torino";

    return "Altri";
}

interface GroupedCity {
    name: string;
    people: typeof allPeople;
    coords: { x: number; y: number } | null;
}

// Pre-compute city groups at module level (runs once, no async needed)
function buildCityGroups(): GroupedCity[] {
    const groups: { [key: string]: typeof allPeople } = {};
    allPeople.forEach((person: any) => {
        const city = normalizeLocationToCity(person.location, person.email);
        if (city === "Altri") return;
        if (!groups[city]) groups[city] = [];
        groups[city].push(person);
    });
    return Object.keys(groups)
        .map((city) => ({
            name: city,
            people: groups[city].sort((a: any, b: any) => a.name.localeCompare(b.name)),
            coords: cityCoordinates[city] || null,
        }))
        .filter((c) => c.coords !== null);
}

const precomputedCities = buildCityGroups();

export default function ItalyMap() {
    const groupedCities = precomputedCities;
    const [selectedCity, setSelectedCity] = useState<GroupedCity | null>(null);
    const [hoveredCity, setHoveredCity] = useState<GroupedCity | null>(null);

    const activeCity = hoveredCity || selectedCity;

    return (
        <div className="bg-card text-card-foreground border rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-8 items-center w-full max-w-5xl mx-auto my-8">
            {/* Map Column */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-4 text-center">I nostri membri per città</h3>
                <div className="relative w-full max-w-[400px] aspect-[610/793] select-none">
                    {/* SVG Map as image - instant, no loading phase */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/italy.svg"
                        alt="Mappa d'Italia"
                        className="w-full h-full object-contain opacity-60 dark:opacity-30 pointer-events-none"
                    />

                    {/* Overlay Dots */}
                    {groupedCities.map((city) => {
                        if (!city.coords) return null;
                        const size = Math.max(12, Math.min(28, 8 + city.people.length));
                        const left = `${(city.coords.x / 610) * 100}%`;
                        const top = `${(city.coords.y / 793) * 100}%`;

                        const isHovered = hoveredCity?.name === city.name;
                        const isSelected = selectedCity?.name === city.name;

                        return (
                            <button
                                key={city.name}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2 focus:outline-none group z-10 animate-fade-in"
                                style={{ left, top }}
                                onMouseEnter={() => setHoveredCity(city)}
                                onMouseLeave={() => setHoveredCity(null)}
                                onClick={() => setSelectedCity(isSelected ? null : city)}
                                aria-label={`City: ${city.name}, members: ${city.people.length}`}
                            >
                                {/* Ping animation wrapper */}
                                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 animate-ping duration-1000 -inset-1" />

                                {/* Dot */}
                                <div
                                    className={`rounded-full shadow-md border-2 border-white transition-all duration-300 relative flex items-center justify-center ${isHovered || isSelected
                                        ? "bg-blue-600 scale-125 border-blue-200"
                                        : "bg-blue-500 scale-100"
                                        }`}
                                    style={{ width: size, height: size }}
                                >
                                    {/* Outer glow on hover */}
                                    <span className="absolute -inset-2 rounded-full border border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Info Column */}
            <div className="w-full md:w-1/2 flex flex-col h-full self-start justify-center min-h-[300px]">
                {activeCity ? (
                    <div className="flex flex-col h-full justify-between transition-all duration-300">
                        <div>
                            <div className="flex items-center gap-3 border-b pb-3 mb-4">
                                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-semibold rounded-full animate-pulse">
                                    {activeCity.people.length} {activeCity.people.length === 1 ? "Membro" : "Membri"}
                                </span>
                                <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{activeCity.name}</h4>
                            </div>

                            <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                                {activeCity.people.map((person, idx) => (
                                    <div
                                        key={idx}
                                        className="p-3 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-xl transition-all border border-zinc-200/50 dark:border-zinc-800 flex flex-col gap-1 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-zinc-700 dark:text-zinc-200">{person.name}</span>
                                            {person.level && (
                                                <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${person.level === "senior"
                                                    ? "bg-purple-100 dark:bg-purple-950/30 text-purple-800 dark:text-purple-300"
                                                    : "bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300"
                                                    }`}>
                                                    {person.level}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">{person.location}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <p className="text-xs text-zinc-400 mt-4 italic">
                            Clicca su un punto per bloccare la visualizzazione per quella città.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-center text-zinc-500 dark:text-zinc-400 min-h-[300px]">
                        <svg
                            className="w-12 h-12 text-zinc-400 mb-4 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <h4 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-1">Esplora la Mappa</h4>
                        <p className="text-sm text-zinc-400 max-w-[280px]">
                            Passa il mouse o clicca sui punti nella mappa per scoprire quanti e quali membri di InfoLife lavorano in ogni città.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
