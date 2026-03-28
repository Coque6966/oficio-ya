"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Loader2 } from "lucide-react";

const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface LocationPickerProps {
    defaultLocation?: [number, number];
    onChange: (location: { lat: number; lng: number }) => void;
}

function LocationMarker({ position, setPosition }: any) {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });

    useEffect(() => {
        if (position) map.flyTo(position, map.getZoom());
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position} icon={customIcon} />
    );
}

export function LocationPickerMap({ defaultLocation, onChange }: LocationPickerProps) {
    const [isMounted, setIsMounted] = useState(false);
    const [position, setPosition] = useState<L.LatLng | null>(
        defaultLocation ? L.latLng(defaultLocation[0], defaultLocation[1]) : null
    );

    useEffect(() => {
        setIsMounted(true);
        if (!position && "geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const newPos = L.latLng(pos.coords.latitude, pos.coords.longitude);
                setPosition(newPos);
                onChange({ lat: newPos.lat, lng: newPos.lng });
            });
        }
    }, []);

    // Dispara el callback cuando el usuario hace clic libremente
    useEffect(() => {
        if (position) {
            onChange({ lat: position.lat, lng: position.lng });
        }
    }, [position]);

    if (!isMounted) return (
        <div className="h-[300px] w-full bg-slate-800 rounded-xl flex items-center justify-center border border-white/10">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
    );

    return (
        <div className="h-[300px] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg relative z-0">
            <MapContainer
                center={position || [19.4326, -99.1332]}
                zoom={14}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap'
                />
                <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
            {!position && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900 border border-blue-500/50 text-white px-4 py-2 rounded-full shadow-2xl z-[1000] font-bold text-sm pointer-events-none">
                    Haz click en el mapa para anclar tu ubicación
                </div>
            )}
        </div>
    );
}
