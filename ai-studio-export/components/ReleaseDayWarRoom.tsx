
import React, { useState, useEffect } from 'react';
import { Release, View, WarRoomChecklist } from '../types';
import { generateReleaseDayPlan, draftCommentReply } from '../services/geminiService';
import { FireIcon } from './icons/FireIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { UsersIcon } from './icons/UsersIcon';
import { MusicIcon } from './icons/MusicIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ReleaseDayWarRoomProps {
    release: Release;
    setView: (view: View) => void;
}

const LoadingState = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-dark-card border border-dark-border rounded-lg h-full">
        <svg className="animate-spin h-10 w-10 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Initializing War Room...</h3>
    </div>
);

export const ReleaseDayWarRoom = ({ release, setView }: ReleaseDayWarRoomProps) => {
    const [checklist, setChecklist] = useState<WarRoomChecklist>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [streamCount, setStreamCount] = useState(0);
    const [socialMentions, setSocialMentions] = useState(0);
    const [activeComment, setActiveComment] = useState<string | null>(null);
    const [replyDraft, setReplyDraft] = useState('');

    // Mock comments for "Social Triage"
    const [comments, setComments] = useState([
        { id: 1, user: '@fan_1', text: 'This track is FIRE! 🔥', platform: 'Instagram' },
        { id: 2, user: '@indie_blog', text: 'Just added to our rotation. Great work.', platform: 'X' },
        { id: 3, user: '@superfan99', text: 'Been waiting for this all year!', platform: 'TikTok' },
    ]);

    useEffect(() => {
        const init = async () => {
            try {
                const plan = await generateReleaseDayPlan(release.type);
                setChecklist(plan);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        init();

        // Simulate live stats
        const interval = setInterval(() => {
            setStreamCount(prev => prev + Math.floor(Math.random() * 10));
            setSocialMentions(prev => prev + (Math.random() > 0.7 ? 1 : 0));
        }, 2000);

        return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleTask = (index: number) => {
        const newChecklist = [...checklist];
        newChecklist[index].status = newChecklist[index].status === 'done' ? 'pending' : 'done';
        setChecklist(newChecklist);
    };

    const handleDraftReply = async (commentText: string) => {
        setReplyDraft('Drafting...');
        // Mocking AIPersona for simplicity in this specialized view, or fetch real one if needed
        const mockPersona = { backstory: 'Cool artist', systemPrompt: 'You are a cool artist. Reply gratefully.' };
        const mockComment = { id: 0, platform: 'Instagram' as const, author: 'Fan', avatarUrl: '', content: commentText, hasReplied: false };
        
        const reply = await draftCommentReply(mockPersona, mockComment);
        setReplyDraft(reply);
    };

    const handleSendReply = (id: number) => {
        setComments(prev => prev.filter(c => c.id !== id));
        setActiveComment(null);
        setReplyDraft('');
    };

    if (isLoading) return <LoadingState />;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-light-text font-sans p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8 border-b border-red-900/30 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500/20 p-3 rounded-full animate-pulse">
                            <FireIcon className="w-8 h-8 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">WAR ROOM</h1>
                            <p className="text-red-400 font-mono text-sm uppercase tracking-widest">Live Operations: {release.title}</p>
                        </div>
                    </div>
                    <button onClick={() => setView('release-details')} className="text-gray-500 hover:text-white font-mono text-sm">EXIT</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Live Stats */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#121212] border border-gray-800 rounded-lg p-6">
                            <h3 className="text-gray-400 font-mono text-xs uppercase mb-4">Real-Time Metrics</h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                                        <MusicIcon className="w-4 h-4" /> Streams
                                    </div>
                                    <p className="text-5xl font-black text-white">{streamCount.toLocaleString()}</p>
                                    <p className="text-green-500 text-xs font-mono mt-1">+{(streamCount * 0.1).toFixed(0)}/hr</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 text-gray-300 mb-1">
                                        <UsersIcon className="w-4 h-4" /> Social Mentions
                                    </div>
                                    <p className="text-4xl font-bold text-white">{socialMentions}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#121212] border border-gray-800 rounded-lg p-6">
                            <h3 className="text-gray-400 font-mono text-xs uppercase mb-4">Social Triage</h3>
                            <div className="space-y-3">
                                {comments.length === 0 && <p className="text-gray-500 italic text-sm">All quiet on the front.</p>}
                                {comments.map(comment => (
                                    <div key={comment.id} className="bg-[#1a1a1a] p-3 rounded border border-gray-800">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>{comment.platform}</span>
                                            <span>{comment.user}</span>
                                        </div>
                                        <p className="text-sm mb-3">{comment.text}</p>
                                        {activeComment === comment.text ? (
                                            <div className="space-y-2">
                                                <textarea 
                                                    value={replyDraft} 
                                                    onChange={(e) => setReplyDraft(e.target.value)} 
                                                    className="w-full bg-black border border-gray-700 p-2 text-sm text-white rounded"
                                                    rows={3}
                                                />
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleSendReply(comment.id)} className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded">SEND</button>
                                                    <button onClick={() => setActiveComment(null)} className="text-gray-500 text-xs px-2">Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button onClick={() => { setActiveComment(comment.text); handleDraftReply(comment.text); }} className="text-xs text-brand-purple flex items-center gap-1 hover:text-white">
                                                <SparklesIcon className="w-3 h-3" /> AI Reply
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Column 2 & 3: Battle Plan */}
                    <div className="lg:col-span-2 bg-[#121212] border border-gray-800 rounded-lg p-6 flex flex-col">
                        <h3 className="text-gray-400 font-mono text-xs uppercase mb-6">Hourly Battle Plan</h3>
                        <div className="flex-grow space-y-2 overflow-y-auto max-h-[600px] pr-2">
                            {checklist.map((item, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => toggleTask(index)}
                                    className={`flex items-center gap-4 p-4 rounded border transition-all cursor-pointer ${
                                        item.status === 'done' 
                                            ? 'bg-[#0f1f0f] border-green-900/30 opacity-50' 
                                            : 'bg-[#1a1a1a] border-gray-800 hover:border-gray-600'
                                    }`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                        item.status === 'done' ? 'border-green-500 bg-green-500/20' : 'border-gray-600'
                                    }`}>
                                        {item.status === 'done' && <CheckCircleIcon className="w-4 h-4 text-green-500" />}
                                    </div>
                                    <div className="font-mono text-brand-purple w-20 flex-shrink-0">{item.time}</div>
                                    <div className={`text-sm ${item.status === 'done' ? 'line-through text-gray-500' : 'text-white'}`}>
                                        {item.task}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
