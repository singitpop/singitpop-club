export interface AccessibilityInfo {
    rating: 'Easy' | 'Moderate' | 'Hard';
    blueBadge: boolean;
    parkingInfo?: string; // "Park on the Esplanade (must book)"
    mobilityInfo?: string; // "Mobility car available"
    toilets?: boolean;
}

export interface Logistics {
    driveTime?: string; // "2h 30m"
    ferryDuration?: string; // "45m crossing + 30m check-in"
    parkAndWalk?: string; // "10 min walk from West End Car Park"
    busOption?: string; // "Bus #31 from campsite to Princes St (30 mins)"
    timeAtSite?: string; // "Recommended: 2 hours"
    transferTime?: string; // "15 min taxi"
}

export interface Accommodation {
    name: string;
    type: 'Campsite' | 'Hotel' | 'Mobile Stopover' | 'Ferry';
    price?: string;
    bookingLink?: string;
    facilities?: string[];
    coordinates?: string;
    notes?: string;
    commute?: string; // "Bus 11 stops outside (20 mins to city)"
}

export interface Attraction {
    name: string;
    type: 'Castle' | 'Nature' | 'Activity' | 'History' | 'Shopping' | 'Viewpoint' | 'Travel';
    listOwner?: 'Joyce' | 'Jackie' | 'Both';
    bookingLink?: string;
    price?: string;
    openingTimes?: string;
    description?: string;
    accessibility?: AccessibilityInfo;
    scenicGuide?: string;
    notes?: string;
    logistics?: Logistics;
}

export interface TourStop {
    day: number;
    date: string;
    title: string;
    location: string;
    type: 'Travel' | 'Explore' | 'Rest' | 'Activity';
    accommodation?: Accommodation;
    attractions: Attraction[];
    distance?: string;
    driveTime?: string; // "Total driving: 3h"
    status: 'Planned' | 'Booked' | 'Completed';
    dailyTip?: string;
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
        status: "Planned",
        accommodation: { name: "Mortonhall Caravan & Camping Park", type: "Campsite" },
        attractions: [
            {
                name: "Royal Yacht Britannia",
                type: "History",
                listOwner: "Joyce",
                description: "The Queen's former floating palace. See the bedrooms and engine room.",
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
                accessibility: { rating: 'Easy', blueBadge: true, parkingInfo: "Dedicated Blue Badge spaces near Visitor Centre entrance." },
                logistics: {
                    driveTime: "15 mins from Kelpies",
                    timeAtSite: "1 hour (Watching the rotation)"
                }
            },
            {
                name: "Scone Palace",
                type: "Castle",
                listOwner: "Joyce",
                description: "Where Kings of Scots were crowned correctly.",
                accessibility: {
                    rating: 'Easy',
                    blueBadge: true,
                    parkingInfo: "Parking near entrance.",
                    mobilityInfo: "Ground floor fully accessible. Gardens have firm paths."
                },
                logistics: {
                    driveTime: "1h from Falkirk",
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
                name: "Cawdor Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "Romantic castle with beautiful walled gardens.",
                accessibility: { rating: 'Easy', blueBadge: true, mobilityInfo: "Gardens are the highlight and mostly flat/accessible." },
                logistics: {
                    driveTime: "1h 15m from Ballater (via A939 - steep hills!)",
                    timeAtSite: "1h 30m"
                }
            },
            {
                name: "Loch Ness (Dores Beach)",
                type: "Viewpoint",
                listOwner: "Both",
                description: "The classic view down the Loch. Pebble beach.",
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
        status: "Planned",
        accommodation: {
            name: "Culzean Castle Camping Site",
            type: "Campsite",
            notes: "Sea views."
        },
        attractions: [
            {
                name: "Culzean Castle",
                type: "Castle",
                listOwner: "Joyce",
                description: "Eisenhower's apartment is here. Perched on a cliff.",
                accessibility: {
                    rating: 'Moderate',
                    blueBadge: true,
                    parkingInfo: "Blue badge bays at Home Farm (Visitor Centre).",
                    mobilityInfo: "Shuttle buggy often runs from Visitor Centre to Castle. Lift in Castle."
                },
                scenicGuide: "The view across the firth to Ailsa Craig (the 'Paddy's Milestone' rock) is stunning from the castle terrace.",
                logistics: {
                    driveTime: "1h 30m from Loch Lomond",
                    timeAtSite: "2-3 hours",
                    parkAndWalk: "Parking at Home Farm. 10 min walk or buggy to Castle."
                }
            }
        ]
    },
    {
        day: 13,
        date: "Sat May 2",
        title: "The Homeward Leg",
        location: "Galloway / Gretna",
        type: "Travel",
        status: "Planned",
        accommodation: { name: "Stopover near Gretna", type: "Mobile Stopover" },
        attractions: [
            {
                name: "Gretna Green",
                type: "Shopping",
                listOwner: "Joyce",
                description: "Famous Blacksmith shop and outlet village.",
                logistics: {
                    driveTime: "1h 45m from Culzean",
                    timeAtSite: "1 hour"
                }
            }
        ]
    },
    {
        day: 14,
        date: "Sun May 3",
        title: "Home Sweet Home",
        location: "NE31 2PL",
        type: "Travel",
        distance: "End of Tour",
        driveTime: "2 hours",
        status: "Completed",
        accommodation: { name: "Home", type: "Hotel" },
        attractions: []
    }
];
