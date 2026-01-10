
import React from 'react';
import { Permission, TeamMemberRole } from './config/permissions';

export type CreativeDna = {
  isEnabled: boolean;
  summary: string;
  lastUpdatedAt: string;
};

export type SustainabilityData = {
  merch: {
    percentageSustainable: number;
    supplierInfo: string;
  };
  touring: {
    co2OffsetTonnes: number;
    offsetProvider: string;
  };
  impactScore: number; // 0-100
  aiImpactStatement?: string;
};

export type PlatformConnections = {
  youtube: boolean;
  instagram: boolean;
  tiktok: boolean;
  x: boolean;
  facebook: boolean;
};

export type Artist = {
  id: number;
  name: string;
  avatarUrl: string;
  isArchived?: boolean;
  isSetupComplete?: boolean;
  genre?: string;
  verificationStatus: 'unverified' | 'pending' | 'verified';
  creativeDna?: CreativeDna;
  sustainability?: SustainabilityData;
  platformConnections?: PlatformConnections;
  platformUrls?: Partial<Record<keyof PlatformConnections, string>>;
};

export type StoryboardClip = {
    id: number;
    lyric: string;
    prompt?: string;
    isGenerating?: boolean;
};

export type SongSection = {
    title: string;
    directorNote: string;
    clips: StoryboardClip[];
};

export type HypeReelStyle = 'Classic Waveform' | 'Kinetic Typography' | 'Cover Art Focus';
export type HypeReelCTA = 'Pre-Save Now' | 'Listen Now' | 'Out Now' | 'Link in Bio';

export type HypeReelBrief = {
    releaseId: number;
    trackId: number;
    style: HypeReelStyle;
    cta: HypeReelCTA;
    aspectRatio: '9:16' | '1:1';
};

export type ShortVideoEdit = {
    id: number;
    duration: 15 | 30 | 60;
    url?: string;
    prompt?: string; 
};

export type LyricCard = {
    id: number;
    lyric: string;
    imageUrl: string;
    isGenerating?: boolean;
};

export type FanPersona = {
    avatarUrl: string;
    name: string;
    demographics: string;
    bio: string;
    musicHabits: string[];
    connection: string;
    marketingTips: string[];
    avatarPrompt?: string;
};

export type SoundProfile = {
    vibeTags: string[];
    estimatedBpm: string;
    estimatedKey: string;
    similarArtists: string[];
    playlistFit: string[];
    curatorPitch: string;
};

export type Track = {
  id: number;
  title: string;
  mp3Url: string;
  masterWavUrl: string;
  lyrics: string;
  lyricSyncStatus?: 'Not Synced' | 'Syncing' | 'Synced' | 'Error';
  genreAnalysis?: {
    primaryGenre: string;
    subGenres: string[];
  };
  moodKeywords?: string[];
  musicalWorkId?: number;
  structuredStoryboard?: SongSection[];
  fullLyricVideoScript?: string;
  fullLyricVideoUrl?: string;
  hypeReels?: Array<{ id: number; url?: string; prompt?: string; brief: Omit<HypeReelBrief, 'releaseId' | 'trackId'> }>;
  shortVideoEdits?: ShortVideoEdit[];
  lyricCards?: LyricCard[];
  stems?: Array<{ name: string; url: string }>;
  sampleClearance?: { status: 'Not Scanned' | 'Scanning' | 'Clear' | 'Flagged'; report?: string };
  inspiredLoops?: Array<{ name: string }>;
  soundProfile?: SoundProfile;
};

export type Writer = {
    id: number;
    name: string;
    ipiNumber?: string;
};

export type SyncOpportunity = {
    id: number;
    title: string;
    company: string;
    type: 'Film' | 'TV Show' | 'Video Game' | 'Advertisement';
    description: string;
    budget: string;
    pitchEmail?: string;
    isHighMatch?: boolean;
    suggestedTrackId?: number;
};

export type Split = {
    writerId: number;
    percentage: number;
};

