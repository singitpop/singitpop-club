
import React, { useState, useEffect } from 'react';
import { Release, View, PromoAssets, PlanName, Comment, Artist } from '../types';
import { generatePromoAssets } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { PLAN_LIMITS } from '../config/plans';

interface PromoGeneratorProps {
  release: Release | null;
  artist: Artist;
  setView: (view: View) => void;
  plan: PlanName;
  openUpgradeModal: (feature: string) => void;
  comments: Comment[];
  onAddComment: (commentText: string) => void;
}

const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center text-center p-8">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-brand-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-light-text mt-4">Generating Brilliance...</h3>
        <p className="text-medium-text mt-1">Our AI is crafting the perfect promo for you.</p>
    </div>
);

const CommentSection = ({ comments, onAddComment }: { comments: Comment[], onAddComment: (text: string) => void }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment.trim());
            setNewComment('');
        }
    };

    return (
        <div className="mt-4 pt-4 border-t border-dark-border">
            <h5 className="text-base font-semibold text-medium-text mb-3">Team Comments</h5>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                {comments.length > 0 ? comments.map(comment => (
                    <div key={comment.id} className="flex items-start space-x-3">
                        <img src={comment.avatarUrl} alt={comment.author} className="w-8 h-8 rounded-full" />
                        <div className="flex-1 bg-dark-bg p-2 rounded-lg">
                            <p className="text-sm font-semibold text-light-text">{comment.author}</p>
                            <p className="text-sm text-light-text">{comment.text}</p>
                        </div>
                    </div>
                )) : <p className="text-sm text-medium-text">No comments yet. Start the conversation!</p>}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 mt-4">
                <img src="https://picsum.photos/100" alt="Your avatar" className="w-8 h-8 rounded-full" />
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-grow bg-dark-bg border border-dark-border rounded-full py-2 px-4 text-light-text text-sm focus:ring-2 focus:ring-brand-purple outline-none"
                />
                <button type="submit" className="bg-brand-purple text-white font-bold py-2 px-4 rounded-full text-sm">Send</button>
            </form>
        </div>
    );
};

const AssetCard = ({ title, content, comments, onAddComment }: { title: string, content: string, comments: Comment[], onAddComment: (text: string) => void }) => {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-dark-card border border-dark-border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-brand-purple">{title}</h4>
                <button onClick={handleCopy} className="text-sm bg-dark-border px-3 py-1 rounded-md text-medium-text hover:text-light-text">{copied ? 'Copied!' : 'Copy'}</button>
            </div>
            <p className="text-light-text whitespace-pre-wrap text-sm">{content}</p>
            <CommentSection comments={comments} onAddComment={onAddComment} />
        </div>
    );
}


export const PromoGenerator = ({ release, artist, setView, plan, openUpgradeModal, comments, onAddComment }: PromoGeneratorProps) => {
  const [assets, setAssets] = useState<PromoAssets | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // This is a client-side simulation for demo purposes.
  // In a real app, this count would be managed on the backend.
  const [generationCount, setGenerationCount] = useState(0);

  useEffect(() => {
    if (release && artist) {
        if (generationCount >= PLAN_LIMITS[plan].promoGenerations) {
            openUpgradeModal('Unlimited AI Promo Generations');
            setIsLoading(false);
            return;
        }

      setIsLoading(true);
      setError(null);
      generatePromoAssets(release, artist.creativeDna?.isEnabled ? artist.creativeDna.summary : undefined)
        .then(promoAssets => {
            setAssets(promoAssets);
            setGenerationCount(prev => prev + 1);
        })
        .catch(err => setError(err.message))
        .finally(() => setIsLoading(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [release, artist]);

  if (!release) {
    return (
        <div className="p-4 text-center">
            <p className="text-medium-text">No release selected. Please create one first.</p>
            {/* FIX: Changed 'new-release' to 'release-wizard' to match a valid View type. */}
            <button onClick={() => setView('release-wizard')} className="mt-4 bg-brand-purple text-white font-bold py-2 px-4 rounded-lg">Create Release</button>
        </div>
    )
  }

  const generationsLeft = PLAN_LIMITS[plan].promoGenerations - generationCount;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-light-text">Promo Assets</h2>
        <button onClick={() => setView(release ? 'release-details' : 'dashboard')} className="text-medium-text text-2xl">&times;</button>
      </div>
      
      <div className="bg-dark-card rounded-lg p-4 flex items-center space-x-4 border border-dark-border mb-6">
        <img src={release.coverArtUrl} alt={release.title} className="w-16 h-16 rounded-md object-cover" />
        <div>
          <h4 className="text-light-text text-lg font-bold">{release.title}</h4>
          <p className="text-medium-text">{release.artist}</p>
        </div>
      </div>

       {plan === 'Free' && (
            <div className="text-center bg-dark-card border border-dashed border-dark-border p-3 rounded-lg mb-6">
                <p className="text-medium-text text-sm">You have <span className="font-bold text-brand-purple">{generationsLeft}</span> AI generations left this month.</p>
            </div>
       )}

      {isLoading && <LoadingSpinner />}
      {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg">{error}</p>}
      
      {assets && (
        <div className="space-y-4">
            <AssetCard title="Instagram Post" content={assets.instagramPost} comments={comments} onAddComment={onAddComment} />
            <AssetCard title="TikTok Post" content={assets.tiktokPost} comments={comments} onAddComment={onAddComment} />
            <AssetCard title="Facebook Post" content={assets.facebookPost} comments={comments} onAddComment={onAddComment} />
        </div>
      )}

      <button onClick={() => setView('release-details')} className="w-full mt-6 bg-brand-purple text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors duration-200">
        View Release Details
      </button>
    </div>
  );
};
