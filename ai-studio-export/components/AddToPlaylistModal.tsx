
import React from 'react';
import { Playlist } from '../types';

interface AddToPlaylistModalProps {
  playlists: Playlist[];
  onAddToPlaylist: (playlistId: number) => void;
  onClose: () => void;
}

export const AddToPlaylistModal = ({ playlists, onAddToPlaylist, onClose }: AddToPlaylistModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-dark-card rounded-lg p-6 w-full max-w-md border border-dark-border" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-light-text">Add to Playlist</h3>
          <button onClick={onClose} className="text-2xl text-medium-text">&times;</button>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {playlists.length > 0 ? (
            playlists.map(playlist => (
                <button 
                  key={playlist.id} 
                  onClick={() => onAddToPlaylist(playlist.id)}
                  className="w-full text-left p-3 bg-dark-bg rounded-lg hover:bg-dark-border"
                >
                  <p className="text-light-text">{playlist.name}</p>
                </button>
            ))
           ) : (
            <p className="text-medium-text text-center py-4">No playlists found. Create one first!</p>
           )}
        </div>
      </div>
    </div>
  );
};