export type MusicalWork = {
    id: number;
    artistId: number;
    title: string;
    writers: Writer[];
    iswc?: string; 
    registrationStatus: 'Not Registered' | 'Draft' | 'Registered';
    syncOpportunities?: SyncOpportunity[];
    splits: Split[];
};

export type VisualIdentity = {
    vibeKeywords: string[];
    colorPalette: string[];
    fontPairings: {
        headline: string;
        body: string;
    };
    moodboardPrompt: string; 
    moodboardUrl?: string; 
    coverConcepts: string[]; 
};

export type AlbumVisualSuite = {
    mainCoverArtOptions: string[];
    selectedCoverArtUrl?: string;
    trackVisuals: Array<{
        trackId: number;
        imageUrl: string;
    }>;
    banners: {
        spotify?: string;
        youtube?: string;
        x?: string;
    };
};

export type CampaignTaskType = 'Social' | 'Content' | 'Outreach' | 'Engagement' | 'Ad';
export type CampaignTaskStatus = 'Todo' | 'In Progress' | 'Done';
export type SuggestedTool = 'promo-generator' | 'video-teaser' | 'promo-video' | 'outreach' | 'smart-link' | 'cover-art-designer' | 'lyric-storyboard';

export type CampaignTask = {
  id: number;
  type: CampaignTaskType;
  timing: string;
  title: string;
  description: string;
  suggestedTool?: SuggestedTool;
  status: CampaignTaskStatus;
};

export type MarketingCampaign = {
  preRelease: CampaignTask[];
  releaseWeek: CampaignTask[];
  postRelease: CampaignTask[];
};

export type Collaborator = {
    id: number;
    name: string;
    role: 'Producer' | 'Featured Artist' | 'Remixer' | 'Session Musician';
    email: string;
};

export type EPKContent = {
    bio: string;
    highlights: string[];
    sound: string;
};

export type FanReaction = {
  id: number;
  releaseId: number;
  fanName: string;
  location: string;
  mediaUrl: string;
  mediaType: 'audio' | 'video';
  transcription?: string;
  isApproved: boolean | null;
  isFeatured: boolean;
};

export type ProductType = 'Physical' | 'DigitalAlbum' | 'Bundle' | 'DigitalCollectible';

export type Product = {
    id: number;
    releaseId: number;
    type: ProductType;
    name: string;
    price: number; // in cents
    description: string;
    imageUrl: string;
    status: 'Draft' | 'Scheduled' | 'Live' | 'Archived';
    stock?: number;
    liveDate?: string;
    sourceMerchDesignId?: number;
    bundledProductIds?: number[];
    sourceLyric?: string;
    trackTitle?: string;
};

export type MerchDesign = {
    id: number;
    type: 'T-Shirt' | 'Hoodie' | 'Poster';
    mockupUrl: string;
    designPrompt: string;
};

export type MasterSplit = {
    collaboratorId: number;
    percentage: number;
};

export type RoyaltyEntry = {
    month: string;
    earnings: number;
};

export type Release = {
  id: number;
  artistId: number;
  artist: string;
  title: string;
  type: 'Single' | 'EP' | 'Album';
  releaseDate: string;
  coverArtUrl: string; 
  genre: string;
  tracks: Track[];
  isFavorite?: boolean;
  smartLinkPath?: string;
  videoTeaserUrl?: string;
  videoTeaserPrompt?: string;
  promoClips?: Array<{ id: number; url?: string; prompt: string; }>;
  visualIdentity?: VisualIdentity;
  marketingCampaign?: MarketingCampaign;
  isExplicit?: boolean;
  source?: 'manual' | 'imported';
  isCover?: boolean;
  originalArtist?: string;
  originalSongTitle?: string;
  liveStatus?: 'Pending' | 'Monitoring' | 'Live';
  albumVisualSuite?: AlbumVisualSuite;
  epkContent?: EPKContent;
  fanReactions?: FanReaction[];
  distributionStatus?: 'Draft' | 'Submitting' | 'In Review' | 'Live';
  products?: Product[];
  merchDesigns?: MerchDesign[];
  masterSplits?: MasterSplit[];
  royaltyData?: RoyaltyEntry[];
  mechanicalLicenseStatus?: 'Not Required' | 'Required' | 'Secured';
};

