
import React, { useState } from 'react';
import { Playlist, View, AIPlaylist, Release, Artist, PlatformConnections } from '../types';
import { PlaylistIcon } from './icons/PlaylistIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { AiPlaylistGeneratorModal } from './AiPlaylistGeneratorModal';
import { CheckIcon } from './icons/CheckIcon';

interface PlaylistsProps {
  playlists: Playlist[];
  allReleases: Release[];
  artist: Artist;
  onCreatePlaylist: (name: string) => void;
  onGenerateAiPlaylist: (data: AIPlaylist) => void;
  onSelectPlaylist: (playlist: Playlist) => void;
  setView: (view: View) => void;
  platformConnections: PlatformConnections;
  onSyncPlaylist: (playlistId: number) => void;
}

export const Playlists = ({ playlists, allReleases, artist, onCreatePlaylist, onGenerateAiPlaylist, onSelectPlaylist, setView, platformConnections, onSyncPlaylist }: PlaylistsProps) => {
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
    }
  };
  
  const handleAiGenerated = (data: AIPlaylist) => {
      onGenerateAiPlaylist(data);
      setIsAiModalOpen(false);
  }

  return (
    <>
      {isAiModalOpen && (
          <AiPlaylistGeneratorModal
              artist={artist}
              releases={allReleases}
              onGenerate={handleAiGenerated}
              onClose={() => setIsAiModalOpen(false)}
          />
      )}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-light-text mb-4">Playlists</h2>

        <form onSubmit={handleCreate} className="mb-6 flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            placeholder="New playlist name..."
            className="flex-grow bg-dark-card border border-dark-border rounded-lg p-3 text-light-text focus:ring-2 focus:ring-brand-purple focus:border-transparent outline-none"
          />
          <div className="flex gap-2">
            <button type="submit" className="flex-1 sm:flex-none bg-dark-border text-white font-bold py-3 px-6 rounded-lg hover:bg-dark-border/70 transition-colors">
              Create
            </button>
             <button 
                type="button" 
                onClick={() => setIsAiModalOpen(true)}
                className="flex-1 sm:flex-none bg-brand-purple text-white font-bold py-3 px-6 rounded-lg hover:bg-brand-purple-dark transition-colors flex items-center justify-center"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Generate with AI
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {playlists.length > 0 ? (
            playlists.map(playlist => (
              <div key={playlist.id} className="bg-dark-card rounded-lg p-4 border border-dark-border">
                  <div className="flex flex-col sm:flex-row gap-4">
                      <button 
                        onClick={() => onSelectPlaylist(playlist)} 
                        className="w-full text-left flex items-center space-x-4"
                      >
                        <div className="p-3 bg-dark-border rounded-lg">
                          <PlaylistIcon className="w-6 h-6 text-brand-purple" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <h4 className="text-light-text text-lg font-bold">{playlist.name}</h4>
                            {playlist.isAiGenerated && <span className="text-xs bg-brand-purple/20 text-brand-purple font-semibold px-2 py-0.5 rounded-full">AI</span>}
                          </div>
                          <p className="text-medium-text text-sm">{playlist.description || `${playlist.releaseIds.length} ${playlist.releaseIds.length === 1 ? 'release' : 'releases'}`}</p>
                        </div>
                      </button>
                  </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-dark-card border border-dark-border rounded-lg">
              <p className="text-light-text font-semibold">No playlists yet.</p>
              <p className="text-medium-text mt-1">Create your first playlist or use AI to get started!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};