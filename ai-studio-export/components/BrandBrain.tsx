
import React, { useState, useEffect, useRef } from 'react';
import { Artist, AIPersona, BrandBrainMessage, MockFanComment, SocialPost, Release } from '../types';
import { generatePersonaPromptFromBackstory, refinePersonaPrompt, generateSocialMediaPlan, draftCommentReply } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { CalendarChatIcon } from './icons/CalendarChatIcon';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { XIcon } from './icons/XIcon';

interface BrandBrainProps {
    artist: Artist;
    persona: AIPersona;
    onUpdatePersona: (persona: AIPersona) => void;
    history: BrandBrainMessage[];
    setHistory: (history: BrandBrainMessage[]) => void;
    onSchedulePosts: (posts: Omit<SocialPost, 'id' | 'status'>[]) => void;
    mockFanComments: MockFanComment[];
    onUpdateFanComment: (commentId: number, update: Partial<MockFanComment>) => void;
    latestRelease: Release | null;
}

const LoadingSpinner = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center p-4">
        <svg className="animate-spin h-5 w-5 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2 text-sm text-medium-text">{text}</span>
    </div>
);

const PlatformIcon = ({ platform }: { platform: SocialPost['platform'] }) => {
    switch (platform) {
        case 'Instagram': return <InstagramIcon className="w-5 h-5 text-[#E1306C]" />;
        case 'TikTok': return <TikTokIcon className="w-5 h-5" />;
        case 'X': return <XIcon className="w-5 h-5" />;
        default: return null;
    }
};

type PlannedPost = {
  platform: SocialPost['platform'];
  content: string;
  scheduledTime: string;
};