export type EditableReleaseDetails = {
  artist: string;
  title: string;
  genre: string;
  releaseDate: string;
};

export type EditableTrackDetails = {
  title: string;
  lyrics: string;
};

export type Playlist = {
  id: number;
  name:string;
  description?: string;
  releaseIds: number[];
  isAiGenerated?: boolean;
  syncStatus?: 'Not Synced' | 'Syncing' | 'Synced';
};

export type SocialPostStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Posted' | 'Changes Requested' | 'Scheduled';

export type SocialPost = {
  id: number;
  platform: 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'X';
  content: string;
  scheduledTime: string;
  releaseId: number;
  status: SocialPostStatus;
};

export type FacebookAnalytics = {
    followers: number;
    pageLikes: number;
    reach: number;
    visits: number;
    topPosts: { id: number; content: string; views: number }[];
};

export type YouTubeAnalytics = {
    views: number;
    subscribers: number;
    watchHours: number;
    topVideos: { id: number; title: string; views: number; platform: 'youtube' }[];
};

export type TikTokAnalytics = {
    views: number;
    followers: number;
    shares: number;
    topVideos: { id: number; title: string; views: number; platform: 'tiktok' }[];
};

export type InstagramAnalytics = {
    followers: number;
    engagementRate: string;
};

export type AudienceAnalytics = {
    gender: { name: string; value: number }[];
    age: { name: string; value: number }[];
    topCities: { city: string; country: string; listeners: number }[];
};

export type AnalyticsData = {
    careerStage: 'Undiscovered' | 'Developing' | 'Mid-Level' | 'Mainstream' | 'Superstar' | 'Legendary';
    facebook: FacebookAnalytics;
    youtube: YouTubeAnalytics;
    tiktok: TikTokAnalytics;
    instagram: InstagramAnalytics;
    audience: AudienceAnalytics;
    chartPositions: string[];
};

export type PromoAssets = {
  instagramPost: string;
  tiktokPost: string;
  facebookPost: string;
  xPost: string;
  youtubeShortsPost: string;
};

export type PlanName = 'Free' | 'Pro' | 'Agency';

export type View = 'dashboard' | 'releases' | 'analytics' | 'playlists' | 'promo-generator' | 'release-details' | 'playlist-details' | 'settings' | 'team-management' | 'calendar' | 'video-teaser' | 'smart-link' | 'artists' | 'outreach' | 'visual-identity' | 'tour-planner' | 'promo-video' | 'fan-persona' | 'marketing-campaign' | 'fan-appreciation' | 'cover-art-designer' | 'artist-submission' | 'artist-approval' | 'publishing' | 'website' | 'fan-hub' | 'brand-brain' | 'branding' | 'lyric-storyboard' | 'creative-studio' | 'creative-prompt-assistant' | 'full-lyric-video' | 'hype-reel' | 'reelsync' | 'album-visual-suite' | 'content-pack-builder' | 'activity-log' | 'timeline' | 'help' | 'knowledge-hub' | 'epk-builder' | 'campaign-performance' | 'collaboration-finder' | 'song-similarity-map' | 'press-page-builder' | 'events-calendar' | 'campaign-coach' | 'artist-knowledge-graph' | 'brand-collab-kit' | 'contract-hub' | 'live-performance' | 'ai-workforce' | 'advertising-guru' | 'sync-opportunities' | 'reporting-suite' | 'api-integrations' | 'roster-health' | 'work-details' | 'circles' | 'circle-details' | 'lyric-cards' | 'songwriting-assistant' | 'release-wizard' | 'release-amplifier' | 'sustainability' | 'business-toolkit' | 'admin' | 'event-page' | 'fan-reaction-wall' | 'billing' | 'lyric-lab' | 'sound-lab' | 'media-training' | 'stage-designer' | 'idea-locker' | 'spotify-pitch-builder' | 'contract-scanner' | 'listening-panel' | 'spotify-canvas' | 'tour-profit-calculator' | 'remix-contest-builder' | 'voiceover-studio' | 'venue-scout' | 'release-day-war-room' | 'content-multiplier';

