
import React from 'react';
import { Playlist, Release, View } from '../types';

interface PlaylistDetailsProps {
  playlist: Playlist;
  allReleases: Release[];
  onSelectRelease: (release: Release) => void;
  setView: (view: View) => void;
}

export const PlaylistDetails = ({ playlist, allReleases, onSelectRelease, setView }: PlaylistDetailsProps) => {
  const releasesInPlaylist = allReleases.filter(r => playlist.releaseIds.includes(r.id));

  return (
    <div className="p-4">
      <div className="mb-6">
        <button onClick={() => setView('playlists')} className="text-medium-text hover:text-light-text mb-4">&larr; Back to Playlists</button>
        <h2 className="text-3xl font-bold text-light-text">{playlist.name}</h2>
        <p className="text-medium-text">{playlist.releaseIds.length} {playlist.releaseIds.length === 1 ? 'release' : 'releases'}</p>
      </div>

      <div className="space-y-4">
        {releasesInPlaylist.length > 0 ? (
          releasesInPlaylist.map(release => (
            <button key={release.id} onClick={() => onSelectRelease(release)} className="w-full text-left bg-dark-card rounded-lg p-4 flex items-center space-x-4 border border-dark-border hover:bg-dark-border transition-colors duration-200">
              <img src={release.coverArtUrl} alt={release.title} className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
              <div className="flex-grow">
                <p className="text-medium-text text-sm">{release.type}</p>
                <h4 className="text-light-text text-lg font-bold truncate">{release.title}</h4>
                <p className="text-brand-purple font-semibold text-sm">{new Date(release.releaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</p>
              </div>
            </button>
          ))
        ) : (
           <div className="text-center py-10 bg-dark-card rounded-lg border border-dark-border">
            <p className="text-light-text font-semibold">This playlist is empty.</p>
            <p className="text-medium-text mt-1">Add some releases to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};
