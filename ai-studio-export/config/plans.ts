
import { PlanName, PlanFeatures } from '../types';

export const PLAN_LIMITS: Record<PlanName, PlanFeatures> = {
  Free: {
    releases: 1,
    promoGenerations: 5, // Per month, simulated on client
    advancedAnalytics: false,
    socialScheduling: false,
    teamManagement: false,
    teamMembers: 1,
    tourSupport: false,
    lyricSyncing: false,
    releaseAmplifier: false,
  },
  Pro: {
    releases: Infinity,
    promoGenerations: Infinity,
    advancedAnalytics: true,
    socialScheduling: true,
    teamManagement: false,
    teamMembers: 1,
    tourSupport: true,
    lyricSyncing: true,
    releaseAmplifier: true,
  },
  Agency: {
    releases: Infinity,
    promoGenerations: Infinity,
    advancedAnalytics: true,
    socialScheduling: true,
    teamManagement: true,
    teamMembers: 5,
    tourSupport: true,
    lyricSyncing: true,
    releaseAmplifier: true,
  },
};
