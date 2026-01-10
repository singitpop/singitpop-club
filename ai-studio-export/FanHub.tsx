import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Artist, FanClubTier, FanClubMember, FanPost, PromoCode, CommissionSettings, SongCommission, Product, FanClubSettings, FanComment, FanClubTerms, AIPersona, BrandBrainMessage, Release, Track, Badge, CommunityEvent, FanMilestone } from '../types';
import { generateFanPost, generateLowStockPost, generatePlaylistChallengePost, generateLyricArt } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { MoneyIcon } from './icons/MoneyIcon';
import { TicketIcon } from './icons/TicketIcon';
import { CreatePromoCodeModal } from './CreatePromoCodeModal';
import { QuillPenIcon } from './icons/QuillPenIcon';
import { PlaylistIcon } from './icons/PlaylistIcon';
import { FanClubSetup } from './FanClubSetup';
import { PencilSwooshIcon } from './icons/PencilSwooshIcon';
import { ClockIcon } from './icons/ClockIcon';
import { SendIcon } from './icons/SendIcon';
import { TrophyIcon } from './icons/TrophyIcon';
import { StarIcon } from './icons/StarIcon';
import { CrownIcon } from './icons/CrownIcon';
import { HeartIcon } from './icons/HeartIcon';
import { PresentationChartBarIcon } from './icons/PresentationChartBarIcon';
import { VideoCameraIcon } from './icons/VideoCameraIcon';

interface FanHubProps {
    artist: Artist;
    releases: Release[];
    persona: AIPersona;
    tiers: FanClubTier[];
    members: FanClubMember[];
    posts: FanPost[];
    promoCodes: PromoCode[];
    commissionSettings: CommissionSettings;
    commissions: SongCommission[];
    allProducts: Product[];
    settings: FanClubSettings;
    fanClubTerms: FanClubTerms;
    onAddPost: (post: Omit<FanPost, 'id' | 'comments'>) => void;
    onAddPromoCode: (code: Omit<PromoCode, 'id'>) => void;
    onUpdateCommissionSettings: (settings: CommissionSettings) => void;
    onUpdateCommissionStatus: (commissionId: number, status: SongCommission['status']) => void;
    onUpdateSettings: (settings: FanClubSettings) => void;
    onAddComment: (postId: number, comment: Omit<FanComment, 'id'>) => void;
    onAgreeToTerms: () => void;
    onAddProduct: (releaseId: number, productData: Omit<Product, 'id'>) => void;
    allBadges: Badge[];
    communityEvents: CommunityEvent[];
    fanMilestones: FanMilestone[];
}

type Tab = 'dashboard' | 'posts' | 'members' | 'leaderboard' | 'events' | 'commissions' | 'discounts' | 'settings';

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string; }) => (
    <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
        <div className="flex items-center gap-4">
            <div className="bg-dark-border p-3 rounded-full">{icon}</div>
            <div>
                <p className="text-3xl font-bold text-light-text">{value}</p>
                <p className="text-medium-text text-sm">{label}</p>
            </div>
        </div>
    </div>
);

const promoStatusColors: Record<PromoCode['status'], string> = {
    'active': 'bg-green-500/20 text-green-400',
    'inactive': 'bg-gray-500/20 text-gray-400',
    'expired': 'bg-red-500/20 text-red-400',
};

const commissionStatusColors: Record<SongCommission['status'], string> = {
    'Pending': 'bg-yellow-500/20 text-yellow-400',
    'Accepted': 'bg-blue-500/20 text-blue-400',
    'In Progress': 'bg-purple-500/20 text-purple-400',
    'Completed': 'bg-green-500/20 text-green-400',
    'Rejected': 'bg-red-500/20 text-red-400',
};

