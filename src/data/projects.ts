export interface Project {
    id: string;
    type: "album" | "video";
    title: string;
    description: string;
    status: "in_progress" | "completed" | "planned";
    progress: number;
    coverImage?: string;
    releaseDate?: string;
    createdAt: string;
}

export const PROJECTS: Project[] = [
    {
        id: "1",
        type: "album",
        title: "Velvet Frequency",
        description: "Upcoming EP featuring electronic soundscapes and intimate vocals",
        status: "in_progress",
        progress: 82,
        releaseDate: "2026-04-01",
        createdAt: "2025-12-01"
    },
    {
        id: "2",
        type: "video",
        title: "You Are My Valentine",
        description: "Romantic AI-generated music video",
        status: "in_progress",
        progress: 60,
        releaseDate: "2026-02-14",
        createdAt: "2026-01-20"
    },
    {
        id: "3",
        type: "album",
        title: "Summer Vibes 2026",
        description: "Upbeat tracks for the sunny season",
        status: "planned",
        progress: 0,
        releaseDate: "2026-06-01",
        createdAt: "2026-02-01"
    }
];