export type DistributorConnections = {
    distrokid: { connected: boolean };
    tunecore: { connected: boolean };
    cdbaby: { connected: boolean };
    amuse: { connected: boolean };
};

export type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: TeamMemberRole;
  permissions: Permission[];
  avatarUrl: string;
  artistIds: number[];
};

export type PlanFeatures = {
  releases: number;
  promoGenerations: number;
  advancedAnalytics: boolean;
  socialScheduling: boolean;
  teamManagement: boolean;
  teamMembers: number;
  tourSupport: boolean;
  lyricSyncing: boolean;
  releaseAmplifier: boolean;
};

export type ApiKey = {
    id: string;
    name: string;
    key: string;
    created: string;
};

export type ThemeName = 'default' | 'sunset' | 'ocean' | 'forest';

export type UserPreferences = {
    mode: 'light' | 'dark';
    theme: ThemeName;
    notifications: {
        weeklySummary: boolean;
        releaseUpdates: boolean;
        newFollowers: boolean;
    };
};

export type ArtistCircle = {
    id: number;
    name: string;
    description: string;
    genre: string;
    memberIds: number[];
    isPrivate: boolean;
    createdAt: string;
};

export type CirclePost = {
    id: number;
    circleId: number;
    authorId: number;
    content: string;
    timestamp: string;
    comments: CircleComment[];
};

export type CircleComment = {
    id: number;
    authorId: number;
    content: string;
    timestamp: string;
};

export type CommunityEvent = {
    id: number;
    title: string;
    description: string;
    dateTime: string;
    eventType: 'Webinar' | 'Q&A' | 'Showcase' | 'Listening Party';
    presenter: string;
    rsvpLink?: string;
    videoUrl?: string;
    tags: string[];
    durationMinutes: number;
    format: 'Live' | 'On-Demand';
};

export type FanClubTier = {
    id: number;
    name: string;
    perks: string[];
    price: number; // in cents
};

export type FanClubMember = {
    id: number;
    name: string;
    email: string;
    joinDate: string;
    avatarUrl: string;
    leaderboardData?: {
        points: number;
        engagementScore: number;
        rank: number;
    };
    badges?: { badgeId: string, earnedDate: string }[];
    tierId?: number;
};

export type Badge = {
    id: string;
    name: string;
    description: string;
    icon: string;
};

export type FanMilestone = {
    id: number;
    fanId: number;
    type: 'Stream Count' | 'Engagement' | 'Anniversary';
    description: string;
    message: string;
};

export type FanPost = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    scheduledFor?: string;
    status: 'Draft' | 'Scheduled' | 'Posted';
    comments: FanComment[];
    tierIds?: number[];
};

export type FanComment = {
    id: number;
    authorName: string;
    authorAvatarUrl: string;
    text: string;
    createdAt: string;
};

export type MockFanComment = {
    id: number;
    platform: 'Instagram' | 'TikTok' | 'YouTube' | 'X';
    author: string;
    avatarUrl: string;
    content: string;
    hasReplied: boolean;
};

export type ChatbotPersona = {
    name: string;
    tone: string;
    knowledgeBase: string[];
    greeting: string;
};

export type FanClubSettings = {
    aiModerationEnabled: boolean;
};

export type FanClubTerms = {
    hasAgreed: boolean;
};

export type AIPersona = {
    backstory: string;
    systemPrompt: string;
};

export type BrandBrainMessage = {
    role: 'user' | 'model';
    content: string;
};

export type ColorPalette = {
    primary: string;
    secondary: string;
    accent1: string;
    accent2: string;
    neutral: string;
};

export type BrandingKit = {
    sourceImageUrl: string;
    palette: ColorPalette;
    vibeKeywords: string[];
    fontSuggestions?: { headline: string; body: string };
};