const CommentsSection = ({ comments, onAddComment }: { comments: FanComment[], onAddComment: (text: string) => void }) => {
    const [newComment, setNewComment] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };
    return (
        <div className="mt-4 pt-3 border-t border-dark-border/50">
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                {comments.map(c => (
                    <div key={c.id} className="flex items-start gap-2 text-xs">
                        <img src={c.authorAvatarUrl} alt={c.authorName} className="w-6 h-6 rounded-full" />
                        <div>
                            <span className="font-bold text-light-text">{c.authorName}</span>
                            <p className="text-medium-text">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
                 <input value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Write a comment..." className="w-full bg-dark-bg border-dark-border/50 border rounded-md p-1.5 text-xs" />
                 <button type="submit" className="text-xs bg-dark-border px-3 rounded-md">Post</button>
            </form>
        </div>
    );
};

// FIX: Add missing BadgeIcon component definition
// FIX: Changed component to be a React.FC with an explicit props interface to resolve a TypeScript error where the 'key' prop, used during mapping, was not recognized by the component's inline prop type definition.
interface BadgeIconProps {
    iconName: string;
    className: string;
}
const BadgeIcon: React.FC<BadgeIconProps> = ({ iconName, className }) => {
    switch (iconName) {
        case 'Trophy': return <TrophyIcon className={className} />;
        case 'Star': return <StarIcon className={className} filled />;
        case 'Crown': return <CrownIcon className={className} />;
        case 'Heart': return <HeartIcon className={className} filled />;
        case 'QuillPen': return <QuillPenIcon className={className} />;
        default: return null;
    }
};

// FIX: Add missing LeaderboardTab component definition
const LeaderboardTab = ({ members, allBadges }: { members: FanClubMember[], allBadges: Badge[] }) => {
    const sortedMembers = [...members].sort((a, b) => (b.leaderboardData?.engagementScore || 0) - (a.leaderboardData?.engagementScore || 0));
    
    return (
        <div className="space-y-4">
            {sortedMembers.map((member, index) => (
                <div key={member.id} className="bg-dark-bg border border-dark-border rounded-lg p-4 flex items-center gap-4">
                    <span className="font-bold text-lg w-8 text-center">{index + 1}</span>
                    <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full" />
                    <div className="flex-grow">
                        <p className="font-bold text-light-text">{member.name}</p>
                        <p className="text-sm text-brand-purple">{member.leaderboardData?.engagementScore} score</p>
                    </div>
                    <div className="flex gap-2">
                        {(member.badges || []).map(b => {
                            const badgeInfo = allBadges.find(ab => ab.id === b.badgeId);
                            return badgeInfo ? <BadgeIcon key={b.badgeId} iconName={badgeInfo.icon} className="w-6 h-6" /> : null;
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

// FIX: Add missing EventsTab component definition
const EventsTab = ({ events, onJoin }: { events: CommunityEvent[], onJoin: () => void }) => (
    <div className="space-y-4">
        {events.map(event => (
            <div key={event.id} className="bg-dark-bg p-4 rounded-lg border border-dark-border">
                <p className="font-semibold text-light-text">{event.title}</p>
                <p className="text-sm text-medium-text">{new Date(event.dateTime).toLocaleString()}</p>
                <button onClick={onJoin} className="text-sm font-bold text-brand-purple mt-2">Join Event &rarr;</button>
            </div>
        ))}
    </div>
);

// FIX: Add missing SettingsTab component definition
const SettingsTab = ({ settings, onUpdateSettings, tiers, persona }: { settings: FanClubSettings, onUpdateSettings: (s: FanClubSettings) => void, tiers: FanClubTier[], persona: AIPersona }) => (
    <div className="space-y-6">
        <div className="bg-dark-bg border border-dark-border p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <label htmlFor="moderation-toggle" className="font-semibold text-light-text">AI-Powered Comment Moderation</label>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="moderation-toggle" className="sr-only peer" checked={settings.aiModerationEnabled} onChange={(e) => onUpdateSettings({ ...settings, aiModerationEnabled: e.target.checked })} />
                    <div className="w-11 h-6 bg-dark-border rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-purple"></div>
                </label>
            </div>
            <p className="text-xs text-medium-text mt-1">Automatically hides comments containing spam or inappropriate content.</p>
        </div>
        <div>
            <h4 className="font-semibold text-light-text mb-2">Membership Tiers</h4>
            <div className="space-y-2">
                {tiers.map(tier => (
                    <div key={tier.id} className="bg-dark-bg p-3 rounded-md border border-dark-border">
                        <p className="font-bold">{tier.name} - ${(tier.price / 100).toFixed(2)}/month</p>
                        <ul className="list-disc list-inside text-xs text-medium-text">
                            {tier.perks.map(perk => <li key={perk}>{perk}</li>)}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// FIX: Add missing LiveQAModal component definition
const LiveQAModal = ({ artist, persona, onClose }: { artist: Artist, persona: AIPersona, onClose: () => void }) => {
    const chatRef = useRef<Chat | null>(null);
    const [messages, setMessages] = useState<BrandBrainMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: { systemInstruction: persona.systemPrompt },
                });
                setMessages([{ role: 'model', content: `Hey everyone, it's ${artist.name}! Thanks for joining the live Q&A. Ask me anything!` }]);
            } catch (error) {
                console.error("Failed to initialize Live Q&A:", error);
                setMessages([{ role: 'model', content: "Sorry, having some technical difficulties with the chat. We'll be right back!" }]);
            } finally {
                setIsLoading(false);
            }
        };
        initChat();
    }, [artist.name, persona.systemPrompt]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !chatRef.current || isLoading) return;

        const userMessage: BrandBrainMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chatRef.current.sendMessage({ message: userMessage.content });
            setMessages(prev => [...prev, { role: 'model', content: response.text }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', content: "Sorry, I missed that. Could you ask again?" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4" onClick={onClose}>
            <div className="bg-dark-card rounded-lg p-4 w-full max-w-2xl border border-dark-border flex flex-col h-[80vh] max-h-[600px]" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold text-light-text mb-4">Live Q&A with {artist.name}</h3>
                <div className="flex-grow overflow-y-auto pr-2 space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-dark-bg text-light-text'}`}>
                            {msg.content}
                            </div>
                        </div>
                    ))}
                     {isLoading && messages.length > 0 && (
                        <div className="flex justify-start">
                            <div className="bg-dark-bg text-light-text p-3 rounded-lg text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2 flex-shrink-0">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask a question..."
                        className="w-full bg-dark-bg border border-dark-border p-3 rounded-lg text-sm"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()} className="bg-brand-purple p-3 rounded-lg font-bold disabled:opacity-50">
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
};

// FIX: Add missing FanMilestoneMessageModal component definition
const FanMilestoneMessageModal = ({ milestone, fanName, onClose }: { milestone: FanMilestone, fanName: string, onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-dark-card rounded-lg p-6 w-full max-w-lg border border-dark-border" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-light-text">Message to {fanName}</h3>
            <p className="text-sm text-medium-text mt-1">For reaching the milestone: "{milestone.description}"</p>
            <div className="bg-dark-bg p-4 rounded-lg my-4 text-medium-text italic">
                "{milestone.message}"
            </div>
            <button onClick={onClose} className="w-full bg-brand-purple text-white font-bold py-2 rounded-lg">Close</button>
        </div>
    </div>
);


export const FanHub = (props: FanHubProps) => {
    const { artist, releases, persona, tiers, members, posts, promoCodes, commissionSettings, commissions, allProducts, settings, fanClubTerms, onAddPost, onAddPromoCode, onUpdateCommissionSettings, onUpdateCommissionStatus, onUpdateSettings, onAddComment, onAgreeToTerms, onAddProduct, allBadges, communityEvents, fanMilestones } = props;
    
    const [activeTab, setActiveTab] = useState<Tab>('dashboard');
    const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
    const [editableCommissionSettings, setEditableCommissionSettings] = useState(commissionSettings);
    
    const [isPostEditorOpen, setIsPostEditorOpen] = useState(false);
    const [isGeneratingPost, setIsGeneratingPost] = useState(false);
    const [editorPost, setEditorPost] = useState({ title: '', content: '', scheduledFor: '', tierIds: tiers.map(t => t.id) });

    // FIX: Add missing state variables for post generation
    const [postTopic, setPostTopic] = useState('');
    const [playlistChallengeTheme, setPlaylistChallengeTheme] = useState('');

    const [isCreatingCollectible, setIsCreatingCollectible] = useState(false);
    const [selectedReleaseForCollectible, setSelectedReleaseForCollectible] = useState<Release | null>(releases.length > 0 ? releases[0] : null);
    const [selectedTrackForCollectible, setSelectedTrackForCollectible] = useState<Track | null>(selectedReleaseForCollectible?.tracks[0] || null);
    const [selectedLyric, setSelectedLyric] = useState('');
    const [isGeneratingArt, setIsGeneratingArt] = useState(false);
    const [generatedArt, setGeneratedArt] = useState<string | null>(null);
    const [collectiblePrice, setCollectiblePrice] = useState('');
    const [collectibleStock, setCollectibleStock] = useState('');
    const [collectibleError, setCollectibleError] = useState('');

    const [isQaModalOpen, setIsQaModalOpen] = useState(false);
    const [milestoneMessage, setMilestoneMessage] = useState<FanMilestone | null>(null);

    useEffect(() => {
        if (selectedReleaseForCollectible) {
            const track = selectedReleaseForCollectible.tracks[0] || null;
            setSelectedTrackForCollectible(track);
            setSelectedLyric(track?.lyrics.split('\n')[0] || '');
        }
    }, [selectedReleaseForCollectible]);

    useEffect(() => {
        if (selectedTrackForCollectible) {
            setSelectedLyric(selectedTrackForCollectible.lyrics.split('\n')[0] || '');
        }
    }, [selectedTrackForCollectible]);

    const handleGenerateArt = async () => {
        if (!selectedTrackForCollectible || !selectedLyric) {
            setCollectibleError('Please select a track and lyric.');
            return;
        }
        setIsGeneratingArt(true);
        setCollectibleError('');
        setGeneratedArt(null);
        try {
            const artBase64 = await generateLyricArt(artist, selectedTrackForCollectible, selectedLyric);
            setGeneratedArt(`data:image/jpeg;base64,${artBase64}`);
        } catch (e: any) {
            setCollectibleError(e.message || 'Failed to generate art.');
        } finally {
            setIsGeneratingArt(false);
        }
    };

    const handleListCollectible = () => {
        const priceInCents = parseFloat(collectiblePrice) * 100;
        const stock = parseInt(collectibleStock);
        if (!generatedArt || !collectiblePrice || isNaN(priceInCents) || priceInCents <= 0 || !collectibleStock || isNaN(stock) || stock <= 0) {
            setCollectibleError('Please generate art and set a valid price and number of editions.');
            return;
        }

        const newProduct: Omit<Product, 'id'> = {
            releaseId: selectedReleaseForCollectible!.id,
            type: 'DigitalCollectible',
            name: `"${selectedLyric}" - Art`,
            price: priceInCents,
            description: `Limited edition AI-generated art for the lyric "${selectedLyric}" from the song "${selectedTrackForCollectible!.title}".`,
            imageUrl: generatedArt,
            stock: stock,
            status: 'Live',
            sourceLyric: selectedLyric,
            trackTitle: selectedTrackForCollectible!.title,
        };
        
        onAddProduct(selectedReleaseForCollectible!.id, newProduct);
        
        setIsCreatingCollectible(false);
        setGeneratedArt(null);
        setCollectiblePrice('');
        setCollectibleStock('');
        setCollectibleError('');
    };

    const digitalCollectibles = allProducts.filter(p => p.type === 'DigitalCollectible');

    const lowStockItems = allProducts.filter(p => p.stock && p.stock > 0 && p.stock < 10);

    const totalMembers = members.length;
    const mrr = tiers.reduce((total, tier) => {
        const memberCount = members.filter(m => m.tierId === tier.id).length;
        return total + (memberCount * tier.price);
    }, 0) / 100;
    
    const drafts = posts.filter(p => p.status === 'Draft').sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const scheduled = posts.filter(p => p.status === 'Scheduled').sort((a,b) => new Date(a.scheduledFor!).getTime() - new Date(b.scheduledFor!).getTime());
    const posted = posts.filter(p => p.status === 'Posted' && (!p.scheduledFor || new Date(p.scheduledFor) <= new Date())).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const handleAiGenerateContent = async (generator: () => Promise<{title: string, content: string}>) => {
        setIsGeneratingPost(true);
        try {
            const { title, content } = await generator();
            setEditorPost({ title, content, scheduledFor: '', tierIds: tiers.map(t => t.id) });
            setIsPostEditorOpen(true);
        } catch (error) { console.error(error); } 
        finally { setIsGeneratingPost(false); }
    };
    
    // FIX: Add missing handler function definition
    const handleGeneratePlaylistChallenge = () => {
        if (!playlistChallengeTheme.trim()) return;
        handleAiGenerateContent(() => generatePlaylistChallengePost(artist.name, playlistChallengeTheme));
    };

    // FIX: Add missing handler function definition
    const handleGenerateLowStockPost = (productName: string) => {
        handleAiGenerateContent(() => generateLowStockPost(artist, productName));
    };

    const handleAddCode = (code: Omit<PromoCode, 'id'>) => {
        onAddPromoCode(code);
        setIsPromoModalOpen(false);
    };

    const handleCommissionSettingsChange = (field: keyof CommissionSettings, value: boolean | number) => {
        const newSettings = { ...editableCommissionSettings, [field]: value };
        setEditableCommissionSettings(newSettings);
        onUpdateCommissionSettings(newSettings);
    };
    
    const closeAndResetEditor = () => {
        setIsPostEditorOpen(false);
        setEditorPost({ title: '', content: '', scheduledFor: '', tierIds: tiers.map(t => t.id) });
    };

    const handleSavePost = (status: 'Draft' | 'Scheduled' | 'Posted') => {
        const postData = {
            ...editorPost,
            createdAt: new Date().toISOString(),
            status,
            scheduledFor: status === 'Scheduled' ? new Date(editorPost.scheduledFor).toISOString() : undefined
        };
        onAddPost(postData);
        closeAndResetEditor();
    };

    if (!fanClubTerms.hasAgreed) {
        return <FanClubSetup onAgree={onAgreeToTerms} />;
    }

    const renderTabContent = () => {
        switch(activeTab) {
            case 'leaderboard':
                return <LeaderboardTab members={members} allBadges={allBadges} />;
            case 'events':
                return <EventsTab events={communityEvents} onJoin={() => setIsQaModalOpen(true)} />;
            case 'settings':
                return <SettingsTab 
                    settings={settings}
                    onUpdateSettings={onUpdateSettings}
                    tiers={tiers}
                    persona={persona}
                />;
            // ...other cases...
            default:
                return (
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <StatCard icon={<UsersIcon className="w-6 h-6 text-brand-purple" />} label="Total Subscribers" value={totalMembers.toString()} />
                                <StatCard icon={<MoneyIcon className="w-6 h-6 text-brand-purple" />} label="Estimated MRR" value={`$${mrr.toFixed(2)}`} />
                            </div>
                            <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                                <h3 className="text-xl font-bold text-light-text">Community Events</h3>
                                {communityEvents.length > 0 ? (
                                    communityEvents.map(event => (
                                        <div key={event.id} className="bg-dark-bg p-3 rounded-lg border border-dark-border">
                                            <p className="font-semibold text-light-text">{event.title}</p>
                                            <p className="text-sm text-medium-text">Live on: {new Date(event.dateTime).toLocaleString()}</p>
                                            <button onClick={() => setIsQaModalOpen(true)} className="text-sm font-bold text-brand-purple mt-2">Join Event &rarr;</button>
                                        </div>
                                    ))
                                ) : <p className="text-sm text-center text-medium-text py-4">No upcoming events.</p>}
                            </div>
                            <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                                <h3 className="text-xl font-bold text-light-text">Recent Fan Milestones</h3>
                                {fanMilestones.length > 0 ? (
                                    fanMilestones.map(milestone => {
                                        const fan = members.find(m => m.id === milestone.fanId);
                                        return (
                                            <div key={milestone.id} className="bg-dark-bg p-3 rounded-lg border border-dark-border flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-light-text">{fan?.name || 'A fan'}</p>
                                                    <p className="text-sm text-medium-text">{milestone.description}</p>
                                                </div>
                                                <button onClick={() => setMilestoneMessage(milestone)} className="text-sm bg-dark-border px-3 py-1.5 rounded-md text-medium-text hover:text-light-text">View Message</button>
                                            </div>
                                        )
                                    })
                                ) : <p className="text-sm text-center text-medium-text py-4">No recent milestones.</p>}
                            </div>
                        </div>
                        {/* Right Column */}
                        <div className="space-y-6">
                           {/* Post Generator */}
                           <div className="bg-dark-card border border-dark-border rounded-lg p-6 space-y-4">
                               <h3 className="text-xl font-bold text-light-text">Content Ideas</h3>
                                <div className="space-y-3 bg-dark-bg p-4 rounded-lg border border-dark-border">
                                    <label className="text-sm text-medium-text font-semibold flex items-center gap-2"><PlaylistIcon className="w-5 h-5"/> Playlist Challenge</label>
                                    <input type="text" value={playlistChallengeTheme} onChange={(e) => setPlaylistChallengeTheme(e.target.value)} placeholder="e.g., Songs for a rainy day" className="w-full bg-dark-card border border-dark-border rounded-lg p-2" />
                                    <button onClick={handleGeneratePlaylistChallenge} disabled={isGeneratingPost} className="w-full bg-dark-border font-bold py-2 rounded-lg flex items-center justify-center text-sm disabled:opacity-50"><SparklesIcon className="w-4 h-4 mr-2"/> Post Challenge</button>
                                </div>
                                <div className="space-y-3 bg-dark-bg p-4 rounded-lg border border-dark-border">
                                    <label className="text-sm text-medium-text font-semibold">General Post</label>
                                    <input type="text" value={postTopic} onChange={(e) => setPostTopic(e.target.value)} placeholder="e.g., The gear I used on my new single" className="w-full bg-dark-card border border-dark-border rounded-lg p-2" />
                                    <button onClick={() => handleAiGenerateContent(() => generateFanPost(artist, postTopic))} disabled={isGeneratingPost} className="w-full bg-brand-purple font-bold py-2 rounded-lg flex items-center justify-center text-sm disabled:opacity-50"><SparklesIcon className="w-4 h-4 mr-2"/> Generate Post</button>
                                </div>
                           </div>
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
            {isPromoModalOpen && <CreatePromoCodeModal onClose={() => setIsPromoModalOpen(false)} onAddCode={handleAddCode} />}
            {isQaModalOpen && <LiveQAModal artist={artist} persona={persona} onClose={() => setIsQaModalOpen(false)} />}
            {milestoneMessage && <FanMilestoneMessageModal milestone={milestoneMessage} fanName={members.find(m => m.id === milestoneMessage.fanId)?.name || 'Fan'} onClose={() => setMilestoneMessage(null)} />}
            {isPostEditorOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={closeAndResetEditor}>
                    <div className="bg-dark-card rounded-lg p-6 w-full max-w-2xl border border-dark-border flex flex-col gap-4" onClick={e => e.stopPropagation()}>
                        <h3 className="text-xl font-bold">New Fan Club Post</h3>
                        <input type="text" placeholder="Post Title" value={editorPost.title} onChange={e => setEditorPost(p => ({...p, title: e.target.value}))} className="w-full bg-dark-bg p-2 rounded-md" />
                        <textarea rows={8} placeholder="Post content (Markdown supported)" value={editorPost.content} onChange={e => setEditorPost(p => ({...p, content: e.target.value}))} className="w-full bg-dark-bg p-2 rounded-md" />
                        <div className="flex justify-between items-center">
                            <div>
                                <label className="text-sm text-medium-text">Schedule for later (optional)</label>
                                <input type="datetime-local" value={editorPost.scheduledFor} onChange={e => setEditorPost(p => ({...p, scheduledFor: e.target.value}))} className="bg-dark-bg p-2 rounded-md text-sm ml-2"/>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleSavePost('Draft')} className="bg-dark-border font-bold py-2 px-4 rounded-lg text-sm">Save Draft</button>
                                <button onClick={() => handleSavePost(editorPost.scheduledFor ? 'Scheduled' : 'Posted')} className="bg-brand-purple font-bold py-2 px-4 rounded-lg text-sm">{editorPost.scheduledFor ? 'Schedule' : 'Post Now'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="p-4 md:p-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-light-text">Fan Hub</h1>
                    <p className="text-medium-text">Engage your community and build your career.</p>
                </div>

                <div className="border-b border-dark-border">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {(['dashboard', 'posts', 'members', 'leaderboard', 'events', 'commissions', 'discounts', 'settings'] as Tab[]).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${activeTab === tab ? 'bg-brand-purple text-white' : 'text-medium-text hover:bg-dark-border'}`}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    {renderTabContent()}
                </div>
            </div>
        </>
    );
};