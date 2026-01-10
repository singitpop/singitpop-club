

import React, { useState, useEffect } from 'react';
import { Artist, View, KnowledgeGraphData, KnowledgeGraphInsights, Release, Collaborator } from '../types';
import { generateKnowledgeGraph, generateKnowledgeGraphInsights } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface ArtistKnowledgeGraphProps {
    artist: Artist;
    releases: Release[];
    collaborators: Collaborator[];
    setView: (view: View) => void;
}

const nodeColors = {
    artist: 'fill-brand-purple stroke-brand-purple-light',
    release: 'fill-blue-500 stroke-blue-400',
    genre: 'fill-green-500 stroke-green-400',
    collaborator: 'fill-yellow-500 stroke-yellow-400',
    mood: 'fill-gray-600 stroke-gray-500',
    similar_artist: 'fill-gray-600 stroke-gray-500',
    audience: 'fill-gray-600 stroke-gray-500',
};

const nodeRadii = {
    artist: 25,
    release: 20,
    genre: 20,
    collaborator: 20,
    mood: 15,
    similar_artist: 15,
    audience: 15,
};

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg min-h-[500px]">
        <svg className="animate-spin h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Building Knowledge Graph...</h3>
        <p className="text-medium-text mt-1">Mapping connections and generating AI insights...</p>
    </div>
);

export const ArtistKnowledgeGraph = ({ artist, releases, collaborators, setView }: ArtistKnowledgeGraphProps) => {
    const [graphData, setGraphData] = useState<KnowledgeGraphData | null>(null);
    const [insights, setInsights] = useState<KnowledgeGraphInsights | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const graph = await generateKnowledgeGraph(artist, releases, collaborators);
                setGraphData(graph);
                const aiInsights = await generateKnowledgeGraphInsights(graph, artist);
                setInsights(aiInsights);
            } catch (err: any) {
                setError(err.message || 'Failed to build knowledge graph.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [artist, releases, collaborators]);

    return (
        <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
            <button onClick={() => setView('dashboard')} className="text-medium-text hover:text-light-text">&larr; Back to Dashboard</button>
            <div className="text-center">
                <h1 className="text-3xl font-bold text-light-text">Artist Knowledge Graph</h1>
                <p className="text-medium-text mt-1">A visual map of your artistic ecosystem for <span className="text-light-text font-semibold">{artist.name}</span>.</p>
            </div>

            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center">{error}</p>}
            {isLoading && <LoadingState />}
            
            {graphData && insights && !isLoading && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-dark-card border border-dark-border rounded-lg p-4">
                        <svg viewBox="0 0 1000 500" className="w-full h-auto">
                            <defs>
                                <style>{`
                                    .graph-node-group { cursor: pointer; }
                                    .graph-node-group .graph-node { transition: transform 0.2s ease-out; }
                                    .graph-node-group:hover .graph-node { transform: scale(1.1); }
                                    .graph-node-group:hover .graph-label { font-weight: bold; }
                                `}</style>
                            </defs>
                            {graphData.edges.map((edge, i) => {
                                const sourceNode = graphData.nodes.find(n => n.id === edge.source);
                                const targetNode = graphData.nodes.find(n => n.id === edge.target);
                                if (!sourceNode || !targetNode) return null;
                                return (
                                    <line key={i} x1={sourceNode.x} y1={sourceNode.y} x2={targetNode.x} y2={targetNode.y} stroke="#374151" strokeWidth="1.5" />
                                );
                            })}
                            {graphData.nodes.map(node => (
                                <g key={node.id} className="graph-node-group">
                                    <circle
                                        className={`graph-node ${nodeColors[node.type]}`}
                                        cx={node.x}
                                        cy={node.y}
                                        r={nodeRadii[node.type]}
                                        strokeWidth="2"
                                    />
                                    <text
                                        className="graph-label"
                                        x={node.x}
                                        y={node.y + nodeRadii[node.type] + 15}
                                        textAnchor="middle"
                                        fill="#E0E0E0"
                                        fontSize="12"
                                    >
                                        {node.label}
                                    </text>
                                </g>
                            ))}
                        </svg>
                    </div>
                    <div className="lg:col-span-1 space-y-4">
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-light-text mb-2 flex items-center gap-2">
                                <SparklesIcon className="w-6 h-6 text-brand-purple" />
                                AI Insights
                            </h3>
                            <p className="text-sm text-medium-text">{insights.summary}</p>
                        </div>
                        <div className="bg-dark-card border border-dark-border rounded-lg p-6">
                            <h3 className="text-xl font-bold text-light-text mb-3">Recommendations</h3>
                            <ul className="list-disc list-inside text-sm text-medium-text space-y-2">
                                {insights.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};