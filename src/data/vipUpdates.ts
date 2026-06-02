export interface VipUpdate {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    image?: string;
    likes?: number;
}

export const VIP_UPDATES: VipUpdate[] = [
    {
        id: "update-1",
        title: "Tour Dates Announcement - Early Access",
        content: "Hey VIPs! You're seeing this first. We're hitting the road this summer! Check out the dates below before they go public on Friday. Pre-sale code: SINGITVIP",
        date: "2024-05-20",
        author: "Gary",
        likes: 124
    },
    {
        id: "update-2",
        title: "Studio Diary: Day 4",
        content: "Just laid down the vocals for 'Midnight Rain'. It's sounding huge. Can't wait for you to hear the final mix.",
        date: "2024-05-18",
        author: "Gary",
        likes: 98,
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
    }
];
