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

        const decorator = (L as any).polylineDecorator(positions, {
            patterns: [
                {
                    offset: '10%',
                    repeat: '10%',
                    symbol: (L as any).Symbol.arrowHead({
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
                        <Popup className="custom-popup">
                            <div className="text-slate-900 min-w-[200px]">
                                <div className="border-b border-slate-200 pb-2 mb-2">
                                    <strong className="text-sm block text-slate-800">Day {stop.day}: {stop.location}</strong>
                                    <span className="text-xs text-slate-500">{stop.title}</span>
                                </div>

                                <div className="space-y-2 text-xs">
                                    {stop.accommodation && (
                                        <div className="flex items-start gap-1.5">
                                            <span className="text-blue-500 font-bold">🏨</span>
                                            <span className="text-slate-600">{stop.accommodation.name}</span>
                                        </div>
                                    )}
                                    {stop.driveTime && (
                                        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded">
                                            <span className="text-slate-400">🚗</span>
                                            <span className="font-mono text-slate-700">{stop.driveTime}</span>
                                        </div>
                                    )}
                                    {stop.distance && (
                                        <div className="text-slate-400 pl-5">
                                            ({stop.distance})
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Attraction Markers (Purple) */}
                {TOUR_ITINERARY.flatMap(stop => stop.attractions).map((attr, idx) => {
                    if (!attr.coordinates) return null;

                    // Create a custom icon for attractions
                    // (Using a hue-rotate filter on the default marker for now, or we could import a different colored one)
                    // For simplicity in this environment, we'll use the default marker but maybe distinguish in popup
                    // A better approach in production would be a separate L.Icon instance with a purple marker image.

                    const AttractionIcon = L.icon({
                        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
                        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    });

                    return (
                        <Marker key={`attr-${idx}`} position={attr.coordinates} icon={AttractionIcon}>
                            <Popup className="custom-popup">
                                <div className="text-slate-900 min-w-[200px]">
                                    <div className="border-b border-purple-200 pb-2 mb-2">
                                        <strong className="text-sm block text-purple-900">{attr.name}</strong>
                                        <span className="text-[10px] text-purple-600 uppercase font-bold tracking-wider">{attr.type}</span>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        {attr.price && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-400">💷</span>
                                                <span className="text-slate-700">{attr.price}</span>
                                            </div>
                                        )}
                                        {attr.logistics?.timeAtSite && (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-400">⏳</span>
                                                <span className="text-slate-700">{attr.logistics.timeAtSite}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
