import React from "react";
import { MapPin, Building2 } from "lucide-react";

interface ContactElementProps {
  name: string;
  location: string;
  affiliation?: string;
  occupation?: string;
  level?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
  "from-cyan-500 to-sky-600",
];

function avatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export default function ContactElement({
  name,
  location,
  affiliation,
  occupation,
}: ContactElementProps) {
  const gradient = avatarGradient(name);

  return (
    <div className="group flex flex-row items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold shadow-inner`}
      >
        {getInitials(name)}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-gray-900 leading-tight truncate">{name}</p>

        <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-500">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {affiliation && (
          <div className="flex items-center gap-1 mt-0.5 text-xs text-gray-400">
            <Building2 className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{affiliation}</span>
          </div>
        )}

        {occupation && (
          <span className="inline-block mt-1.5 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 border border-blue-100">
            {occupation}
          </span>
        )}
      </div>
    </div>
  );
}
