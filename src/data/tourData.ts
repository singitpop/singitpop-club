import { LucideIcon } from "lucide-react";

export interface Logistics {
    driveTime?: string;
    ferryDuration?: string;
    parkAndWalk?: string;
    timeAtSite?: string;
    transferTime?: string;
}

export interface Accommodation {
    name: string;
    type: 'Hotel' | 'Campsite' | 'Mobile Stopover';
    price?: string;
    bookingLink?: string;
    facilities?: string[];
    notes?: string;
    commute?: string; // Distance/Time from city centre/attraction
}

export interface Attraction {
    name: string;
    type: 'Castle' | 'Nature' | 'Activity' | 'History' | 'Shopping' | 'Viewpoint' | 'Travel';
    listOwner?: 'Joyce' | 'Jackie' | 'Both';
    bookingLink?: string;
    description: string;
    scenicGuide?: string; // Tips for the best view/photo
    price?: string;
    openingTimes?: string;
    accessibility?: {
        rating: 'Easy' | 'Moderate' | 'Hard';
        blueBadge: boolean;
        parkingInfo?: string;
        mobilityInfo?: string; // Terrain, steps, lifts
        toilets?: boolean;
    };
    logistics?: Logistics;
    notes?: string;
    coordinates?: [number, number];
}

export interface TourStop {
    day: number;
    date: string;
    title: string;
    location: string;
    type: 'Travel' | 'Explore' | 'Activity';
    distance?: string;
    driveTime?: string;
    coordinates: [number, number]; // [Lat, Lng]
    status: 'Planned' | 'Booked' | 'Completed';
    dailyTip?: string; // "Start early to miss crowds" etc.
    accommodation: Accommodation;
    attractions: Attraction[];
}

