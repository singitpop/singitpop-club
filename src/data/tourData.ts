export interface AccessibilityInfo {
    rating: 'Easy' | 'Moderate' | 'Hard';
    blueBadge: boolean; // Parking available?
    walkingTime?: string; // "10 mins flat" or "20 mins steep"
    notes?: string; // "Use lift for access"
}

export interface Accommodation {
    name: string;
    type: 'Campsite' | 'Hotel' | 'Mobile Stopover' | 'Ferry';
    price?: string;
    bookingLink?: string;
    facilities?: string[];
    coordinates?: string;
    notes?: string;
}

export interface Attraction {
    name: string;
    type: 'Castle' | 'Nature' | 'Activity' | 'History' | 'Shopping' | 'Viewpoint';
    bucketListOwner?: 'Gary' | 'Wife' | 'Both';
    bookingLink?: string;
    price?: string;
    openingTimes?: string;
    description?: string; // What to expect
    accessibility?: AccessibilityInfo;
    scenicNote?: string; // "Amazing view of..."
    notes?: string;
}

export interface TourStop {
    day: number;
    date: string;
    title: string;
    location: string;
    type: 'Travel' | 'Explore' | 'Gig' | 'Rest';
    accommodation?: Accommodation;
    attractions: Attraction[];
    distance?: string;
    status: 'Planned' | 'Booked' | 'Completed';
    dailyTip?: string; // Special touch / Romantic idea
}

