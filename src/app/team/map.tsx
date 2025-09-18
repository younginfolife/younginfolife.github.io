"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Person } from "content-collections";

// Fix default marker icons (Leaflet quirk)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type MapProps = {
  people: (Person & { lat?: number; lng?: number })[];
};

export default function Map({ people }: MapProps) {
  const center = [41.8719, 12.5674]; // Center of Italy

  return (
    <div className="h-[500px] w-full z-0">
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full rounded-xl shadow"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {people
          .filter((p) => p.lat && p.lng)
          .map((person, index) => (
            <Marker key={index} position={[person.lat!, person.lng!]}>
              <Popup>
                <strong>{person.name}</strong>
                <br />
                {person.location}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}
