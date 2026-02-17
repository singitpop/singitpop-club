"use client";

import { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TOUR_ITINERARY } from '@/data/tourData';
import L from 'leaflet';

// Fix for Leaflet default marker icons in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function TourMap() {
    const routeCoordinates = useMemo(() => {
        return TOUR_ITINERARY.map(stop => stop.coordinates);
    }, []);

    const center = [56.4907, -4.2026] as [number, number]; // Centered roughly on Scotland

    return (
        <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-0">
            <MapContainer
                center={center}
                zoom={6}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {/* The Route Line */}
                <Polyline
                    positions={routeCoordinates}
                    pathOptions={{ color: '#3b82f6', weight: 4, opacity: 0.7, dashArray: '10, 10' }}
                />

                {/* Markers */}
                {TOUR_ITINERARY.map((stop, idx) => (
                    <Marker key={idx} position={stop.coordinates}>
                        <Popup>
                            <div className="text-black text-xs">
                                <strong>Day {stop.day}: {stop.location}</strong><br />
                                {stop.title}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
