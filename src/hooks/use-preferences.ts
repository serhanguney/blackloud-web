'use client';

import { useSyncExternalStore } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

const subscribeToMediaQuery = (query: string) => (onChange: () => void) => {
  const mql = window.matchMedia(query);
  mql.addEventListener('change', onChange);
  return () => mql.removeEventListener('change', onChange);
};

const subscribeToReducedMotion = subscribeToMediaQuery(REDUCED_MOTION);
const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;
const getReducedMotionOnServer = () => false;

export const usePrefersReducedMotion = (): boolean =>
  useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, getReducedMotionOnServer);

const subscribeToVisibility = (onChange: () => void) => {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
};

const getVisibility = () => document.visibilityState;
const getVisibilityOnServer = (): DocumentVisibilityState => 'visible';

export const useDocumentVisibility = (): DocumentVisibilityState =>
  useSyncExternalStore(subscribeToVisibility, getVisibility, getVisibilityOnServer);
