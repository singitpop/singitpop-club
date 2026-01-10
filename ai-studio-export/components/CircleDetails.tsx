import React, { useState } from 'react';
import { ArtistCircle, CirclePost, CircleComment, TeamMember, View } from '../types';
import { SendIcon } from './icons/SendIcon';

interface CircleDetailsProps {
    circle: ArtistCircle;
    posts: CirclePost[];
    currentUser: TeamMember;
    teamMembers: TeamMember[];
    onAddPost: (circleId: number, content: string) => void;
    onAddComment: (postId: number, content: string) => void;
    setView: (view: View) => void;
}

// FIX: Extracted inline props to a dedicated interface and typed as React.FC.
interface CommentProps {
    comment: CircleComment;
    author?: TeamMember;
}

const Comment: React.FC<CommentProps> = ({ comment, author }) => (
    <div className="flex items-start gap-3 mt-3">
        <img src={author?.avatarUrl} alt={author?.name} className="w-8 h-8 rounded-full" />
        <div className="bg-dark-bg p-2 rounded-lg text-sm flex-grow">
            <p className="font-semibold text-light-text">{author?.name}</p>
            <p className="text-medium-text">{comment.content}</p>
        </div>
    </div>
);

// FIX: Extracted inline props to a dedicated interface and typed as React.FC.
interface PostProps {
    post: CirclePost;
    author?: TeamMember;
    teamMembers: TeamMember[];
    currentUser: TeamMember;
    onAddComment: (postId: number, content: string) => void;
}

const Post: React.FC<PostProps> = ({ post, author, teamMembers, currentUser, onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        onAddComment(post.id, commentText);
        setCommentText('');
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
            <div className="flex items-start gap-4">
                <img src={author?.avatarUrl} alt={author?.name} className="w-12 h-12 rounded-full" />
                <div>
                    <p className="font-bold text-light-text">{author?.name}</p>
                    <p className="text-xs text-medium-text">{new Date(post.timestamp).toLocaleString()}</p>
                </div>
            </div>
            <p className="mt-3 text-medium-text whitespace-pre-wrap">{post.content}</p>

            <div className="mt-4 pt-4 border-t border-dark-border">
                {post.comments.map(comment => (
                    <Comment key={comment.id} comment={comment} author={teamMembers.find(m => m.id === comment.authorId)} />
                ))}
                <form onSubmit={handleCommentSubmit} className="flex items-start gap-3 mt-4">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                    <input 
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full bg-dark-bg border border-dark-border rounded-full py-2 px-4 text-sm text-light-text"
                    />
                    <button type="submit" className="bg-dark-border p-2 rounded-full"><SendIcon className="w-5 h-5 text-medium-text"/></button>
                </form>
            </div>
        </div>
    );
};


export const CircleDetails = ({ circle, posts, currentUser, teamMembers, onAddPost, onAddComment, setView }: CircleDetailsProps) => {
    const [newPostContent, setNewPostContent] = useState('');

    const handlePostSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;
        onAddPost(circle.id, newPostContent);
        setNewPostContent('');
    };
    
    const sortedPosts = [...posts].sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="p-4 md:p-6 max-w-3xl mx-auto">
            <button onClick={() => setView('circles')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to All Circles</button>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-light-text">{circle.name}</h1>
                <p className="text-medium-text mt-1">{circle.description}</p>
            </div>
            
            <form onSubmit={handlePostSubmit} className="bg-dark-card border border-dark-border rounded-lg p-4 mb-6">
                <textarea 
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    rows={3}
                    className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 text-sm"
                    placeholder="Share something with the circle..."
                />
                <div className="flex justify-end mt-2">
                    <button type="submit" disabled={!newPostContent.trim()} className="bg-brand-purple text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50">Post</button>
                </div>
            </form>

            <div className="space-y-4">
                {sortedPosts.map(post => (
                    <Post 
                        key={post.id} 
                        post={post}
                        author={teamMembers.find(m => m.id === post.authorId)}
                        teamMembers={teamMembers}
                        currentUser={currentUser}
                        onAddComment={onAddComment}
                    />
                ))}
                 {sortedPosts.length === 0 && (
                    <p className="text-center text-medium-text py-10">No posts yet. Be the first to start a conversation!</p>
                )}
            </div>
        </div>
    );
};