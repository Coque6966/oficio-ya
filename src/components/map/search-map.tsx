"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ProviderCard } from "../provider-card";

// Fix for default marker icons in Leaflet with Next.js
const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface SearchMapProps {
    providers: any[];
}

export const SearchMap = ({ providers }: SearchMapProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="h-full w-full bg-slate-100 animate-pulse rounded-2xl" />;

    const center: [number, number] = [19.4326, -99.1332]; // CDMX center

    return (
        <div className="h-full w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200">
            <MapContainer
                center={center}
                zoom={12}
                scrollWheelZoom={false}
                className="h-[600px] w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {providers.map((provider) => (
                    <Marker
                        key={provider.id}
                        position={[provider.latitude || 19.4326, provider.longitude || -99.1332]}
                        icon={customIcon}
                    >
                        <Popup className="min-w-[300px]">
                            <div className="p-0">
                                <ProviderCard provider={provider} />
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
