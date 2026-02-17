"use client";

import { useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TOUR_ITINERARY } from '@/data/tourData';
import L from 'leaflet';
import 'leaflet-polylinedecorator';

// Fix for Leaflet default marker icons
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

// Hardcoded Waypoints for the missing start leg
const HOME_COORDS: [number, number] = [54.9667, -1.5039]; // Jarrow/South Shields (approx NE31 2PL)
const KELSO_COORDS: [number, number] = [55.6044, -2.4430]; // Floors Castle

function ArrowDecorator({ positions }: { positions: [number, number][] }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const decorator = L.polylineDecorator(positions, {
            patterns: [
                {
                    offset: '10%',
                    repeat: '10%',
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 10,
                        polygon: false,
                        pathOptions: { stroke: true, color: '#60a5fa', weight: 2, opacity: 0.8 }
                    })
                }
            ]
        }).addTo(map);

        return () => {
            decorator.remove();
        };
    }, [map, positions]);

    return null;
}

export default function TourMap() {
    // Construct the full route specifically including the start
    const routeCoordinates = useMemo(() => {
        // Start at Home -> Kelso -> Day 1 (Edinburgh) -> Rest of Tour
        const additionalPoints = [HOME_COORDS, KELSO_COORDS];

        // Existing tour stops
        const tourPoints = TOUR_ITINERARY.map(stop => stop.coordinates);

        return [...additionalPoints, ...tourPoints] as [number, number][];
    }, []);

    const center = [56.4907, -4.2026] as [number, number];

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

                {/* Visual Line */}
                <Polyline
                    positions={routeCoordinates}
                    pathOptions={{ color: '#3b82f6', weight: 3, opacity: 0.6, dashArray: '5, 10' }}
                />

                {/* Arrows */}
                <ArrowDecorator positions={routeCoordinates} />

                {/* Special Marker for Start */}
                <Marker position={HOME_COORDS}>
                    <Popup>
                        <div className="text-black text-xs">
                            <strong>Start Point</strong><br />
                            Home (NE31 2PL)
                        </div>
                    </Popup>
                </Marker>

                {/* Special Marker for Kelso */}
                <Marker position={KELSO_COORDS}>
                    <Popup>
                        <div className="text-black text-xs">
                            <strong>Day 1 Stop</strong><br />
                            Floors Castle (Kelso)
                        </div>
                    </Popup>
                </Marker>

                {/* Day Markers */}
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
