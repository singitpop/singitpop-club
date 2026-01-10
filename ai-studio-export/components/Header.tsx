import React from 'react';
import { View, WhiteLabelSettings, TeamMember } from '../types';
import { SettingsIcon } from './icons/SettingsIcon';
import { UsersIcon } from './icons/UsersIcon';

interface HeaderProps {
    setView: (view: View) => void;
    onOpenArtistSwitcher: () => void;
    whiteLabelSettings: WhiteLabelSettings;
    currentUser: TeamMember;
}

const logoSrc = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMSIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik05IDhWMTZIMTFWMTNIMTJDMTMuNjU2OSAxMyAxNSAxMS42NTY5IDE1IDEwQzE1IDguMzQzMTUgMTMuNjU2OSA3IDEyIDdIOVY4WiIgc3Ryb2tlPSIjOEEyQkUyIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTEyIDEzTDE1IDE2IiBzdHJva2U9IiM4QTJCRTIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbT0icm91bmQiLz48L3N2Zz4=";

export const Header = ({ setView, onOpenArtistSwitcher, whiteLabelSettings, currentUser }: HeaderProps) => (
  <header className="bg-dark-card p-4 flex justify-between items-center sticky top-0 z-10 border-b border-dark-border md:hidden">
    <img
      src={whiteLabelSettings.isEnabled && whiteLabelSettings.logoUrl ? whiteLabelSettings.logoUrl : logoSrc}
      alt={whiteLabelSettings.isEnabled && whiteLabelSettings.brandName ? `${whiteLabelSettings.brandName} Logo` : "Releasio Logo"}
      className="h-10"
    />
    <div className="flex items-center space-x-4">
        <button onClick={onOpenArtistSwitcher} aria-label="Switch artist">
            <UsersIcon className="w-6 h-6 text-medium-text hover:text-light-text transition-colors" />
        </button>
        <button onClick={() => setView('settings')} aria-label="Open connections and settings">
            <SettingsIcon className="w-6 h-6 text-medium-text hover:text-light-text transition-colors" />
        </button>
        <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full"
        />
    </div>
  </header>
);
