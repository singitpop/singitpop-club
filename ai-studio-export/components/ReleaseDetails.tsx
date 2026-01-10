
import React, { useState, useEffect, useRef } from 'react';
import { Release, Track, View, EditableReleaseDetails, Playlist, SocialPost, EditableTrackDetails, PlanName, TeamMember, Task, AssetCategory, AssetFile, Artist, Collaborator } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { PlayIcon } from './icons/PlayIcon';
import { PencilIcon } from './icons/PencilIcon';
import { AddToPlaylistIcon } from './icons/AddToPlaylistIcon';
import { CheckIcon } from './icons/CheckIcon';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import { SchedulePostForm } from './SchedulePostForm';
import { TrashIcon } from './icons/TrashIcon';
import { PLAN_LIMITS } from '../config/plans';
import { VideoIcon } from './icons/VideoIcon';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { PaintBrushIcon } from './icons/PaintBrushIcon';
import { analyzeTrackGenre, transcribeLyrics } from '../services/geminiService';
import { FilmIcon } from './icons/FilmIcon';
import { DeleteReleaseModal } from './DeleteReleaseModal';
import { MixerVerticalIcon } from './icons/MixerVerticalIcon';
import { ScissorsIcon } from './icons/ScissorsIcon';
import { PackageIcon } from './icons/PackageIcon';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { SimilarityMapIcon } from './icons/SimilarityMapIcon';
import { VerifiedIcon } from './icons/VerifiedIcon';
import { LyricCardIcon } from './icons/LyricCardIcon';
import { SignalIcon } from './icons/SignalIcon';
import { FireIcon } from './icons/FireIcon';

interface ReleaseDetailsProps {
    release: Release;
    artist: Artist;
    playlists: Playlist[];
    socialPosts: SocialPost[];
    setView: (view: View) => void;
    onPlayTrack: (release: Release, track: Track) => void;
    onToggleFavorite: (releaseId: number) => void;
    onUpdateCoverArt: (releaseId: number, newCoverArtFile: File) => void;
    onUpdateRelease: (releaseId: number, updatedDetails: Partial<Release>) => void;
    onDeleteRelease: (releaseId: number) => void;
    onAddToPlaylist: (playlistId: number, releaseId: number) => void;
    onAddTrackToRelease: (releaseId: number, newTrackData: { title: string; lyrics: string; mp3File: File }) => void;
    onUpdateTrackInRelease: (releaseId: number, trackId: number, updatedDetails: EditableTrackDetails & { mp3File?: File }) => void;
    onRemoveTrackFromRelease: (releaseId: number, trackId: number) => void;
    onSchedulePost: (postData: Omit<SocialPost, 'id' | 'status'>) => void;
    plan: PlanName;
    openUpgradeModal: (feature: string) => void;
    teamMembers: TeamMember[];
    tasks: Task[];
    onAddTask: (task: Omit<Task, 'id' | 'completed' | 'releaseId'> & { releaseId: number }) => void;
    onToggleTask: (taskId: number) => void;
    assets: Record<AssetCategory, AssetFile[]> | undefined;
    onAddAsset: (category: AssetCategory, file: File) => void;
    requireVeoKey: (callback: () => void) => void;
    onGenerateVisualIdentity: (release: Release) => void;
    onGenerateAlbumVisualSuite: (release: Release) => void;
    onSyncLyrics: (trackId: number) => void;
    onGenerateMarketingCampaign: (release: Release) => void;
    onDesignCoverArt: (release: Release) => void;
    onUpdateTrack: (trackId: number, updatedTrack: Partial<Track>) => void;
    collaborators: Collaborator[];
    onUpdateReleaseSplits: (releaseId: number, splits: any[]) => void;
    paymentSettings: any; 
    onSecureLicense: (releaseId: number) => void;
    onGoToStoryboard: (track: Track) => void;
    onGoToFullLyricVideo: (track: Track) => void;
    onGoToHypeReel: (track: Track) => void;
    onGoToReelSync: (track: Track) => void;
    onGoToSimilarityMap: (track: Track) => void;
    onGoToContentPack: (release: Release) => void;
    onGenerateEPK: (release: Release) => void;
    onGoToLyricCards: (track: Track) => void;
    onAmplifyRelease: (release: Release) => void;
    onGoToRemixAssistant: (track: Track) => void;
    onEnterWarRoom: (release: Release) => void;
}

type Tab = 'Overview' | 'Tracklist' | 'Toolkit';

