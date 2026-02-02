export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageColor: string; // Gradient background for now, replace with image in v2
    category: 'vinyl' | 'apparel' | 'digital' | 'accessory';
    link: string; // External link to Qrates/Printful/Stripe
    badge?: string;
    proOnly?: boolean;
    inStock: boolean;
}

export const VINYL_PRODUCTS: Product[] = [
    {
        id: "vinyl-neon-dreams",
        name: "Neon Dreams - Limited Edition Vinyl",
        price: 25.00,
        description: "180g Heavyweight Vinyl in Translucent Pink. Includes digital download.",
        imageColor: "linear-gradient(135deg, #FF69B4, #9370DB)",
        category: "vinyl",
        link: "https://qrates.com/", // Placeholder
        badge: "Crowdfunding Now",
        inStock: true
    },
    {
        id: "vinyl-echoes",
        name: "Echoes of Light - Collector's LP",
        price: 28.00,
        description: "Double LP with gatefold artwork and exclusive poster.",
        imageColor: "linear-gradient(135deg, #4B0082, #0000FF)",
        category: "vinyl",
        link: "https://qrates.com/", // Placeholder
        badge: "Pre-order",
        inStock: true
    }
];

export const MERCH_PRODUCTS: Product[] = [
    {
        id: "hoodie-midnight",
        name: "Midnight Tour Hoodie",
        price: 65.00,
        description: "Sustainable organic cotton blend. Puff print logo on back.",
        imageColor: "linear-gradient(45deg, #111, #333)",
        category: "apparel",
        link: "https://printful.com", // Placeholder
        badge: "Best Seller",
        inStock: true
    },
    {
        id: "tee-c-minor",
        name: "C Minor Lyric Tee",
        price: 35.00,
        description: "Oversized fit. 'It's C Minor, baby' print on chest.",
        imageColor: "linear-gradient(45deg, #fff, #eee)",
        category: "apparel",
        link: "https://printful.com", // Placeholder
        inStock: true
    },
    {
        id: "cap-logo",
        name: "SingIt Pop Dad Cap",
        price: 25.00,
        description: "Embroidered logo. Adjustable strap.",
        imageColor: "linear-gradient(45deg, #FFD700, #FDB931)",
        category: "accessory",
        link: "https://printful.com", // Placeholder
        inStock: true
    },
    {
        id: "pin-set",
        name: "Pro Member Pin Set",
        price: 15.00,
        description: "Set of 3 enamel pins. Exclusive to Club members.",
        imageColor: "linear-gradient(45deg, #FF3CAC, #784BA0)",
        category: "accessory",
        link: "https://printful.com", // Placeholder
        proOnly: true,
        badge: "VIP Exclusive",
        inStock: true
    }
];