export type OutreachContact = {
    id: number;
    name: string;
    type: 'Playlist' | 'Radio Station' | 'Blog' | 'Influencer';
    spotifyUrl?: string;
    email: string;
    status: 'Not Contacted' | 'Pitch Sent' | 'Follow-up Sent' | 'Opened' | 'Replied' | 'Added' | 'Rejected' | 'Do Not Contact';
    notes: string;
    lastContactedDate: string | null;
    pitchEmail?: string;
    openCount: number;
    replyCount: number;
    releaseTitle?: string;
};

export type OutreachCampaign = {
    id: number;
    releaseId: number;
    contacts: OutreachContact[];
};

export type InboxMessage = {
    id: number;
    fromName: string;
    fromEmail: string;
    subject: string;
    body: string;
    date: string;
    read: boolean;
};

export type LocalIntel = {
    contacts: Array<{ id: number; name: string; type: string; description: string; pitchDraft?: string }>;
    localSpotsMarkdown: string;
    groundingChunks?: Array<{ title: string; uri: string }>;
};

export type TourStop = {
    id: number;
    city: string;
    venue: string;
    date: string;
    status: 'Pending' | 'Confirmed' | 'Completed';
    aiSetlist?: { setlist: string[]; rationale: string };
    aiShowVisualsUrl?: string;
};

export type TourContact = {
    id: number;
    name: string;
    role: string;
    type?: string;
    email?: string;
    description?: string;
    pitchDraft?: string;
};

export type CoverArtStyle = 'Minimalist & Clean' | 'Vintage & Grainy' | 'Surreal & Abstract' | 'Bold & Graphic' | 'Dark & Moody' | 'Psychedelic & Trippy';

export type CoverArtBrief = {
    artist: string;
    title: string;
    genre: string;
    style: CoverArtStyle;
    prompt: string;
    colorVibe: string;
    noText: boolean;
    includeAdvisorySticker: boolean;
};

export type FanWrappedData = {
    fanName: string;
    minutesListened: number;
    topSong: string;
    firstListenDate: string;
    listenerPercentile: number;
    thankYouMessage: string;
};

export type AIPlaylist = {
    name: string;
    description: string;
    trackIds: number[];
};

export type ContractParty = {
    id: number;
    name: string;
    email: string;
    role: 'Artist' | 'Producer' | 'Label' | 'Collaborator';
    signedAt?: string;
};

export type Contract = {
    id: number;
    artistId: number;
    title: string;
    type: 'Split Sheet' | 'Feature Agreement' | 'Remix Agreement' | 'Producer Agreement';
    status: 'Draft' | 'Out for Signature' | 'Signed';
    parties: ContractParty[];
    content: string;
    createdAt: string;
};

export type Task = {
    id: number;
    title: string;
    completed: boolean;
    releaseId: number;
};

export type Comment = {
    id: number;
    author: string;
    avatarUrl: string;
    text: string;
    timestamp: string;
};

export type AssetCategory = 'Audio Masters' | 'Artwork' | 'Press Photos';

export type AssetFile = {
    id: number;
    name: string;
    url: string;
    dateAdded: string;
};

export type CalendarEvent = {
    id: string;
    date: Date;
    type: 'Release' | 'Social Post' | 'Tour Stop' | 'Grant Deadline';
    title: string;
    artistName: string;
};

export type WhiteLabelSettings = {
    isEnabled: boolean;
    brandName: string;
    logoUrl: string;
    primaryColor: string;
    lightColor: string;
    darkColor: string;
};

export type ActivityLog = {
    id: number;
    timestamp: string;
    teamMemberId: number;
    artistId: number;
    action: string;
    details?: string;
    referenceId?: number;
    referenceType?: 'release' | 'task' | 'campaign';
};

export type AutomationRuleTrigger = 'new_release' | 'new_social_post' | 'new_follower_milestone';
export type AutomationRuleAction = 'create_task_checklist' | 'draft_social_post' | 'send_email_notification' | 'require_approval';

export type AutomationRule = {
    id: number;
    name: string;
    description: string;
    trigger: AutomationRuleTrigger;
    action: AutomationRuleAction;
    isEnabled: boolean;
};

