"use client";

import { useState, useEffect } from "react";
import { Music, Film, Calendar, TrendingUp, Clock, CheckCircle, Loader } from "lucide-react";
import { motion } from "framer-motion";

import { PROJECTS, Project } from "@/data/projects";

const STATUS_CONFIG = {
    in_progress: { label: "In Progress", color: "from-yellow-500 to-orange-500", icon: Clock },
    completed: { label: "Completed", color: "from-green-500 to-emerald-500", icon: CheckCircle },
    planned: { label: "Planned", color: "from-blue-500 to-cyan-500", icon: Calendar }
};

import { useAuth } from '@/context/AuthContext';

export default function ProjectsPage() {
    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "album" | "video">("all");

    useEffect(() => {
        async function loadProjects() {
            try {
                const res = await fetch('/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to load projects", error);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    const filteredProjects = projects.filter(p => filter === "all" || p.type === filter);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader size={48} className="animate-spin text-pink-400" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-16 px-4">
            {/* Hero Section */}
            <div className="max-w-6xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Current Projects
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Follow along as we create new music, videos, and experiences
                    </p>
                </motion.div>
            </div>

            {/* Filter Tabs */}
            <div className="max-w-6xl mx-auto mb-8">
                <div className="flex gap-3 justify-center flex-wrap">
                    {[
                        { value: "all", label: "All Projects", icon: TrendingUp },
                        { value: "album", label: "Albums", icon: Music },
                        { value: "video", label: "Videos", icon: Film }
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => setFilter(tab.value as any)}
                                className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all ${filter === tab.value
                                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20"
                                    : "bg-white/5 text-white/60 hover:bg-white/10"
                                    }`}
                            >
                                <Icon size={18} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Projects Timeline */}
            <div className="max-w-6xl mx-auto space-y-6">
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-16 text-white/40">
                        No projects found
                    </div>
                ) : (
                    filteredProjects.map((project, index) => {
                        const StatusIcon = STATUS_CONFIG[project.status].icon;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl hover:border-pink-500/30 transition-all"
                            >
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Icon/Cover */}
                                    <div className="shrink-0">
                                        <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${project.type === "album"
                                            ? "from-pink-500 to-purple-500"
                                            : "from-cyan-500 to-blue-500"
                                            } flex items-center justify-center shadow-lg`}>
                                            {project.type === "album" ? (
                                                <Music size={40} className="text-white" />
                                            ) : (
                                                <Film size={40} className="text-white" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-4">
                                        {/* Header */}
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${STATUS_CONFIG[project.status].color} text-white flex items-center gap-1`}>
                                                        <StatusIcon size={12} />
                                                        {STATUS_CONFIG[project.status].label}
                                                    </span>
                                                </div>
                                                <p className="text-white/60">{project.description}</p>
                                            </div>
                                            {project.releaseDate && (
                                                <div className="flex items-center gap-2 text-sm text-white/40 shrink-0">
                                                    <Calendar size={16} />
                                                    {new Date(project.releaseDate).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            )}
                                        </div>

                                        {/* Progress Bar */}
                                        {project.status === "in_progress" && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-white/60">Progress</span>
                                                    <span className="font-semibold text-pink-400">{project.progress}%</span>
                                                </div>
                                                <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-lg shadow-pink-500/50"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${project.progress}%` }}
                                                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Metadata */}
                                        <div className="flex gap-4 text-xs text-white/40">
                                            <span className="uppercase tracking-wider">{project.type}</span>
                                            <span>•</span>
                                            <span>Started {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            {/* Call to Action - Only for Guests/Fans */}
            {(!user || (user as any).publicMetadata?.tier === 'FAN') && (
                <div className="max-w-6xl mx-auto mt-16 text-center">
                    <div className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20">
                        <h3 className="text-2xl font-bold mb-4">Want to stay updated?</h3>
                        <p className="text-white/60 mb-6">
                            Join the club to get exclusive behind-the-scenes access and early releases
                        </p>
                        <a
                            href="/club"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-full font-bold text-lg transition-all shadow-lg shadow-pink-500/20"
                        >
                            Join the Club
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
