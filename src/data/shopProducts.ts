export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    imageColor: string; // Gradient background for now, replace with image in v2
    category: 'apparel' | 'digital' | 'accessory' | 'vinyl';
    link: string; // External link to Printful/Stripe
    badge?: string;
    proOnly?: boolean;
    inStock: boolean;
    startingPrice?: boolean; // Uses "From $XX" logic
}



export const MERCH_PRODUCTS: Product[] = [
    {
        id: "vinyl-limited",
        name: "Limited Edition Vinyl",
        price: 25.00,
        description: "The 'Director's Cut' Vinyl Edit. Curated audiophile master on 180g vinyl. Includes high-res digital download of the vinyl master.",
        imageColor: "linear-gradient(45deg, #000, #222)",
        category: "vinyl",
        link: "https://www.diggersfactory.com/vinyl/331968", // Live Project Link
        badge: "Crowdfunding Now",
        inStock: true
    },
    {
        id: "hoodie-midnight",
        name: "Midnight Hoodie",
        price: 65.00,
        description: "Heavyweight premium cotton. Small front logo, large back graphic.",
        imageColor: "linear-gradient(45deg, #111, #333)",
        category: "apparel",
        link: "https://singit-pop-shop.fourthwall.com/products/the-midnight-hoodie",
        badge: "Best Seller",
        inStock: true
    },
    {
        id: "tee-signature",
        name: "Signature Heavy Tee",
        price: 35.00,
        description: "Oversized fit, vintage wash. The classic fan essential.",
        imageColor: "linear-gradient(45deg, #222, #444)",
        category: "apparel",
        link: "https://singit-pop-shop.fourthwall.com/products/the-signature-neon-tee",
        inStock: true
    },
    {
        id: "beanie-logo",
        name: "Studio Cuffed Beanie",
        price: 30.00,
        description: "Warm knit with premium 3D embroidery.",
        imageColor: "linear-gradient(45deg, #333, #555)",
        category: "apparel",
        link: "https://singit-pop-shop.fourthwall.com/products/studio-cuffed-beanie",
        inStock: true
    },
    {
        id: "tote-vinyl",
        name: "Vinyl Carrier Tote",
        price: 32.00,
        description: "Heavy canvas bag perfectly sized for 12\" records.",
        imageColor: "linear-gradient(45deg, #444, #666)",
        category: "accessory",
        link: "https://singit-pop-shop.fourthwall.com/products/the-vinyl-carrier-tote",
        inStock: true
    },
    {
        id: "hat-dad",
        name: "Studio Dad Hat",
        price: 32.00,
        description: "Low profile, unstructured comfort. Embroidered logo.",
        imageColor: "linear-gradient(45deg, #222, #333)",
        category: "apparel",
        link: "https://singit-pop-shop.fourthwall.com/products/the-studio-dad-hat",
        inStock: true
    },
    {
        id: "mug-midnight",
        name: "Midnight Coffee Mug",
        price: 22.00, // Starting price
        description: "Premium black glossy mug. Available in 11oz and 15oz sizes.",
        imageColor: "linear-gradient(45deg, #000, #222)",
        category: "accessory",
        link: "https://singit-pop-shop.fourthwall.com/products/midnight-coffee-mug",
        startingPrice: true,
        inStock: true
    }
];
