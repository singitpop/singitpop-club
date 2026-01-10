
import React, { useState } from 'react';
import { Artist, TourStop, LocalIntel, Release, TourContact, TourRouteSuggestion, GeoAdOpportunity } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MapIcon } from './icons/MapIcon';
import { LightIcon } from './icons/LightIcon';
import { generateTourPitchEmail } from '../services/geminiService';
import { BuildingStoreIcon } from './icons/BuildingStoreIcon';
import { CalculatorIcon } from './icons/CalculatorIcon';

interface TourPlannerProps {
    artist: Artist;
    releases: Release[];
    stops: TourStop[];
    setStops: (updater: (stops: TourStop[]) => TourStop[]) => void;
    
    // New props for AI features
    onSuggestRoutes: (region: string, duration: string) => void;
    tourRouteSuggestion: TourRouteSuggestion | null;

    onFindLocalPromoters: (stop: TourStop) => void;
    localIntel: Record<number, LocalIntel>;
    
    onFindGeoAd: (city: string) => void;
    geoAdOpportunity: GeoAdOpportunity | null;

    clearPlannerData: () => void;
    
    // New prop for stage design view navigation if needed here, 
    // typically passed via spread in MainApp.
    setView?: (view: any) => void;
}

const LoadingSpinner = ({ text }: { text: string }) => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin h-8 w-8 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <p className="text-medium-text mt-2">{text}</p>
    </div>
);

