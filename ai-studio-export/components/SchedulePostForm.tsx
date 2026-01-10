
import React, { useState } from 'react';
import { SocialPost, Release, Artist } from '../types';
import { generateSinglePromoPost } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';

interface SchedulePostFormProps {
  release: Release;
  artist: Artist;
  releaseId: number;
  onSchedule: (post: Omit<SocialPost, 'id' | 'status'>) => void;
  onCancel: () => void;
}

export const SchedulePostForm = ({ release, artist, releaseId, onSchedule, onCancel }: SchedulePostFormProps) => {
  const [platform, setPlatform] = useState<SocialPost['platform']>('Instagram');
  const [content, setContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content || !scheduledTime) {
      setError('Content and scheduled time are required.');
      return;
    }
    setError('');
    onSchedule({
      platform,
      content,
      scheduledTime,
      releaseId,
    });
  };

  const handleGenerateContent = async () => {
      setIsGenerating(true);
      setError('');
      try {
          const generatedContent = await generateSinglePromoPost(
              release, 
              platform, 
              artist.creativeDna?.isEnabled ? artist.creativeDna.summary : undefined
          );
          setContent(generatedContent);
      } catch (err: any) {
          setError(err.message || 'AI content generation failed.');
      } finally {
          setIsGenerating(false);
      }
  };

  return (
    <div className="mt-4 bg-dark-card border border-dark-border p-4 rounded-lg space-y-3">
      <h4 className="text-lg font-semibold text-light-text">Schedule New Post</h4>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-medium-text mb-1">Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value as any)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-light-text">
            <option>Instagram</option>
            <option>TikTok</option>
            <option>YouTube</option>
            <option>Facebook</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-medium-text mb-1">Content</label>
           <div className="relative">
              <textarea value={content} onChange={e => setContent(e.target.value)} rows={5} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-light-text pr-12" placeholder="Your post content..."></textarea>
              <button
                  type="button"
                  onClick={handleGenerateContent}
                  disabled={isGenerating}
                  className="absolute top-2 right-2 bg-dark-card border border-dark-border text-brand-purple rounded-full p-2 hover:bg-dark-border disabled:opacity-50 disabled:cursor-wait transition-colors"
                  title="Generate with AI"
              >
                  {isGenerating ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                  ) : (
                      <SparklesIcon className="w-5 h-5" />
                  )}
              </button>
            </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-medium-text mb-1">Schedule Time</label>
          <input type="datetime-local" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} className="w-full bg-dark-bg border border-dark-border rounded-lg p-2 text-light-text" />
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <button type="submit" className="bg-brand-purple text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-purple-dark transition-colors">Schedule Post</button>
          <button type="button" onClick={onCancel} className="bg-dark-border text-light-text font-bold py-2 px-4 rounded-lg hover:bg-dark-border/70 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
};