export type CampaignPerformanceData = {
    releaseId: number;
    preRelease: {
        preSaves: number;
        hypeScore: number; 
        announcementEngagement: string;
        topContent: PerformanceContentItem[];
    };
    postRelease: {
        firstWeekStreams: number;
        playlistAdds: number;
        listenerGrowth: string;
        topContent: PerformanceContentItem[];
        topPerformingTrack: { title: string; streams: number };
    };
};

export type PerformanceContentItem = {
    id: number;
    type: 'Social Post' | 'Video Clip' | 'Ad Campaign';
    platform: string;
    title: string;
    metricLabel: string;
    metricValue: string;
};

export type RosterHealthMetrics = {
    followerGrowth: number;
    lastReleaseDaysAgo: number;
    avgReleasesPerYear: number;
    lastActivityDaysAgo: number;
    healthScore: number;
};

export type RosterForecastReport = {
    summary: string;
    totalForecastedRevenue: number;
    projectedRoi: number;
    breakoutArtistId: number;
    artistForecasts: Array<{
        artistId: number;
        artistName: string;
        forecastedRevenue: number;
        suggestedBudget: number;
        keyDrivers: string[];
    }>;
};

export type SongSimilarityMapData = {
    artistTrack: { title: string; artist: string; x: number; y: number };
    trendingTracks: Array<{ title: string; artist: string; x: number; y: number }>;
    analysis: string;
};

export type CoachingActionType = 'GENERATE_CAPTION' | 'CREATE_CLIP' | 'ADJUST_BUDGET' | 'REPLY_TO_COMMENTS';

export type CoachingSuggestion = {
    id: string;
    category: 'Engagement' | 'Growth' | 'Monetization' | 'Content';
    observation: string;
    suggestion: string;
    action: {
        type: CoachingActionType;
        label: string;
        payload: any;
    };
};

export type KnowledgeGraphNode = {
    id: string;
    label: string;
    type: 'artist' | 'release' | 'genre' | 'collaborator' | 'mood' | 'similar_artist' | 'audience';
    x: number;
    y: number;
};

export type KnowledgeGraphEdge = {
    source: string;
    target: string;
    label?: string;
};

export type KnowledgeGraphData = {
    nodes: KnowledgeGraphNode[];
    edges: KnowledgeGraphEdge[];
};

export type KnowledgeGraphInsights = {
    summary: string;
    recommendations: string[];
};

export type BrandCollabKitContent = {
    bio: string;
    audienceDescription: string;
    collaborationHighlights: string[];
};

export type AdCampaignCreative = {
    adCopy: string[];
    adVisuals: string[]; // URLs to image placeholders
    targetingProfile: {
        locations: string[];
        ageRange: string;
        interests: string[];
    };
};

export type GeoAdOpportunity = {
    city: string;
    eventName: string;
    rationale: string;
    suggestedCopy: string;
    sources: Array<{ title: string; uri: string }>;
};

export type LearningModule = {
    title: string;
    icon: React.ReactNode;
    content: string;
};

export type LearningCategory = {
    category: string;
    modules: LearningModule[];
};

export type Certification = {
    id: string;
    title: string;
    description: string;
    badgeIcon: React.ReactNode;
    requiredModules: string[];
};

export type AutomatedTask = {
    id: string;
    name: string;
    description: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    isEnabled: boolean;
};

export type VirtualEmployeeRole = 'Social Media Manager' | 'Data Analyst' | 'A&R Scout';

export type VirtualEmployee = {
    id: number;
    name: string;
    role: VirtualEmployeeRole;
    avatarUrl: string;
    artistIds: number[];
    tasks: AutomatedTask[];
};

export type AIActivityLog = {
    id: number;
    timestamp: string;
    employeeId: number;
    artistId: number;
    taskName: string;
    summary: string;
};

export type LiveEvent = {
    id: number;
    artistId: number;
    title: string;
    date: string;
    venue: string;
    city: string;
    description: string;
    imageUrl: string;
    ticketUrl: string;
    rsvpEnabled: boolean;
    eventPagePath: string;
    rsvps: Array<{ fanName: string; fanEmail: string }>;
};