export const TourSupport = (props: TourPlannerProps) => {
    const { artist, releases, stops, setStops, onSuggestRoutes, tourRouteSuggestion, onFindLocalPromoters, localIntel, onFindGeoAd, geoAdOpportunity, clearPlannerData } = props;

    const [region, setRegion] = useState('US West Coast');
    const [duration, setDuration] = useState('2 Weeks');
    const [selectedStop, setSelectedStop] = useState<TourStop | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [isPromoterLoading, setIsPromoterLoading] = useState(false);
    const [draftingContactId, setDraftingContactId] = useState<number | null>(null);

    const handleGenerateRoutes = () => {
        setIsLoading(true);
        onSuggestRoutes(region, duration);
        // In a real app, we'd wait for a callback. Here we'll just set a timeout.
        setTimeout(() => setIsLoading(false), 2500);
    };
    
    const handleSelectStop = (stop: TourStop) => {
        setSelectedStop(stop);
        setIsPromoterLoading(true);
        onFindLocalPromoters(stop);
        onFindGeoAd(stop.city);
         setTimeout(() => setIsPromoterLoading(false), 3000);
    };
    
    const handleDraftPitch = async (stop: TourStop, contact: TourContact) => {
        setDraftingContactId(contact.id);
        const pitch = await generateTourPitchEmail(artist.name, stop, contact);
        // In a real app, this would be a proper state update via props
        const intel = localIntel[stop.id];
        if (intel) {
            const contactToUpdate = intel.contacts.find(c => c.id === contact.id);
            if (contactToUpdate) contactToUpdate.pitchDraft = pitch;
        }
        setDraftingContactId(null);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-2xl font-bold text-light-text">AI Tour Planner & Promoter</h2>
                {props.setView && (
                    <div className="flex gap-2">
                        <button 
                            onClick={() => props.setView!('venue-scout')}
                            className="bg-dark-card border border-dark-border text-light-text font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-dark-border"
                        >
                            <BuildingStoreIcon className="w-5 h-5" />
                            Venue Scout
                        </button>
                        <button 
                            onClick={() => props.setView!('tour-profit-calculator')}
                            className="bg-dark-card border border-dark-border text-light-text font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-dark-border"
                        >
                            <CalculatorIcon className="w-5 h-5" />
                            Profit Calc
                        </button>
                        <button 
                            onClick={() => props.setView!('stage-designer')}
                            className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-brand-purple-dark"
                        >
                            <LightIcon className="w-5 h-5" />
                            Design Stage
                        </button>
                    </div>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left column for tour stops */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-dark-card border border-dark-border rounded-lg p-4">
                        <h3 className="font-semibold text-light-text mb-3 flex items-center gap-2"><MapIcon className="w-5 h-5" /> Route Planner</h3>
                        <div className="space-y-2">
                           <input type="text" value={region} onChange={e => setRegion(e.target.value)} placeholder="Region (e.g., US West Coast)" className="w-full bg-dark-bg p-2 rounded-md text-sm" />
                           <input type="text" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Duration (e.g., 2 Weeks)" className="w-full bg-dark-bg p-2 rounded-md text-sm" />
                           <button onClick={handleGenerateRoutes} disabled={isLoading} className="w-full bg-brand-purple text-sm font-bold py-2 rounded-md flex items-center justify-center disabled:opacity-50">
                               <SparklesIcon className="w-4 h-4 mr-1"/> {isLoading ? 'Generating...' : 'Suggest Routes'}
                           </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-light-text mb-3">Tour Itinerary</h3>
                        <div className="space-y-2">
                            {isLoading && <LoadingSpinner text="Planning optimal routes..." />}
                            {tourRouteSuggestion && (
                                <div className="bg-dark-card border border-brand-purple rounded-lg p-3">
                                    <p className="text-sm font-semibold">{tourRouteSuggestion.summary}</p>
                                    {tourRouteSuggestion.route.map((stop: any) => (
                                        <button key={stop.city} onClick={() => handleSelectStop({ ...stop, id: Date.now() + Math.random(), date: new Date().toISOString(), status: 'Pending' })} className={`w-full text-left p-2 mt-1 rounded-md ${selectedStop?.city === stop.city ? 'bg-dark-border' : 'bg-dark-bg'}`}>
                                            <p className="font-bold">{stop.city}</p>
                                            <p className="text-xs">{stop.venue}</p>
                                        </button>
                                    ))}
                                </div>
                            )}
                            {stops.map((stop: any) => (
                                <div key={stop.id} className="bg-dark-card border border-dark-border rounded-lg p-3">
                                    <p className="font-bold text-light-text">{stop.city}</p>
                                    <p className="text-xs text-medium-text">{new Date(stop.date).toLocaleDateString()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right column for intel */}
                <div className="md:col-span-2 bg-dark-card border border-dark-border rounded-lg p-6 min-h-[500px]">
                    <h3 className="text-xl font-bold text-light-text mb-4">AI Tour Promoter</h3>
                    {!selectedStop && <p className="text-center text-medium-text pt-16">Select a city from a suggested route to get local promo intel.</p>}
                    {isPromoterLoading && <LoadingSpinner text="Gathering local intel..." />}
                    
                    {selectedStop && !isPromoterLoading && (
                        <div className="space-y-6">
                            {localIntel[selectedStop.id] && (
                                <div>
                                    <h4 className="text-lg font-semibold text-brand-purple mb-3">Local Promotional Contacts</h4>
                                    <div className="space-y-4">
                                        {localIntel[selectedStop.id].contacts.map(contact => (
                                            <div key={contact.id} className="bg-dark-bg p-4 rounded-lg border border-dark-border">
                                                <p className="font-bold text-light-text">{contact.name}</p>
                                                <p className="text-xs font-semibold text-medium-text uppercase">{contact.type}</p>
                                                <p className="text-sm text-medium-text mt-2">{contact.description}</p>
                                                
                                                {contact.pitchDraft ? (
                                                     <textarea readOnly value={contact.pitchDraft} rows={5} className="w-full bg-dark-card text-xs p-2 rounded-md border border-dark-border mt-2" />
                                                ) : (
                                                    <button onClick={() => handleDraftPitch(selectedStop, { ...contact, role: contact.type } as TourContact)} disabled={draftingContactId === contact.id} className="mt-3 bg-dark-border text-sm font-semibold py-2 px-4 rounded-lg hover:bg-dark-border/70 disabled:opacity-50 flex items-center">
                                                        <SparklesIcon className="w-4 h-4 mr-2" />
                                                        {draftingContactId === contact.id ? "Drafting..." : "Draft Pitch"}
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {geoAdOpportunity && (
                                 <div>
                                    <h4 className="text-lg font-semibold text-brand-purple mb-3">Geo-Targeted Ad Opportunity</h4>
                                    <div className="bg-dark-bg p-4 rounded-lg border border-dark-border">
                                        <p className="font-semibold text-light-text">{geoAdOpportunity.eventName}</p>
                                        <p className="text-sm text-medium-text mt-1">{geoAdOpportunity.rationale}</p>
                                        <p className="text-sm italic text-light-text/80 mt-2">"{geoAdOpportunity.suggestedCopy}"</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
