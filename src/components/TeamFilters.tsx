'use client';

import React, { useState } from "react";
import { allPeople } from "content-collections";

interface Person {
  name: string;
  email?: string;
  location: string;
  affiliation: string;
  level: string;
  occupation?: string;
}

export function TeamFilters() {
  // Filter state
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [occupationFilter, setOccupationFilter] = useState<string>("all");
  
  // Get unique occupations
  const uniqueOccupations = Array.from(new Set(allPeople.map((p) => p.occupation).filter((occ): occ is string => Boolean(occ))));
  
  // Filter members for the list
  const filteredMembers = allPeople
    .filter((person) => {
      const levelMatch = levelFilter === "all" || person.level === levelFilter;
      const occupationMatch = occupationFilter === "all" || person.occupation === occupationFilter;
      return levelMatch && occupationMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Level Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Level
          </label>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="young">Young</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {/* Occupation Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Filter by Role
          </label>
          <select
            value={occupationFilter}
            onChange={(e) => setOccupationFilter(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            {uniqueOccupations.map((occ) => (
              <option key={occ} value={occ}>
                {occ.charAt(0).toUpperCase() + occ.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Member Count */}
      <div className="mb-6 text-sm text-gray-600">
        Showing {filteredMembers.length} of {allPeople.length} members
      </div>

      {/* Members List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((person) => (
          <div key={person.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-gray-900">{person.name}</h3>
            <p className="text-sm text-gray-600">{person.location}</p>
            <p className="text-xs text-gray-500">{person.affiliation}</p>
            {person.occupation && (
              <p className="text-xs mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full inline-block">
                {person.occupation}
              </p>
            )}
            {person.level && (
              <p className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ml-2 ${
                person.level === "young" 
                  ? "bg-emerald-100 text-emerald-800" 
                  : "bg-purple-100 text-purple-800"
              }`}>
                {person.level}
              </p>
            )}
            {person.email && (
              <a href={`mailto:${person.email}`} className="text-xs text-blue-600 hover:underline mt-2 block">
                Email
              </a>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
