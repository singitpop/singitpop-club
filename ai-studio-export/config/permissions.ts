
export type TeamMemberRole = 'Admin' | 'Manager' | 'A&R' | 'Marketing' | 'Finance' | 'Publicist';

export const PERMISSION_CATEGORIES = {
  'Core': {
    'dashboard': 'View Dashboard',
    'releases': 'View & Manage Releases',
    'analytics': 'View Analytics',
    'playlists': 'Manage Playlists',
  },
  'Creative AI': {
    'creative-studio': 'Access A&R Studio',
    'promo-generator': 'Generate Promo Posts',
    'video-teaser': 'Generate Video Teasers',
    'promo-video': 'Generate Promo Clips',
    'cover-art-designer': 'Use Cover Art Prompt Generator',
    'lyric-storyboard': 'Use Lyric Storyboard & VJ Kit',
    'full-lyric-video': 'Generate Full Lyric Videos',
    'creative-prompt-assistant': 'Use Creative Prompt Assistant',
    'hype-reel': 'Generate Hype Reels',
    'album-visual-suite': 'Generate Album Visual Suites',
    'reelsync': 'Use ReelSync',
    'lyric-lab': 'Use Lyric Lab',
    'sound-lab': 'Use Sound Lab',
    'idea-locker': 'Use Idea Locker',
  },
  'Branding & Persona': {
    'branding': 'Manage Branding Kit',
    'brand-brain': 'Use Brand Brain',
    'visual-identity': 'Generate Visual Identities',
  },
  'Growth & Marketing': {
    'outreach': 'Manage Outreach Campaigns',
    'smart-link': 'Manage Smart Links',
    'fan-persona': 'Generate Fan Personas',
    'marketing-campaign': 'Build Marketing Campaigns',
    'fan-appreciation': 'Use Fan Appreciation Tools',
    'advertising-guru': 'Use AI Ad Builder',
    'collaboration-finder': 'Use Collaboration Finder',
    'spotify-pitch-builder': 'Use Spotify Pitch Builder',
    'media-training': 'Use Media Training',
  },
  'Label Tools': {
    'tour-support': 'Manage Tour Support',
    'stage-designer': 'Use Stage Designer',
    'roster-health': 'View Roster Health',
    'reporting-suite': 'Use AI Reporting Suite',
    'song-similarity-map': 'Use Song Similarity Map',
    'press-page-builder': 'Use Press Page Builder',
    'epk-builder': 'Use EPK Builder',
    'circles': 'Access Artist Circles',
    'calendar': 'View Team Calendar',
    'timeline': 'View Multi-Artist Timeline',
    'activity-log': 'View Activity Log',
  },
  'Account Administration': {
    'settings': 'Manage Artist Settings',
    'team-management': 'Manage Team Members & Permissions',
  }
} as const;

const allPermissions = Object.assign({}, 
    PERMISSION_CATEGORIES['Core'],
    PERMISSION_CATEGORIES['Creative AI'],
    PERMISSION_CATEGORIES['Branding & Persona'],
    PERMISSION_CATEGORIES['Growth & Marketing'],
    PERMISSION_CATEGORIES['Label Tools'],
    PERMISSION_CATEGORIES['Account Administration']
);

export type Permission = keyof typeof allPermissions;

export const ALL_PERMISSIONS = Object.keys(allPermissions) as Permission[];

export const ROLE_PRESETS: Record<TeamMemberRole, Permission[]> = {
  'Admin': ALL_PERMISSIONS,
  'Manager': [
    'dashboard', 'releases', 'analytics', 'playlists', 'calendar', 'timeline',
    'creative-studio', 'promo-generator', 'video-teaser', 'promo-video', 'cover-art-designer', 'lyric-storyboard', 'full-lyric-video', 'creative-prompt-assistant', 'hype-reel', 'album-visual-suite', 'reelsync', 'lyric-lab', 'sound-lab', 'idea-locker',
    'branding', 'brand-brain', 'visual-identity',
    'outreach', 'smart-link', 'fan-persona', 'marketing-campaign', 'fan-appreciation', 'advertising-guru', 'collaboration-finder', 'spotify-pitch-builder', 'media-training',
    'reporting-suite', 'tour-support', 'stage-designer',
    'settings'
  ],
  'Marketing': [
    'dashboard', 'releases', 'analytics', 'playlists',
    'creative-studio', 'promo-generator', 'video-teaser', 'promo-video', 'cover-art-designer', 'lyric-storyboard', 'creative-prompt-assistant', 'hype-reel', 'lyric-lab', 'sound-lab',
    'brand-brain', 'visual-identity',
    'outreach', 'smart-link', 'fan-persona', 'marketing-campaign', 'fan-appreciation', 'advertising-guru', 'spotify-pitch-builder',
  ],
  'A&R': [
    'dashboard', 'releases', 'analytics', 'playlists',
    'creative-studio', 'collaboration-finder', 'song-similarity-map', 'roster-health', 'lyric-lab', 'sound-lab', 'idea-locker'
  ],
  'Finance': [
    'dashboard', 'analytics', 'reporting-suite'
  ],
  'Publicist': [
    'dashboard', 'releases', 'outreach', 'epk-builder', 'press-page-builder', 'promo-generator', 'smart-link', 'spotify-pitch-builder', 'media-training'
  ],
};