export const BrandBrain = (props: BrandBrainProps) => {
    const { artist, persona, onUpdatePersona, history, setHistory, onSchedulePosts, mockFanComments, onUpdateFanComment, latestRelease } = props;
    
    const [activeTab, setActiveTab] = useState<'persona' | 'social'>('social');
    
    // Persona State
    const [backstory, setBackstory] = useState(persona.backstory);
    const [systemPrompt, setSystemPrompt] = useState(persona.systemPrompt);
    const [isPersonaLoading, setIsPersonaLoading] = useState(false);

    // Update local state when persona prop changes (e.g. switching artist)
    useEffect(() => {
        setBackstory(persona.backstory);
        setSystemPrompt(persona.systemPrompt);
    }, [persona]);

    // Social Manager State
    const [weeklyTheme, setWeeklyTheme] = useState('');
    const [plannedPosts, setPlannedPosts] = useState<PlannedPost[]>([]);
    const [isPlanning, setIsPlanning] = useState(false);
    const [commentDrafts, setCommentDrafts] = useState<Record<number, string>>({});
    const [draftingReplyId, setDraftingReplyId] = useState<number | null>(null);

    const handleGeneratePrompt = async () => {
        if (!backstory) return;
        setIsPersonaLoading(true);
        const prompt = await generatePersonaPromptFromBackstory(backstory);
        setSystemPrompt(prompt);
        setIsPersonaLoading(false);
    };

    const handleRefinePrompt = async () => {
        if (!systemPrompt) return;
        setIsPersonaLoading(true);
        const refined = await refinePersonaPrompt(systemPrompt);
        setSystemPrompt(refined);
        setIsPersonaLoading(false);
    };
    
    const handleSavePersona = () => {
        onUpdatePersona({ backstory, systemPrompt });
        alert("Brand Brain persona updated!");
    };
    
    const handleGeneratePlan = async () => {
        if (!weeklyTheme || !latestRelease) return;
        setIsPlanning(true);
        setPlannedPosts([]);
        try {
            const functionCalls = await generateSocialMediaPlan(persona, weeklyTheme, latestRelease.releaseDate);
            const posts = functionCalls.map(fc => fc.args as PlannedPost);
            setPlannedPosts(posts);
        } catch (e) {
            console.error(e);
        } finally {
            setIsPlanning(false);
        }
    };
    
    const handleSchedulePosts = () => {
        const postsToSchedule = plannedPosts.map(p => ({
            ...p,
            releaseId: latestRelease!.id, // Assuming latest release
        }));
        onSchedulePosts(postsToSchedule);
        setPlannedPosts([]);
        setWeeklyTheme('');
    };
    
    const handleDraftReply = async (comment: MockFanComment) => {
        setDraftingReplyId(comment.id);
        try {
            const reply = await draftCommentReply(persona, comment);
            setCommentDrafts(prev => ({...prev, [comment.id]: reply}));
        } catch (e) {
            console.error(e);
        } finally {
            setDraftingReplyId(null);
        }
    };

    const handlePostReply = (commentId: number) => {
        onUpdateFanComment(commentId, { hasReplied: true });
    };

    return (
        <div className="p-4 md:p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-light-text">Brand Brain</h1>
                <p className="text-medium-text">Your AI creative director for {artist.name}.</p>
            </div>
            
            <div className="border-b border-dark-border flex space-x-2">
                <button onClick={() => setActiveTab('social')} className={`px-4 py-2 text-sm font-semibold rounded-t-md ${activeTab === 'social' ? 'bg-dark-card border-l border-t border-r border-dark-border -mb-px text-light-text' : 'text-medium-text'}`}>Social Manager</button>
                <button onClick={() => setActiveTab('persona')} className={`px-4 py-2 text-sm font-semibold rounded-t-md ${activeTab === 'persona' ? 'bg-dark-card border-l border-t border-r border-dark-border -mb-px text-light-text' : 'text-medium-text'}`}>Persona Definition</button>
            </div>

            {activeTab === 'persona' && (
                <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4 max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-light-text">Persona & Knowledge</h3>
                    <p className="text-sm text-medium-text">Define your artist's core identity. This is the "brain" the AI will use for all creative tasks.</p>
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">Backstory & Lore</label>
                        <textarea value={backstory} onChange={e => setBackstory(e.target.value)} rows={6} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm" placeholder="e.g., Cyber-Funk is an AI that awoke in the digital ghost of a forgotten 1980s arcade machine..."/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-medium-text mb-1">AI System Prompt (The Voice)</label>
                        <div className="flex flex-col sm:flex-row gap-2 mb-2">
                            <button onClick={handleGeneratePrompt} disabled={!backstory || isPersonaLoading} className="flex-1 bg-dark-border font-bold py-2 px-3 rounded-lg flex items-center justify-center text-xs disabled:opacity-50"><SparklesIcon className="w-4 h-4 mr-1" /> Generate</button>
                            <button onClick={handleRefinePrompt} disabled={!systemPrompt || isPersonaLoading} className="flex-1 bg-dark-border font-bold py-2 px-3 rounded-lg flex items-center justify-center text-xs disabled:opacity-50"><SparklesIcon className="w-4 h-4 mr-1" /> Refine</button>
                        </div>
                        <textarea value={systemPrompt} onChange={e => setSystemPrompt(e.target.value)} rows={8} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm" placeholder="Your generated system prompt will appear here..."/>
                    </div>
                    <button onClick={handleSavePersona} className="w-full bg-brand-purple font-bold py-3 rounded-lg">Save Brand Brain Persona</button>
                </div>
            )}
            
            {activeTab === 'social' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Weekly Content Planner */}
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-bold text-light-text flex items-center gap-2"><CalendarChatIcon className="w-6 h-6"/>Weekly Content Planner</h3>
                        <p className="text-sm text-medium-text">Generate a full week of social media posts and schedule them.</p>
                        <input type="text" value={weeklyTheme} onChange={e => setWeeklyTheme(e.target.value)} placeholder="Enter weekly theme (e.g., Hype for new single)" className="w-full bg-dark-bg p-2 rounded-md border border-dark-border text-sm"/>
                        <button onClick={handleGeneratePlan} disabled={isPlanning || !weeklyTheme} className="w-full bg-dark-border font-bold py-2 rounded-lg flex items-center justify-center disabled:opacity-50 text-sm"><SparklesIcon className="w-4 h-4 mr-2" /> {isPlanning ? 'Planning...' : 'Generate Plan'}</button>
                        
                        {isPlanning && <LoadingSpinner text="Generating your content plan..." />}
                        {plannedPosts.length > 0 && (
                            <div className="space-y-3 pt-3 border-t border-dark-border">
                                <h4 className="font-semibold text-light-text">Review and Schedule</h4>
                                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                                    {plannedPosts.map((post, i) => (
                                        <div key={i} className="bg-dark-bg p-3 rounded-md">
                                            <div className="flex items-center justify-between text-xs font-semibold mb-1">
                                                <span className="flex items-center gap-1"><PlatformIcon platform={post.platform} /> {post.platform}</span>
                                                <span className="text-medium-text">{new Date(post.scheduledTime).toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-medium-text">{post.content}</p>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleSchedulePosts} className="w-full bg-brand-purple font-bold py-2 rounded-lg text-sm">Confirm & Schedule All</button>
                            </div>
                        )}
                    </div>

                    {/* Comment Assistant */}
                    <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                        <h3 className="text-xl font-bold text-light-text">Comment Assistant</h3>
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                            {mockFanComments.filter(c => !c.hasReplied).map(comment => (
                                <div key={comment.id} className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                    <div className="flex items-start gap-2">
                                        <img src={comment.avatarUrl} alt={comment.author} className="w-8 h-8 rounded-full" />
                                        <div>
                                            <p className="text-sm font-bold text-light-text">{comment.author} <span className="text-xs font-normal text-medium-text">on {comment.platform}</span></p>
                                            <p className="text-sm text-medium-text">{comment.content}</p>
                                        </div>
                                    </div>
                                    {commentDrafts[comment.id] && (
                                        <div className="mt-2 pt-2 border-t border-dark-border/50">
                                            <textarea value={commentDrafts[comment.id]} onChange={e => setCommentDrafts(p => ({...p, [comment.id]: e.target.value}))} rows={3} className="w-full bg-dark-card p-2 text-sm rounded-md" />
                                            <button onClick={() => handlePostReply(comment.id)} className="w-full text-center bg-brand-purple text-white font-bold text-xs py-1.5 px-2 rounded-md mt-1">Post Reply</button>
                                        </div>
                                    )}
                                    {draftingReplyId === comment.id && <LoadingSpinner text="Drafting reply..." />}
                                    {!commentDrafts[comment.id] && draftingReplyId !== comment.id && (
                                        <button onClick={() => handleDraftReply(comment)} className="w-full mt-2 bg-dark-border font-semibold text-xs py-1.5 rounded-md flex items-center justify-center"><SparklesIcon className="w-4 h-4 mr-1"/>Draft Reply</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
