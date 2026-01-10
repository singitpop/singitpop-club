

import React, { useState } from 'react';
import { Artist, SocialPost } from '../types';

interface ArtistApprovalHubProps {
    artists: Artist[];
    socialPosts: Record<number, SocialPost[]>;
    onUpdateStatus: (postId: number, status: SocialPost['status']) => void;
}

const statusColors: Record<SocialPost['status'], string> = {
    'Draft': 'bg-gray-500/20 text-gray-400',
    'Pending Approval': 'bg-yellow-500/20 text-yellow-400',
    'Approved': 'bg-blue-500/20 text-blue-400',
    'Posted': 'bg-green-500/20 text-green-400',
    'Changes Requested': 'bg-red-500/20 text-red-400',
    'Scheduled': 'bg-purple-500/20 text-purple-400',
};

const PostCard: React.FC<{ post: SocialPost, onUpdateStatus: (postId: number, status: SocialPost['status']) => void }> = ({ post, onUpdateStatus }) => {
    
    // In a real app, this would use a secure OAuth token to post
    const handleApprove = () => {
        onUpdateStatus(post.id, 'Approved');
        setTimeout(() => {
             onUpdateStatus(post.id, 'Posted');
        }, 3000); // Simulate posting delay
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-light-text">{post.platform} Post</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[post.status]}`}>{post.status}</span>
            </div>
            <p className="text-sm text-medium-text whitespace-pre-wrap">{post.content}</p>
            <p className="text-xs text-brand-purple mt-2">Scheduled for: {new Date(post.scheduledTime).toLocaleString()}</p>
            
            {post.status === 'Pending Approval' && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-dark-border">
                    <button onClick={handleApprove} className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700">Approve & Post</button>
                    <button onClick={() => onUpdateStatus(post.id, 'Changes Requested')} className="w-full bg-dark-border text-light-text font-bold py-2 rounded-lg hover:bg-dark-border/70">Request Changes</button>
                </div>
            )}
        </div>
    )
}

export const ArtistApprovalHub = ({ artists, socialPosts, onUpdateStatus }: ArtistApprovalHubProps) => {
    const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

    const selectedArtist = artists.find(a => a.id === selectedArtistId);
    const pendingPosts = selectedArtistId ? (socialPosts[selectedArtistId] || []).filter(p => p.status === 'Pending Approval') : [];
    const historyPosts = selectedArtistId ? (socialPosts[selectedArtistId] || []).filter(p => p.status !== 'Pending Approval' && p.status !== 'Draft') : [];

    if (!selectedArtistId) {
        return (
            <div className="min-h-screen bg-dark-bg text-light-text font-sans flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-3xl font-bold">Artist Approval Hub</h1>
                    <p className="text-medium-text mt-2 mb-6">Please select your artist profile to view pending items.</p>
                    <div className="space-y-3">
                         {artists.map(artist => (
                            <button key={artist.id} onClick={() => setSelectedArtistId(artist.id)} className="w-full flex items-center space-x-4 p-4 bg-dark-card rounded-lg hover:bg-dark-border">
                                <img src={artist.avatarUrl} alt={artist.name} className="w-12 h-12 rounded-full" />
                                <span className="text-lg font-semibold">{artist.name}</span>
                            </button>
                         ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Approval Hub</h1>
                    <p className="text-medium-text">For {selectedArtist?.name}</p>
                </div>
                <button onClick={() => setSelectedArtistId(null)} className="text-sm font-semibold text-medium-text hover:text-brand-purple">Switch Artist</button>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Pending Your Approval ({pendingPosts.length})</h2>
                    <div className="space-y-4">
                        {pendingPosts.length > 0 ? (
                            pendingPosts.map(post => <PostCard key={post.id} post={post} onUpdateStatus={onUpdateStatus} />)
                        ) : (
                            <p className="text-medium-text text-center p-6 bg-dark-card rounded-lg">No items are currently waiting for your approval.</p>
                        )}
                    </div>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold mb-4">Approval History</h2>
                     <div className="space-y-4">
                        {historyPosts.length > 0 ? (
                            historyPosts.map(post => <PostCard key={post.id} post={post} onUpdateStatus={onUpdateStatus} />)
                        ) : (
                            <p className="text-medium-text text-center p-6 bg-dark-card rounded-lg">No past items found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};