"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Music, Film } from "lucide-react";

interface Project {
    id: string;
    type: "album" | "video";
    title: string;
    description: string;
    status: "in_progress" | "completed" | "planned";
    progress: number;
    releaseDate?: string;
    createdAt: string;
}

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/projects');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error("Failed to load projects", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!formData.title) return alert("Title is required");

        let updatedProjects = [...projects];

        if (editingId === 'new') {
            const newProject: Project = {
                id: crypto.randomUUID(),
                type: formData.type || 'album',
                title: formData.title,
                description: formData.description || '',
                status: formData.status || 'planned',
                progress: formData.progress || 0,
                releaseDate: formData.releaseDate,
                createdAt: new Date().toISOString()
            };
            updatedProjects.push(newProject);
        } else {
            updatedProjects = projects.map(p =>
                p.id === editingId ? { ...p, ...formData } as Project : p
            );
        }

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProjects)
            });

            if (res.ok) {
                setProjects(updatedProjects);
                setEditingId(null);
                setFormData({});
            } else {
                alert("Failed to save");
            }
        } catch (error) {
            console.error("Error saving", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this project?')) return;

        const updatedProjects = projects.filter(p => p.id !== id);

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProjects)
            });

            if (res.ok) {
                setProjects(updatedProjects);
            }
        } catch (error) {
            console.error("Error deleting", error);
        }
    };

    if (isLoading) return <div className="p-8 text-white">Loading projects...</div>;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Manage Projects</h1>
                    <button
                        onClick={() => {
                            setEditingId('new');
                            setFormData({ type: 'album', status: 'planned', progress: 0 });
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full font-semibold flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Project
                    </button>
                </div>

                {/* Edit Form */}
                {editingId && (
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20">
                        <h3 className="text-2xl font-bold mb-6">{editingId === 'new' ? 'New Project' : 'Edit Project'}</h3>
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Type</label>
                                    <select
                                        value={formData.type || 'album'}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                    >
                                        <option value="album">Album</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Status</label>
                                    <select
                                        value={formData.status || 'planned'}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                    >
                                        <option value="planned">Planned</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title || ''}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                    placeholder="Project title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    value={formData.description || ''}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white resize-none"
                                    rows={3}
                                    placeholder="Brief description"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Progress (%)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={formData.progress || 0}
                                        onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Release Date</label>
                                    <input
                                        type="date"
                                        value={formData.releaseDate || ''}
                                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold flex items-center gap-2"
                                >
                                    <Save size={18} />
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({});
                                    }}
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold flex items-center gap-2"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects List */}
                <div className="space-y-4">
                    {projects.length === 0 ? (
                        <div className="text-center py-16 text-white/40">
                            No projects yet. Click "Add Project" to create one.
                        </div>
                    ) : (
                        projects.map(project => (
                            <div key={project.id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${project.type === 'album' ? 'from-pink-500 to-purple-500' : 'from-cyan-500 to-blue-500'
                                        }`}>
                                        {project.type === 'album' ? <Music size={24} /> : <Film size={24} />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{project.title}</h3>
                                        <p className="text-sm text-white/60">{project.description}</p>
                                        <div className="flex gap-3 mt-2 text-xs text-white/40">
                                            <span className="uppercase">{project.status.replace('_', ' ')}</span>
                                            <span>•</span>
                                            <span>{project.progress}% Complete</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingId(project.id);
                                            setFormData(project);
                                        }}
                                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