export type TrendReport = {
    tiktok: { hashtags: string[]; contentIdeas: string[]; trendingAudio?: {title: string, artist: string}[] };
    instagram: { hashtags: string[]; contentIdeas: string[] };
    x: { hashtags: string[]; contentIdeas: string[] };
    youtube: { hashtags: string[]; contentIdeas: string[] };
    spotify: { hashtags: string[]; contentIdeas: string[] };
};

export type GenreTrendPulse = Array<{
    subGenre: string;
    description: string;
    sonicElements: string[];
    exampleArtists: string[];
}>;

export type ProactiveTrendInsight = {
    id: string;
    title: string;
    description: string;
    actionableIdeas: string[];
};

export type ScoutedArtist = {
    id: number;
    name: string;
    genre: string;
    location: string;
    socials: Array<{ platform: string; url: string; handle: string }>;
    aiAnalysis: string;
    keyMetrics: { followerGrowth: string; engagementRate: string };
    outreachDraft?: string;
};

export type TourRouteSuggestion = {
    summary: string;
    route: Array<{ city: string; venue: string; rationale: string }>;
};

export type FundingOpportunity = {
    id: number;
    title: string;
    funder: string;
    amount: string;
    deadline: string;
    description: string;
    url: string;
    sources: Array<{ title: string; uri: string }>;
};

export type RoyaltyForecast = {
    summary: string;
    forecastedMonths: Array<{ month: string; earnings: number; type: 'Historical' | 'Forecast' }>;
    keyDrivers: string[];
    totalForecastedRevenue: number;
    projectedRoi: number;
};

export type Payout = {
    collaboratorId: number;
    releaseId: number;
    releaseTitle: string;
    earnings: number;
    splitPercentage: number;
    payoutAmount: number;
};

export type PayoutSummary = {
    month: string;
    totalEarnings: number;
    totalPayouts: number;
    artistNet: number;
    payouts: Payout[];
};

export type PaymentSettings = {
    stripe: { status: 'connected' | 'disconnected' };
    paypal: { status: 'connected' | 'disconnected' };
    primaryPaymentMethod: 'stripe' | 'paypal' | null;
};

export type BudgetItem = {
    category: string;
    amount: number;
    percentage: number;
    description: string;
    forecast: string;
};

export type BudgetPlan = {
    summary: string;
    items: BudgetItem[];
};

export type PromoCode = {
    id: number;
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    status: 'active' | 'inactive' | 'expired';
    usageCount: number;
    endDate?: string;
};

export type CommissionSettings = {
    isOpen: boolean;
    price: number;
};

export type SongCommission = {
    id: number;
    fanName: string;
    request: string;
    status: 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Rejected';
    price: number;
};

export type AffiliateStats = {
    clicks: number;
    signups: number;
    conversionRate: number;
    pendingEarnings: number;
    paidEarnings: number;
};

export type AffiliateReferral = {
    id: number;
    date: string;
    status: 'Pending' | 'Converted' | 'Paid';
    earnings: number;
};

export type LyricDraft = {
    id: number;
    title: string;
    content: string;
    lastUpdated: string;
};

export type StageDesignConfig = {
    venueType: 'Club' | 'Theater' | 'Arena' | 'Festival';
    vibe: string;
    lightingPreference: string;
};

export type InterviewPersona = {
    id: string;
    name: string;
    role: string;
    style: string;
    avatarUrl?: string;
};

export type VoiceMemo = {
    id: number;
    title: string;
    transcription: string;
    tags: string[];
    date: string;
    sentiment: string;
    audioBlob?: Blob;
};

export type Venue = {
    name: string;
    address: string;
    rating: string;
    mapsUri?: string;
};

export type WarRoomChecklist = {
    time: string;
    task: string;
    status: 'pending' | 'done';
}[];

export type ContentPiece = {
    id: string;
    day: number;
    platform: 'TikTok' | 'Instagram' | 'X' | 'YouTube' | 'Email' | 'LinkedIn';
    format: string;
    angle: string;
    content: string;
};

export type ContentWaterfallStrategy = {
    sourceTitle: string;
    pieces: ContentPiece[];
};