export const TOUR_ITINERARY: TourStop[] = [
    {
        day: 1,
        date: "Mon Apr 20",
        title: "The Departure & The Borders",
        location: "Edinburgh",
        type: "Travel",
        distance: "120 miles from NE31 2PL",
        status: "Planned",
        dailyTip: "Stop at the Scottish Border sign for a photo. It's the start of the adventure!",
        accommodation: {
            name: "Mortonhall Caravan & Camping Park (Edinburgh)",
            type: "Campsite",
            price: "£35/night approx",
            bookingLink: "https://www.meadowhead.co.uk/parks/mortonhall/",
            facilities: ["EHU", "Water", "Waste", "Bus to City"],
            notes: "Great base. Bus stop right outside (No. 11) takes you straight to Royal Mile."
        },
        attractions: [
            {
                name: "Floors Castle",
                type: "Castle",
                bucketListOwner: "Wife",
                description: "Scotland's largest inhabited castle. Stunning gardens and grand rooms.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Blue badge parking near front door. Lift to upper floors." },
                scenicNote: "View over the River Tweed is spectacular."
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
                bucketListOwner: "Both",
                bookingLink: "https://www.edinburghcastle.scot/",
                description: "The Crown Jewels and Stone of Destiny.",
                accessibility: { rating: 'Moderate', blueBadge: true, notes: "Cobbles are rough, but mobility vehicle usually available to take you to the top (Crown Square)." }
            },
            {
                name: "The Real Mary King's Close",
                type: "History",
                bucketListOwner: "Wife",
                description: "Underground streets frozen in time from the 17th century.",
                accessibility: { rating: 'Hard', blueBadge: false, notes: "Many original steps. Not fully accessible but they offer a virtual tour if walking is too much." }
            },
            {
                name: "Grassmarket",
                type: "Shopping",
                bucketListOwner: "Gary",
                description: "Historic market place with great pubs and views of the castle from below.",
                scenicNote: "Best photo spot of the Castle looming above.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Flat paved area, easy for walking." }
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
                bucketListOwner: "Both",
                description: "The Queen's former floating palace. See the bedrooms and engine room.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Fully accessible via lifts and ramps. Very wheelchair/cane friendly." },
                scenicNote: "View of the bridge and harbour from the deck."
            },
            {
                name: "The Museum of Childhood",
                type: "History",
                bucketListOwner: "Wife",
                description: "Nostalgia overload! Toys from every decade.",
                accessibility: { rating: 'Easy', blueBadge: false, notes: "Located on Royal Mile. mostly flat inside." }
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
                bucketListOwner: "Both",
                description: "30-meter-high horse-head sculptures. Mythical and massive.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Flat tarmac paths. Parking very close." },
                scenicNote: "Incredible scale. Perfect for a special photo."
            },
            {
                name: "Falkirk Wheel",
                type: "Activity",
                bucketListOwner: "Gary",
                description: "Rotating boat lift. Access to the visitor centre is easy.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Fully accessible visitor centre." }
            },
            {
                name: "Scone Palace",
                type: "Castle",
                bucketListOwner: "Wife",
                description: "Where Kings of Scots were crowned correctly.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Ground floor is accessible. Gardens are extensive but have firm paths." }
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
                bucketListOwner: "Wife",
                description: "Childhood home of the Queen Mother. Fairytale turrets.",
                accessibility: { rating: 'Moderate', blueBadge: true, notes: "Some stairs inside, but ground floor and gardens are accessible." }
            },
            {
                name: "Balmoral Castle",
                type: "Castle",
                bucketListOwner: "Wife",
                description: "The King's Highland home. Ballroom exhibition.",
                accessibility: { rating: 'Moderate', blueBadge: true, notes: "Parking is a bit of a walk, but they sometimes offer shuttles. Paths are gravel." }
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
                bucketListOwner: "Wife",
                description: "Romantic castle with beautiful walled gardens.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Gardens are the highlight and mostly flat/accessible." }
            },
            {
                name: "Loch Ness (Dores Beach)",
                type: "Viewpoint",
                bucketListOwner: "Both",
                description: "The classic view down the Loch. Pebble beach.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Park at the Dores Inn. Short walk to the shore." },
                scenicNote: "Perfect spot for a sunset."
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
                bucketListOwner: "Gary",
                description: "A beautiful waterfall right off the road along Loch Maree.",
                accessibility: { rating: 'Easy', blueBadge: false, notes: "Viewing platform is a short walk from the car." }
            },
            {
                name: "Portree Harbour",
                type: "Viewpoint",
                bucketListOwner: "Both",
                description: "The famous colourful houses.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Parking at the quay. Flat walking area." }
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
                bucketListOwner: "Wife",
                description: "Balamory! Cute shops and chocolate factory.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Parking on the pier. Main street is flat pavement." }
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
            notes: "Top rated site. Restaurant on-site means no cooking tonight!"
        },
        attractions: [
            { name: "Ferry Crossing", type: "Travel", bucketListOwner: "Gary", description: "Scenic crossing back to Oban/Lochaline." }
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
                bucketListOwner: "Both",
                bookingLink: "https://westcoastrailways.co.uk/jacobite/steam-train",
                description: "The world's greatest railway journey. 84 miles round trip.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Ramp access to train available. Assistance provided by staff." },
                notes: "CRITICAL BOOKING."
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
                bucketListOwner: "Gary",
                description: "The most dramatic valley in Scotland.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Modern accessible visitor centre with great views." }
            },
            {
                name: "Loch Lomond Shores",
                type: "Shopping",
                bucketListOwner: "Wife",
                description: "Upmarket shopping mall with balcony views over the Loch.",
                accessibility: { rating: 'Easy', blueBadge: true, notes: "Fully accessible. Lifts and flat paths." }
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
                bucketListOwner: "Wife",
                description: "Eisenhower's apartment is here. Perched on a cliff.",
                accessibility: { rating: 'Moderate', blueBadge: true, notes: "Lift available inside. Gardens are huge but have golf cart shuttles sometimes." },
                scenicNote: "View across to Ailsa Craig and Arran."
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
            { name: "Gretna Green", type: "Shopping", bucketListOwner: "Wife", description: "Famous Blacksmith shop and outlet village." }
        ]
    },
    {
        day: 14,
        date: "Sun May 3",
        title: "Home Sweet Home",
        location: "NE31 2PL",
        type: "Travel",
        distance: "End of Tour",
        status: "Completed",
        accommodation: { name: "Home", type: "Hotel" },
        attractions: []
    }
];