export const TOUR_ITINERARY: TourStop[] = [
    {
        day: 1,
        date: "Mon Apr 20",
        title: "The Border Run: Kelso First",
        location: "Kelso (Floors Castle) -> Edinburgh",
        type: "Travel",
        distance: "120 miles total",
        driveTime: "2h 30m total driving",
        coordinates: [55.9006, -3.1833], // Mortonhall (Evening stop)
        status: "Planned",
        dailyTip: "We are heading straight to Kelso to start the tour at Floors Castle. It's the grand opening!",
        accommodation: {
            name: "Mortonhall Caravan & Camping Park (Edinburgh)",
            type: "Campsite",
            price: "£35/night approx",
            bookingLink: "https://www.meadowhead.co.uk/parks/mortonhall/",
            facilities: ["EHU", "Water", "Waste", "Bus to City"],
            notes: "Great base. We arrive here after the castle.",
            commute: "Bus #11 stops right outside the gate. 25 mins to Princes Street."
        },
        attractions: [
            {
                name: "Floors Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "Scotland's largest inhabited castle. Stunning gardens and grand rooms.",
                price: "£15.00",
                openingTimes: "10:30 - 16:00",
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    parkingInfo: "Designated parking near the front door.",
                    mobilityInfo: "Passenger lift accesses the Castle State Rooms. Gardens have hard gravel paths."
                },
                logistics: {
                    driveTime: "1h 30m from Home to Kelso",
                    timeAtSite: "2 hours",
                    parkAndWalk: "Parking is on-site. 2 min walk to entrance."
                },
                scenicGuide: "Walk to the Millennium Garden for the classic view of the castle turrets against the river."
            },
        ]
    },
    {
        day: 2,
        date: "Tue Apr 21",
        title: "Edinburgh: The Royal Mile",
        location: "Edinburgh",
        type: "Explore",
        coordinates: [55.9486, -3.1999], // Edinburgh Castle
        status: "Planned",
        dailyTip: "Edinburgh is hilly! Take it slow. We can grab a taxi to the Castle esplanade to save the big walk up.",
        accommodation: { name: "Mortonhall Caravan & Camping Park", type: "Campsite" },
        attractions: [
            {
                name: "Edinburgh Castle",
                type: "Castle",
                listOwner: "Joyce",
                bookingLink: "https://www.edinburghcastle.scot/",
                description: "The Crown Jewels and Stone of Destiny.",
                price: "£19.50 (Concession)",
                openingTimes: "09:30 - 18:00",
                accessibility: {
                    rating: 'Moderate',
                    blueBadge: true,
                    parkingInfo: "LIMITED availability on the Esplanade (MUST book in advance via email).",
                    mobilityInfo: "Mobility vehicle often runs from entrance to Crown Square (steep otherwise)."
                },
                logistics: {
                    transferTime: "30 mins (Bus #11) -> Walk up Mound OR Taxi to Esplanade",
                    timeAtSite: "2-3 hours",
                    parkAndWalk: "If driving: Castle Terrace NCP (expensive, 10 min uphill walk)."
                },
                scenicGuide: "The Battery (Argyle & Mills Mount) gives the famous panoramic view over the New Town."
            },
            {
                name: "The Real Mary King's Close",
                type: "History",
                listOwner: "Joyce",
                description: "Underground streets frozen in time from the 17th century.",
                price: "£21.00",
                openingTimes: "10:00 - 17:00",
                accessibility: {
                    rating: 'Hard',
                    blueBadge: false,
                    mobilityInfo: "Historical site with many steps. Not suitable for wheelchairs. Virtual tour available."
                },
                logistics: {
                    timeAtSite: "1 hour (Guided Tour)",
                    parkAndWalk: "Opposite St Giles Cathedral (Pedestrian zone)."
                }
            },
            {
                name: "Grassmarket",
                type: "Shopping",
                listOwner: "Both",
                description: "Historic market place with great pubs and views of the castle from below.",
                price: "Free",
                openingTimes: "Anytime",
                scenicGuide: "Stand near the Vennel steps for the 'Harry Potter' style view of the castle looming above.",
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "On-street parking or Castle Terrace multi-storey nearby." },
                logistics: {
                    timeAtSite: "1 hour (Lunch?)",
                    parkAndWalk: "5 min walk down from Royal Mile."
                }
            }
        ]
    },
    {
        day: 3,
        date: "Wed Apr 22",
        title: "Edinburgh: Leith & Legends",
        location: "Edinburgh",
        type: "Explore",
        coordinates: [55.9533, -3.1883], // Edinburgh
        status: "Planned",
        accommodation: { name: "Mortonhall Caravan & Camping Park", type: "Campsite" },
        attractions: [
            {
                name: "Royal Yacht Britannia",
                type: "History",
                listOwner: "Joyce",
                description: "The Queen's former floating palace. See the bedrooms and engine room.",
                price: "£18.50",
                openingTimes: "10:00 - 16:30",
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    parkingInfo: "Level 2 of Ocean Terminal Car Park (Blue Zone). Walkway to Visitor Centre.",
                    mobilityInfo: "Fully accessible via lifts and ramps globally praised."
                },
                logistics: {
                    transferTime: "40 mins (Bus #11 -> Change to #22 or Taxi)",
                    timeAtSite: "2 hours",
                    parkAndWalk: "Free parking in Ocean Terminal multi-storey."
                },
                scenicGuide: "The Royal Deck Tea Room offers stunning views over the Firth of Forth."
            },
            {
                name: "The Museum of Childhood",
                type: "History",
                listOwner: "Joyce",
                description: "Nostalgia overload! Toys from every decade.",
                price: "Free",
                openingTimes: "10:00 - 17:00",
                accessibility: {
                    rating: 'Easy',
                    blueBadge: false,
                    mobilityInfo: "Located on Royal Mile. Lifts to all floors."
                },
                logistics: {
                    timeAtSite: "45 mins",
                    parkAndWalk: "On Royal Mile (Pedestrian heavy)."
                }
            }
        ]
    },
    {
        day: 4,
        date: "Thu Apr 23",
        title: "Engineering & Kings",
        location: "Perth / Scone",
        type: "Explore",
        coordinates: [56.4239, -3.4357], // Scone
        status: "Planned",
        dailyTip: "We'll park right at the Kelpies for a quick, flat walk. The view is instant.",
        accommodation: {
            name: "Scone Palace Camping & Caravanning Club Site",
            type: "Campsite",
            bookingLink: "https://www.campingandcaravanningclub.co.uk/",
            facilities: ["EHU", "Showers", "Pets"],
            notes: "Peaceful site in the palace grounds."
        },
        attractions: [
            {
                name: "The Kelpies (Helix Park)",
                type: "Viewpoint",
                listOwner: "Both",
                description: "30-meter-high horse-head sculptures. Mythical and massive.",
                price: "Free (Tours £7.50)",
                openingTimes: "24/7 (Visitor Centre 09:30-17:00)",
                coordinates: [56.0191, -3.7553],
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    parkingInfo: "Kelpies Car Park (closest). Do not park at Helix Park main car park (too far).",
                    mobilityInfo: "Flat tarmac paths all round."
                },
                logistics: {
                    driveTime: "45 mins from Edinburgh",
                    timeAtSite: "45 mins",
                    parkAndWalk: "Car park is right next to the sculptures."
                },
                scenicGuide: "Walk INTO the sculptures if open, but the best photo is from the pool side reflecting the heads."
            },
            {
                name: "Falkirk Wheel",
                type: "Activity",
                listOwner: "Both",
                description: "Rotating boat lift. Access to the visitor centre is easy.",
                price: "Free (Boat Trip £14.50)",
                openingTimes: "10:00 - 17:30",
                coordinates: [56.0004, -3.8415],
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "Dedicated Blue Badge spaces near Visitor Centre entrance." },
                logistics: {
                    driveTime: "15 mins from Kelpies",
                    timeAtSite: "1 hour (Watching the rotation)"
                }
            },
            {
                name: "Hopetoun House",
                type: "History",
                listOwner: "Joyce",
                description: "Scotland's finest stately home. Grand architecture and deer park.",
                price: "£13.50",
                openingTimes: "10:30 - 17:00",
                coordinates: [55.9956, -3.4699],
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    parkingInfo: "Parking available near the house.",
                    mobilityInfo: "Step-free access to ground floor. Lift to upper floors."
                },
                logistics: {
                    driveTime: "25 mins from Falkirk (Back East)",
                    timeAtSite: "2 hours",
                    parkAndWalk: "Car park on site."
                }
            },
            {
                name: "Queensferry Crossing (The Bridge)",
                type: "Travel",
                listOwner: "Both",
                description: "Crossing the Forth in style involves a slight detour back, but gives great views of the Rail Bridge.",
                price: "Free",
                openingTimes: "24/7",
                logistics: {
                    driveTime: "5 mins from Hopetoun",
                    timeAtSite: "Drive-over"
                }
            },
            {
                name: "Scone Palace",
                type: "Castle",
                listOwner: "Joyce",
                description: "Where Kings of Scots were crowned correctly.",
                price: "£17.50",
                openingTimes: "10:00 - 17:00",
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    parkingInfo: "Parking near entrance.",
                    mobilityInfo: "Ground floor fully accessible. Gardens have firm paths."
                },
                logistics: {
                    driveTime: "45 mins from Bridge (M90)",
                    timeAtSite: "1h 30m"
                }
            }
        ]
    },
    {
        day: 5,
        date: "Fri Apr 24",
        title: "Royal Deeside & The Glens",
        location: "Balmoral",
        type: "Travel",
        coordinates: [57.0494, -3.0365], // Ballater
        status: "Planned",
        dailyTip: "The drive over Cairnwell Pass is high! We can stop at the ski centre for a toilet break/coffee with a view.",
        accommodation: {
            name: "Ballater Caravan Park",
            type: "Campsite",
            facilities: ["EHU", "River View", "Village Walk"],
            notes: "Lovely riverside site."
        },
        attractions: [
            {
                name: "Glamis Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "Childhood home of the Queen Mother. Fairytale turrets.",
                price: "£17.00",
                openingTimes: "10:00 - 17:00",
                accessibility: {
                    rating: 'Moderate',
                    blueBadge: true,
                    mobilityInfo: "Ground floor / Dining / Shops accessible. Upper floors via stairs only."
                },
                logistics: {
                    driveTime: "40 mins from Scone",
                    timeAtSite: "2 hours",
                    parkAndWalk: "Approx 400m walk from car park (shuttle sometimes available)."
                }
            },
            {
                name: "Balmoral Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "The King's Highland home. Ballroom exhibition.",
                price: "£17.50",
                openingTimes: "10:00 - 17:00",
                accessibility: {
                    rating: 'Moderate',
                    blueBadge: true,
                    parkingInfo: "Main car park 500 yards away - ASK staff for buggy shuttle or permission to drive closer.",
                    mobilityInfo: "Ballroom is accessible. Gardens have gravel paths."
                },
                logistics: {
                    driveTime: "1h 10m from Glamis (Scenic drive!)",
                    timeAtSite: "1h 30m"
                }
            }
        ]
    },
    {
        day: 6,
        date: "Sat Apr 25",
        title: "The Monster Hunt",
        location: "Loch Ness",
        type: "Explore",
        coordinates: [57.2796, -4.4533], // Loch Ness Shores
        status: "Planned",
        dailyTip: "Urquhart Castle has many stairs, but the Visitor Centre balcony has the BEST view of the Loch without walking down.",
        accommodation: {
            name: "Loch Ness Shores Site",
            type: "Campsite",
            facilities: ["EHU", "Lochside", "High Quality"],
            notes: "Right on the water. A truly special site."
        },
        attractions: [
            {
                name: "Urquhart Castle",
                type: "Castle",
                listOwner: "Both",
                description: "The iconic ruins overlooking Loch Ness. Visitor centre with cinema.",
                price: "£14.50",
                openingTimes: "09:30 - 18:00",
                accessibility: {
                    rating: 'Moderate',
                    blueBadge: true,
                    parkingInfo: "Dedicated Blue Badge spaces near Visitor Centre.",
                    mobilityInfo: "Visitor Centre fully accessible. Steep path down to ruins (though visible from terrace)."
                },
                logistics: {
                    driveTime: "1h 30m from Ballater",
                    timeAtSite: "1h 30m",
                    parkAndWalk: "Car park on site (Can be busy)."
                },
                scenicGuide: "The view from the Grant Tower is the definitive Loch Ness panorama."
            },
            {
                name: "Cawdor Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "Romantic castle with beautiful walled gardens.",
                price: "£14.50",
                openingTimes: "10:00 - 17:30",
                accessibility: { rating: 'Easy', blueBadge: true, mobilityInfo: "Gardens are the highlight and mostly flat/accessible." },
                logistics: {
                    driveTime: "40 mins from Urquhart Castle (via Inverness)",
                    timeAtSite: "1h 30m"
                }
            },
            {
                name: "Loch Ness (Dores Beach)",
                type: "Viewpoint",
                listOwner: "Both",
                description: "The classic view down the Loch. Pebble beach.",
                price: "Free",
                openingTimes: "Anytime",
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "Parking at Dores Inn. Short flat walk to shore." },
                scenicGuide: "The best view is from the pebbled Dores beach looking straight down the Great Glen.",
                logistics: {
                    driveTime: "30 mins from Cawdor",
                    timeAtSite: "30 mins (Photos)"
                }
            }
        ]
    },
    {
        day: 7,
        date: "Sun Apr 26",
        title: "Waterfalls & The West",
        location: "Isle of Skye",
        type: "Travel",
        coordinates: [57.4125, -6.1960], // Portree
        status: "Planned",
        dailyTip: "Victoria Falls is a short walk from the car park. We can take our time.",
        accommodation: {
            name: "Torvaig Caravan Site (Portree)",
            type: "Campsite",
            notes: "Hillside site with views over the hills."
        },
        attractions: [
            {
                name: "Victoria Falls (Wester Ross)",
                type: "Nature",
                listOwner: "Both",
                description: "A beautiful waterfall right off the road along Loch Maree.",
                price: "Free",
                openingTimes: "Anytime",
                accessibility: { rating: 'Easy', blueBadge: false, mobilityInfo: "Viewing platform is a short walk from the car." },
                logistics: {
                    driveTime: "1h 30m from Loch Ness",
                    timeAtSite: "20 mins",
                    parkAndWalk: "Car park is directly adjacent to the path."
                }
            },
            {
                name: "Portree Harbour",
                type: "Viewpoint",
                listOwner: "Both",
                description: "The famous colourful houses.",
                price: "Free",
                openingTimes: "Anytime",
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "Public car park at the quay (get there early or late)." },
                scenicGuide: "The classic photo is taken from 'The Lump' (steep) OR simply from the harbour wall looking back at the houses.",
                logistics: {
                    driveTime: "1h 30m from Victoria Falls (crossing Skye Bridge)",
                    timeAtSite: "1 hour (Fish & Chips?)"
                }
            }
        ]
    },
    {
        day: 8,
        date: "Mon Apr 27",
        title: "Skye to Mull",
        location: "Tobermory",
        type: "Travel",
        coordinates: [56.6212, -6.0716], // Tobermory
        status: "Planned",
        dailyTip: "Ferry day! Stay in the car or use the lift to the lounge. Great views of the islands.",
        accommodation: {
            name: "Tobermory Campsite",
            type: "Campsite",
            notes: "Quiet site."
        },
        attractions: [
            {
                name: "Tobermory Main Street",
                type: "Shopping",
                listOwner: "Joyce",
                description: "Balamory! Cute shops and chocolate factory.",
                price: "Free",
                openingTimes: "Shops ~09:00 - 17:00",
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "Parking on the main pier. Main street is flat." },
                scenicGuide: "Walk to the far end of the pier for the full sweep of colourful buildings.",
                logistics: {
                    driveTime: "Drive south to Armadale Ferry, then Mallaig to Oban/Mull. LONG DAY.",
                    ferryDuration: "Armadale-Mallaig (45m) + Drive + Oban-Craignure (50m)",
                    timeAtSite: "Evening stroll"
                }
            }
        ]
    },
    {
        day: 9,
        date: "Tue Apr 28",
        title: "Return to the Mainland",
        location: "Fort William",
        type: "Travel",
        coordinates: [56.8043, -5.0744], // Glen Nevis
        status: "Planned",
        accommodation: {
            name: "Glen Nevis Caravan & Camping Park",
            type: "Campsite",
            facilities: ["EHU", "Shop", "Restaurant", "Views of Ben Nevis"],
            notes: "Top rated site. Restaurant on-site means no cooking tonight!",
            commute: "Bus or short taxi (5 mins) into Fort William town centre."
        },
        attractions: [
            {
                name: "Ferry Crossing (Fishnish - Lochaline)",
                type: "Travel",
                listOwner: "Both",
                description: "The short crossing back to the mainland (Morvern).",
                price: "£15.00 (Vehicle)",
                openingTimes: "Every 45 mins",
                logistics: {
                    driveTime: "25 mins from Tobermory to Fishnish Slip",
                    ferryDuration: "15 min crossing (Turn up and go)",
                    timeAtSite: "Allow 30 mins buffer"
                }
            },
            {
                name: "Fort William Town Centre",
                type: "Shopping",
                listOwner: "Both",
                description: "Explore the High Street, Cameron Square, and the Old Fort ruins.",
                price: "Free",
                openingTimes: "Anytime",
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "West End Car Park usually has spaces." },
                logistics: {
                    driveTime: "45 mins from Lochaline (via Corran Ferry £10)",
                    parkAndWalk: "West End Car Park -> High St (Flat, 5 mins).",
                    timeAtSite: "2 hours"
                }
            }
        ]
    },
    {
        day: 10,
        date: "Wed Apr 29",
        title: "The Harry Potter Train",
        location: "Fort William",
        type: "Activity",
        coordinates: [56.8187, -5.1069], // Fort William Station area
        status: "Planned",
        dailyTip: "We are booked in First Class (hopefully!) for comfy seats and tea. Sit on the LEFT for the best view of the viaduct.",
        accommodation: { name: "Glen Nevis Caravan & Camping Park", type: "Campsite" },
        attractions: [
            {
                name: "The Jacobite Steam Train",
                type: "Activity",
                listOwner: "Both",
                bookingLink: "https://westcoastrailways.co.uk/jacobite/steam-train",
                description: "The world's greatest railway journey. 84 miles round trip.",
                price: "£65.00 (Standard)",
                openingTimes: "Depart 10:15 or 12:50",
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    mobilityInfo: "Ramps available. Staff are excellent at assisting boarding."
                },
                notes: "CRITICAL BOOKING.",
                logistics: {
                    driveTime: "10 mins from Campsite to Station",
                    timeAtSite: "6 hours (Round trip is 10:15 - 16:00 approx)",
                    parkAndWalk: "Morrisons Car Park allows long stay (check signs) or dedicated sprawling lots nearby."
                }
            }
        ]
    },
    {
        day: 11,
        date: "Thu Apr 30",
        title: "Glencoe & The Bonny Banks",
        location: "Loch Lomond",
        type: "Travel",
        coordinates: [56.1264, -4.4326], // Cobleland (Aberfoyle)
        status: "Planned",
        dailyTip: "We'll stop at the 'Meeting of Three Waters' in Glencoe. It's right by the road, amazing photo, no walking needed.",
        accommodation: {
            name: "Cobleland Campsite (Aberfoyle)",
            type: "Campsite",
            bookingLink: "https://www.campingintheforest.co.uk/",
            notes: "Peaceful riverside spots."
        },
        attractions: [
            {
                name: "Glencoe Visitor Centre",
                type: "Nature",
                listOwner: "Both",
                description: "The most dramatic valley in Scotland.",
                price: "Free (Parking £4)",
                openingTimes: "09:30 - 17:00",
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "Large accessible car park." },
                scenicGuide: "Stop at the 'Three Sisters' viewpoint car park (A82) for the most famous mountain view.",
                logistics: {
                    driveTime: "30 mins from Fort William",
                    timeAtSite: "1 hour (Visitor Centre + Photos)"
                }
            },
            {
                name: "Loch Lomond Shores",
                type: "Shopping",
                listOwner: "Joyce",
                description: "Upmarket shopping mall with balcony views over the Loch.",
                price: "Free",
                openingTimes: "10:00 - 17:30",
                accessibility: { rating: 'Easy', blueBadge: true, mobilityInfo: "Fully accessible. Lifts and flat paths." },
                logistics: {
                    driveTime: "1h 15m from Glencoe",
                    timeAtSite: "1h 30m"
                }
            }
        ]
    },
    {
        day: 12,
        date: "Fri May 1",
        title: "City Chic & Clifftop Castles",
        location: "Ayrshire",
        type: "Explore",
        coordinates: [55.3551, -4.7938], // Culzean
        status: "Planned",
        accommodation: {
            name: "Culzean Castle Camping Site",
            type: "Campsite",
            notes: "Sea views."
        },
        attractions: [
            {
                name: "Ayrshire Coast",
                type: "Viewpoint",
                listOwner: "Both",
                description: "Enjoying the sunset over looking Arran and Ailsa Craig.",
                price: "Free",
                openingTimes: "Anytime",
                accessibility: { rating: 'Easy', blueBadge: true },
                logistics: {
                    driveTime: "1h 30m from Loch Lomond",
                    timeAtSite: "Evening Relax"
                }
            }
        ]
    },
    {
        day: 13,
        date: "Sat May 2",
        title: "The Final Leg: Culzean to Home",
        location: "Culzean -> NE31 2PL",
        type: "Travel",
        coordinates: [54.9667, -1.5039], // Home (Approx)
        status: "Planned",
        dailyTip: "Enjoy the castle in the morning, then it's a straight run down the road home!",
        accommodation: { name: "Home", type: "Hotel" },
        attractions: [
            {
                name: "Culzean Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "Eisenhower's apartment is here. Perched on a cliff.",
                price: "£18.50 (Concession)",
                openingTimes: "10:30 - 16:30",
                accessibility: {
                    rating: 'Moderate',
                    blueBadge: true,
                    parkingInfo: "Blue badge bays at Home Farm (Visitor Centre).",
                    mobilityInfo: "Shuttle buggy often runs from Visitor Centre to Castle. Lift in Castle."
                },
                scenicGuide: "The view across the firth to Ailsa Craig (the 'Paddy's Milestone' rock) is stunning from the castle terrace.",
                logistics: {
                    driveTime: "Morning at Castle",
                    timeAtSite: "2-3 hours",
                    parkAndWalk: "Parking at Home Farm. 10 min walk or buggy to Castle."
                }
            },
            {
                name: "Journey Home",
                type: "Travel",
                listOwner: "Both",
                price: "N/A",
                openingTimes: "N/A",
                description: "The final drive.",
                logistics: {
                    driveTime: "3h 30m from Culzean to Home",
                    timeAtSite: "Arrive late afternoon"
                }
            }
        ]
    }
];