const TabButton: React.FC<{ label: Tab, activeTab: Tab, setTab: (tab: Tab) => void }> = ({ label, activeTab, setTab }) => (
    <button
        onClick={() => setTab(label)}
        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${activeTab === label ? 'bg-brand-purple text-white' : 'text-medium-text hover:bg-dark-border'}`}
    >
        {label}
    </button>
);

const OverviewTab = ({ release, artist, onUpdateRelease, onUpdateCoverArt, onDesignCoverArt, onGenerateAlbumVisualSuite, onEnterWarRoom }: { release: Release, artist: Artist, onUpdateRelease: (id: number, data: EditableReleaseDetails) => void, onUpdateCoverArt: (id: number, file: File) => void, onDesignCoverArt: (release: Release) => void, onGenerateAlbumVisualSuite: (release: Release) => void, onEnterWarRoom: (release: Release) => void }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<EditableReleaseDetails>({ artist: release.artist, title: release.title, genre: release.genre, releaseDate: release.releaseDate });
    
    useEffect(() => {
        setFormData({ artist: release.artist, title: release.title, genre: release.genre, releaseDate: release.releaseDate, });
        setIsEditing(false);
    }, [release]);
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSave = () => { onUpdateRelease(release.id, formData); setIsEditing(false); };
    const handleCancel = () => { setIsEditing(false); setFormData({ artist: release.artist, title: release.title, genre: release.genre, releaseDate: release.releaseDate }); };
    const handleCoverArtChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { onUpdateCoverArt(release.id, e.target.files[0]); } };

    return (
        <div className="space-y-4">
            <div className="md:flex md:space-x-6">
                <div className="md:w-1/3 relative group">
                    <img src={release.coverArtUrl} alt={release.title} className="w-full h-auto rounded-lg shadow-lg aspect-square object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity rounded-lg space-y-2">
                        <button onClick={() => onDesignCoverArt(release)} className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-semibold hover:bg-white/30">
                           <PaintBrushIcon className="w-5 h-5" /> Design with AI
                        </button>
                        <label htmlFor="cover-art-upload" className="cursor-pointer text-sm hover:underline">
                           or upload new image
                           <input id="cover-art-upload" type="file" className="sr-only" accept="image/*" onChange={handleCoverArtChange} />
                        </label>
                    </div>
                </div>
                <div className="md:w-2/3 mt-4 md:mt-0">
                    {isEditing ? (
                         <div className="space-y-4">
                            <input type="text" name="title" value={formData.title} onChange={handleFormChange} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none text-2xl font-bold" />
                            <input type="text" name="artist" value={formData.artist} onChange={handleFormChange} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none text-lg" />
                            <input type="text" name="genre" value={formData.genre} onChange={handleFormChange} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple outline-none" />
                            <input type="date" name="releaseDate" value={formData.releaseDate} onChange={handleFormChange} className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-light-text" />
                            <div className="flex items-center space-x-2 pt-2"><button onClick={handleSave} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg">Save</button><button onClick={handleCancel} className="bg-dark-border text-light-text py-2 px-4 rounded-lg">Cancel</button></div>
                        </div>
                    ) : (
                         <>
                            <p className="text-medium-text font-semibold">{release.type}</p>
                            <h2 className="text-3xl font-bold text-light-text">{release.title}</h2>
                            <p className="text-xl text-medium-text mb-1 flex items-center gap-2">
                                {release.artist}
                                {artist.verificationStatus === 'verified' && <VerifiedIcon className="w-5 h-5 text-blue-400" title="Verified Artist" />}
                            </p>
                            <p className="text-md text-medium-text mb-4">{release.genre} &bull; {new Date(release.releaseDate).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            
                            <div className="flex gap-2 mb-4">
                                <button onClick={() => setIsEditing(true)} className="flex items-center text-sm font-semibold text-medium-text hover:text-brand-purple p-2 rounded-lg bg-dark-bg border border-dark-border"><PencilIcon className="w-4 h-4 mr-2" />Edit</button>
                                {(release.liveStatus === 'Live' || new Date(release.releaseDate) <= new Date()) && (
                                    <button onClick={() => onEnterWarRoom(release)} className="flex items-center text-sm font-bold text-white bg-red-600 hover:bg-red-700 p-2 px-3 rounded-lg shadow-lg shadow-red-600/20 animate-pulse"><FireIcon className="w-4 h-4 mr-2" /> Enter War Room</button>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
             {release.type === 'Album' && (
                <div className="mt-6 pt-6 border-t border-dark-border">
                <button 
                    onClick={() => onGenerateAlbumVisualSuite(release)} 
                    className="w-full bg-dark-border text-white font-bold py-3 px-4 rounded-lg hover:bg-dark-border/70 transition-colors duration-200 flex items-center justify-center text-base"
                >
                    <SparklesIcon className="w-5 h-5 mr-3 text-brand-purple" />
                    Generate Album Visual Suite
                </button>
                <p className="text-xs text-center text-medium-text mt-2">Automatically generate matching cover art options, track visuals, and social media banners for the entire album.</p>
                </div>
            )}
        </div>
    );
};

const TracklistTab = ({ release, onPlayTrack, onAddTrackToRelease, onUpdateTrackInRelease, onRemoveTrackFromRelease, plan, openUpgradeModal, onSyncLyrics, onUpdateTrack, onGoToStoryboard, onGoToFullLyricVideo, onGoToHypeReel, onGoToReelSync, onGoToSimilarityMap, onGoToLyricCards, onGoToRemixAssistant }: Pick<ReleaseDetailsProps, 'release' | 'onPlayTrack' | 'onAddTrackToRelease' | 'onUpdateTrackInRelease' | 'onRemoveTrackFromRelease' | 'plan' | 'openUpgradeModal' | 'onSyncLyrics' | 'onUpdateTrack' | 'onGoToStoryboard' | 'onGoToFullLyricVideo' | 'onGoToHypeReel' | 'onGoToReelSync' | 'onGoToSimilarityMap' | 'onGoToLyricCards' | 'onGoToRemixAssistant' >) => {
    const [isAddingTrack, setIsAddingTrack] = useState(false);
    const [newTrackData, setNewTrackData] = useState({ title: '', lyrics: '', mp3File: null as File | null });
    const [addTrackError, setAddTrackError] = useState('');
    const [editingTrackId, setEditingTrackId] = useState<number | null>(null);
    const [editingTrackData, setEditingTrackData] = useState({ title: '', lyrics: '', mp3File: null as File | null });
    const [analyzingTrackId, setAnalyzingTrackId] = useState<number|null>(null);

    const handleAnalyzeGenre = async (track: Track) => {
        setAnalyzingTrackId(track.id);
        try {
            const result = await analyzeTrackGenre(track, release.genre);
            onUpdateTrack(track.id, result);
        } catch (error) { console.error(error); } finally { setAnalyzingTrackId(null); }
    };
    const handleTranscribeLyrics = async (track: Track) => {
        setAnalyzingTrackId(track.id);
        try {
            const lyrics = await transcribeLyrics(track);
            onUpdateTrack(track.id, { lyrics });
        } catch (error) { console.error(error); } finally { setAnalyzingTrackId(null); }
    };

    const handleSaveTrack = () => { if (!newTrackData.title || !newTrackData.mp3File) { setAddTrackError('Track title and MP3 file are required.'); return; } onAddTrackToRelease(release.id, newTrackData as any); handleCancelAddTrack(); };
    const handleCancelAddTrack = () => { setIsAddingTrack(false); setNewTrackData({ title: '', lyrics: '', mp3File: null }); setAddTrackError(''); };
    const handleStartEditTrack = (track: Track) => { setEditingTrackId(track.id); setEditingTrackData({ title: track.title, lyrics: track.lyrics, mp3File: null }); };
    const handleCancelEditTrack = () => { setEditingTrackId(null); setEditingTrackData({ title: '', lyrics: '', mp3File: null }); };
    const handleSaveTrackEdit = () => { if (!editingTrackId) return; onUpdateTrackInRelease(release.id, editingTrackId, editingTrackData); handleCancelEditTrack(); };
    const handleRemoveTrack = (trackId: number) => { if (window.confirm('Are you sure?')) { onRemoveTrackFromRelease(release.id, trackId); } };

    const handleSyncClick = (trackId: number) => {
        if (!PLAN_LIMITS[plan].lyricSyncing) openUpgradeModal('AI Lyric Syncing');
        else onSyncLyrics(trackId);
    };
    
    return (
        <div className="space-y-4">
            {release.tracks.map((track) => (
                <div key={track.id} className="bg-dark-card border border-dark-border rounded-lg">
                    {editingTrackId === track.id ? (
                        <div className="p-4 space-y-3">
                            <h4 className="font-semibold text-light-text">Editing: <span className="italic">{track.title}</span></h4>
                            <input type="text" value={editingTrackData.title} onChange={e => setEditingTrackData(p => ({...p, title: e.target.value}))} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-light-text" />
                            <textarea value={editingTrackData.lyrics} onChange={e => setEditingTrackData(p => ({...p, lyrics: e.target.value}))} rows={3} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-light-text"></textarea>
                            <div className="flex items-center space-x-2 pt-2">
                                <button onClick={handleSaveTrackEdit} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg">Save</button>
                                <button onClick={handleCancelEditTrack} className="bg-dark-border text-light-text py-2 px-4 rounded-lg">Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => onPlayTrack(release, track)} className="p-3 rounded-full bg-dark-bg hover:bg-dark-border text-light-text flex-shrink-0"><PlayIcon className="w-5 h-5" /></button>
                                    <div>
                                        <p className="font-bold text-light-text">{track.title}</p>
                                        <p className={`text-xs font-semibold ${track.lyricSyncStatus === 'Synced' ? 'text-green-400' : 'text-yellow-400'}`}>
                                            {track.lyricSyncStatus || 'Not Synced'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleStartEditTrack(track)} className="p-2 text-medium-text hover:text-brand-purple"><PencilIcon className="w-5 h-5"/></button>
                                    <button onClick={() => handleRemoveTrack(track.id)} className="p-2 text-medium-text hover:text-red-500"><TrashIcon className="w-5 h-5"/></button>
                                </div>
                            </div>
    
                            {(track.genreAnalysis || analyzingTrackId === track.id) && (
                                <div className="text-xs space-y-1 pt-2 bg-dark-bg p-2 rounded-md">
                                    {analyzingTrackId === track.id && !track.genreAnalysis && <p>Analyzing...</p>}
                                    {track.genreAnalysis && (
                                        <p><strong>Genre:</strong> {track.genreAnalysis.primaryGenre} ({track.genreAnalysis.subGenres.join(', ')})</p>
                                    )}
                                    {track.moodKeywords && (
                                        <p><strong>Moods:</strong> {track.moodKeywords.join(', ')}</p>
                                    )}
                                </div>
                            )}
    
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-dark-border/50">
                                <button onClick={() => handleSyncClick(track.id)} disabled={track.lyricSyncStatus === 'Syncing' || track.lyricSyncStatus === 'Synced'} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                    {track.lyricSyncStatus === 'Syncing' ? 'Syncing...' : (track.lyricSyncStatus === 'Synced' ? 'Synced' : 'Sync Lyrics')}
                                </button>
                                <button onClick={() => handleAnalyzeGenre(track)} disabled={analyzingTrackId === track.id} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold disabled:opacity-50">Analyze Genre</button>
                                <button onClick={() => handleTranscribeLyrics(track)} disabled={analyzingTrackId === track.id} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold disabled:opacity-50">Transcribe Lyrics</button>
                                <button onClick={() => onGoToLyricCards(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><LyricCardIcon className="w-3 h-3" /> Lyric Cards</button>
                                <button onClick={() => onGoToStoryboard(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><FilmIcon className="w-3 h-3" /> Storyboard</button>
                                <button onClick={() => onGoToFullLyricVideo(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><VideoIcon className="w-3 h-3" /> Full Lyric Video</button>
                                {track.fullLyricVideoUrl && (
                                    <button onClick={() => onGoToReelSync(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><ScissorsIcon className="w-3 h-3" /> ReelSync Edits</button>
                                )}
                                <button onClick={() => onGoToHypeReel(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><MegaphoneIcon className="w-3 h-3" /> Hype Reel</button>
                                <button onClick={() => onGoToRemixAssistant(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><MixerVerticalIcon className="w-3 h-3" /> Remix Assistant</button>
                                <button onClick={() => onGoToSimilarityMap(track)} className="text-xs bg-dark-bg px-3 py-1 rounded-md font-semibold flex items-center gap-1"><SimilarityMapIcon className="w-3 h-3" /> Similarity Map</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {isAddingTrack ? (
                 <div className="bg-dark-bg border border-dark-border p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold text-light-text">Add New Track</h4>
                    {addTrackError && <p className="text-red-400 text-sm">{addTrackError}</p>}
                    <input type="text" value={newTrackData.title} onChange={e => setNewTrackData(p => ({...p, title: e.target.value}))} placeholder="Track Title" className="w-full bg-dark-card border border-dark-border p-2 rounded-lg" />
                    <textarea value={newTrackData.lyrics} onChange={e => setNewTrackData(p => ({...p, lyrics: e.target.value}))} rows={3} placeholder="Lyrics..." className="w-full bg-dark-card border border-dark-border p-2 rounded-lg" />
                    <div>
                        <label className="text-xs text-medium-text">MP3 File</label>
                        <input type="file" onChange={e => setNewTrackData(p => ({...p, mp3File: e.target.files?.[0] || null}))} accept="audio/mpeg" className="w-full text-sm" />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <button onClick={handleSaveTrack} className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg">Save Track</button>
                        <button onClick={handleCancelAddTrack} className="bg-dark-border text-light-text py-2 px-4 rounded-lg">Cancel</button>
                    </div>
                </div>
            ) : (
                release.type === 'Album' && <button onClick={() => setIsAddingTrack(true)} className="w-full border-2 border-dashed border-dark-border rounded-lg p-3 text-medium-text hover:bg-dark-card">+ Add Track</button>
            )}
        </div>
    );
};

const ToolkitTab = ({ onGenerateEPK, release }: { onGenerateEPK: (release: Release) => void, release: Release }) => (
    <div className="space-y-4">
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
            <h4 className="font-semibold text-light-text mb-2">Auto-EPK Builder</h4>
            <p className="text-sm text-medium-text mb-3">Combine this release's analytics, visuals, and an AI-generated bio into a downloadable PDF, perfect for pitching to press and venues.</p>
            <button onClick={() => onGenerateEPK(release)} className="bg-brand-purple text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-brand-purple-dark flex items-center justify-center">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Build Electronic Press Kit
            </button>
        </div>
    </div>
);


export const ReleaseDetails = (props: ReleaseDetailsProps) => {
    const { release, onToggleFavorite, setView, playlists, onAddToPlaylist, onDeleteRelease, onGoToContentPack, tasks, onAmplifyRelease, onEnterWarRoom } = props;
    const [activeTab, setActiveTab] = useState<Tab>('Overview');
    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const availableTabs: Tab[] = ['Overview', 'Tracklist', 'Toolkit'];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'Overview':
                return <OverviewTab {...props} />;
            case 'Tracklist':
                return <TracklistTab {...props} />;
            case 'Toolkit':
                return <ToolkitTab onGenerateEPK={props.onGenerateEPK} release={release} />;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 space-y-6">
            {isPlaylistModalOpen && (
                <AddToPlaylistModal
                    playlists={playlists}
                    onAddToPlaylist={(playlistId) => {
                        onAddToPlaylist(playlistId, release.id);
                        setIsPlaylistModalOpen(false);
                    }}
                    onClose={() => setIsPlaylistModalOpen(false)}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteReleaseModal
                    release={release}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={() => {
                        onDeleteRelease(release.id);
                        setIsDeleteModalOpen(false);
                    }}
                />
            )}

            <div className="flex justify-between items-start">
                <button onClick={() => setView('releases')} className="text-medium-text hover:text-light-text mb-2">&larr; Back to Releases</button>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onAmplifyRelease(release)} className="p-2 rounded-full bg-brand-purple text-white hover:bg-brand-purple-dark" title="Launch Release Amplifier">
                        <SignalIcon className="w-6 h-6" />
                    </button>
                    <button onClick={() => onGoToContentPack(release)} className="p-2 rounded-full hover:bg-dark-card text-medium-text hover:text-light-text" title="Download Content Pack">
                        <PackageIcon className="w-6 h-6" />
                    </button>
                    <button onClick={() => onToggleFavorite(release.id)} className="p-2 rounded-full hover:bg-dark-card" title="Favorite">
                        <HeartIcon className={`w-6 h-6 ${release.isFavorite ? 'text-red-500' : 'text-medium-text'}`} filled={release.isFavorite} />
                    </button>
                    <button onClick={() => setIsDeleteModalOpen(true)} className="p-2 rounded-full hover:bg-dark-card text-medium-text hover:text-red-500" title="Delete Release">
                        <TrashIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="flex space-x-2 border-b border-dark-border">
                    {availableTabs.map(tab => (
                        <TabButton key={tab} label={tab} activeTab={activeTab} setTab={setActiveTab} />
                    ))}
                </div>
            </div>

            <div>
                {renderTabContent()}
            </div>
        </div>
    );
};
