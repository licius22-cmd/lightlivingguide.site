import React, { useState, useEffect, useRef } from 'react';
import { quizSteps } from './data/quizData';

// Inline SVG Icon Component for high-quality, crisp vectors
function SvgIcon({ name }) {
  const icons = {
    male: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    female: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 11v6m-3-3h6" />
      </svg>
    ),
    fatigue: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <line x1="6" y1="11" x2="6" y2="13" />
      </svg>
    ),
    calendar: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    dazed: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm1-5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        <path d="M8 9h.01M16 9h.01" strokeWidth="3" />
      </svg>
    ),
    worry: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    mood: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    harmony: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" fillOpacity="0.1" />
        <circle cx="12" cy="7" r="1" fill="currentColor" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
    compliments: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    insecurity: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 9.9-1" />
      </svg>
    ),
    analyze: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="11" y1="8" x2="11" y2="14" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    others: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    low_energy: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
        <line x1="22" y1="11" x2="22" y2="13" />
        <line x1="6" y1="10" x2="6" y2="14" strokeWidth="3" />
      </svg>
    ),
    emotional_exhaustion: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        <line x1="12" y1="7" x2="12" y2="15" />
        <line x1="8" y1="11" x2="16" y2="11" />
      </svg>
    ),
    overthinking: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.88A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.88A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    ),
    irritability: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5-2 4-2 4 2 4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
        <path d="M5 5l2 2M19 5l-2 2" />
      </svg>
    ),
    fine: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 13s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
      </svg>
    ),
    phone: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="3" />
      </svg>
    ),
    coffee: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    shower: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v2H4V4zM7 6v14a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3V6" />
        <path d="M12 10v4" />
      </svg>
    ),
    shoe: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 16h18M13 8l-3 4-3-4" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </svg>
    ),
    clock: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    lock: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    sweets: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 8a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-6 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4-5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
      </svg>
    ),
    bed: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
      </svg>
    ),
    nail: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    tv: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="15" rx="2" ry="2" />
        <polyline points="12 18 12 21 8 21 16 21" />
      </svg>
    ),
    sleep_tired: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    sleep_wake: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
        <path d="M22 12h-2M4 12H2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
    sleep_poor: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <polyline points="18.7 8 13 14 9 10 4 15" />
      </svg>
    ),
    sleep_falling: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    sleep_early: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    sleep_good: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        <path d="M12 7h.01M16 11h.01" strokeWidth="3" />
      </svg>
    ),
    family: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    globe: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    appearance: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
        <path d="M12 2a7 7 0 0 0-7 7v4" />
      </svg>
    ),
    work: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    plus: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    ),
    calm: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M8 12h8" />
      </svg>
    ),
    focus: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    will: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    energy: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor" fillOpacity="0.2" />
      </svg>
    ),
    strength: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    shield_broken: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 5l-3 5h6l-3 5" />
      </svg>
    ),
    resilience: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12M12 12c-2 0-5-1.5-5-4.5S9.5 3 12 3s5 1.5 5 4.5-3 4.5-5 4.5z" />
      </svg>
    ),
    target: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    brain: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.88 2.5 2.5 0 0 1 0-3.88A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.88 2.5 2.5 0 0 0 0-3.88A2.5 2.5 0 0 0 14.5 2z" />
      </svg>
    ),
    trust: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    book: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
      </svg>
    ),
    doctor: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    other: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
      </svg>
    ),
    chevronLeft: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    lockAlt: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    check: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  };

  return icons[name] || (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export default function App() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [history, setHistory] = useState([]);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('4_weeks');
  const [openAccordion, setOpenAccordion] = useState(null);

  // Execute the full Hotmart script: load widget + CSS, create anchor, trigger checkout popup
  const openHotmartCheckout = () => {
    const urls = {
      '7_days': 'https://pay.hotmart.com/V106642514I?off=ekp41bit',
      '4_weeks': 'https://pay.hotmart.com/V106642514I?off=41i7spqr',
      '12_weeks': 'https://pay.hotmart.com/V106642514I?off=z7szf7sx'
    };
    const url = urls[selectedPlan];

    // 1. Create the anchor element
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.className = 'hotmart-fb hotmart__button-checkout';
    anchor.onclick = function() { return false; };
    document.body.appendChild(anchor);

    // 2. Load Hotmart CSS if not loaded yet
    if (!document.querySelector('link[href*="hotmart-fb.min.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'https://static.hotmart.com/css/hotmart-fb.min.css';
      document.head.appendChild(link);
    }

    // 3. Load Hotmart widget script (fresh each time so it re-scans the DOM)
    const imported = document.createElement('script');
    imported.src = 'https://static.hotmart.com/checkout/widget.min.js';
    imported.type = 'text/javascript';
    imported.onload = () => {
      // After the script loads and binds to the anchor, trigger click
      setTimeout(() => {
        anchor.click();
      }, 300);
    };
    document.head.appendChild(imported);
  };

  // Validation errors
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');

  // Loading Analyzer Simulation States
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingStepsTexts = [
    'Analisando seu perfil de bem-estar...',
    'Calculando padrões de estresse...',
    'Alinhando recomendações de TCC...',
    'Estruturando seu cronograma personalizado...'
  ];

  const currentStep = quizSteps[currentStepIndex];

  // Auto-advance for single select questions
  const handleSelectOption = (stepId, value) => {
    // Save response
    const updatedAnswers = { ...answers, [stepId]: value };
    setAnswers(updatedAnswers);

    // Save navigation history
    setHistory([...history, currentStepIndex]);

    // Go to next step
    setCurrentStepIndex(currentStepIndex + 1);
  };

  // Multiple selection handlers
  const handleToggleMultiOption = (stepId, optionValue) => {
    const currentSelections = answers[stepId] || [];
    let updated;

    if (optionValue === 'perfeitamente_bem' || optionValue === 'durmo_bem') {
      // If "perfectly fine" is chosen, clear all other selections
      if (currentSelections.includes(optionValue)) {
        updated = [];
      } else {
        updated = [optionValue];
      }
    } else {
      // Remove "perfectly fine" or "durmo bem" if other things are chosen
      const base = currentSelections.filter(v => v !== 'perfeitamente_bem' && v !== 'durmo_bem');
      if (base.includes(optionValue)) {
        updated = base.filter(v => v !== optionValue);
      } else {
        updated = [...base, optionValue];
      }
    }

    setAnswers({ ...answers, [stepId]: updated });
  };

  // Continue to next page (for disclaimer, multiselect, transition screens)
  const handleContinue = () => {
    setHistory([...history, currentStepIndex]);
    setCurrentStepIndex(currentStepIndex + 1);
  };

  // Go back to previous page
  const handleBack = () => {
    if (history.length > 0) {
      const prevIndex = history[history.length - 1];
      setCurrentStepIndex(prevIndex);
      setHistory(history.slice(0, -1));
    }
  };

  // Email form submission validation
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Por favor, insira seu e-mail.');
    } else if (!emailRegex.test(email)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
      handleContinue();
    }
  };

  // Name form submission validation
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Por favor, insira seu nome.');
    } else {
      setNameError('');
      handleContinue();
    }
  };

  // Trigger loading analysis sequences
  useEffect(() => {
    if (currentStep.type === 'loading') {
      setLoadingStep(0);
      const timers = [];
      
      // Step 1 check
      timers.push(setTimeout(() => setLoadingStep(1), 1000));
      // Step 2 check
      timers.push(setTimeout(() => setLoadingStep(2), 2000));
      // Step 3 check
      timers.push(setTimeout(() => setLoadingStep(3), 3000));
      // Step 4 check
      timers.push(setTimeout(() => setLoadingStep(4), 4000));
      
      // Navigate to results page
      timers.push(setTimeout(() => {
        setHistory([...history, currentStepIndex]);
        setCurrentStepIndex(currentStepIndex + 1);
      }, 5000));

      return () => timers.forEach(clearTimeout);
    }
  }, [currentStepIndex]);

  // Calculate dynamic outputs for the Results screen based on user selections
  const getDynamicResultValue = (field) => {
    switch (field) {
      case 'dificuldade':
        const aspects = answers['q16'] || [];
        if (aspects.length > 0 && aspects[0] !== 'perfeitamente_bem') {
          // Return first chosen aspect capitalized
          const labelsMap = {
            energia_baixa: 'Energia baixa',
            preocupacao: 'Preocupação',
            exaustao: 'Exaustão emocional',
            overthinking: 'Pensar demais',
            irritabilidade: 'Irritabilidade'
          };
          return labelsMap[aspects[0]] || 'Pensamento excessivo';
        }
        return 'Pensamento excessivo';
      
      case 'periodo':
        const lastExcited = answers['q15'];
        if (lastExcited === 'algumas_semanas') return 'Algumas semanas';
        if (lastExcited === 'menos_ano') return 'Há meses';
        if (lastExcited === 'mais_ano') return 'Mais de 1 ano';
        return 'Indefinido';

      case 'gatilho':
        const worries = answers['q21'] || [];
        if (worries.length > 0 && worries[0] !== 'outro') {
          const worriesMap = {
            familia: 'Família/Relação',
            externas: 'Fatores externos',
            aparencia: 'Aparência física',
            sono: 'Falta de sono',
            profissional: 'Estresse no trabalho'
          };
          return worriesMap[worries[0]] || 'Família ou relacionamento';
        }
        return 'Família ou relacionamento';

      case 'energia':
        const tiredness = answers['q1'];
        if (tiredness === 'frequentemente') return 'Baixa';
        if (tiredness === 'as_vezes') return 'Moderada';
        return 'Normal';

      default:
        return '';
    }
  };

  // Determine title progress or bar percentage
  const totalQuizQuestions = 26;
  const isQuizStep = currentStep.stepNumber !== undefined;
  const progressPercent = isQuizStep ? (currentStep.stepNumber / totalQuizQuestions) * 100 : 0;

  // Custom visual components for different quiz screen layouts
  const renderScreenContent = () => {
    switch (currentStep.type) {
      case 'gender':
        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <span className="badge">{currentStep.badge}</span>
            <h1 className="title">{currentStep.title}</h1>
            <p className="subtitle">{currentStep.subtitle}</p>
            
            <div className="gender-options">
              {currentStep.options.map((opt) => (
                <div 
                  key={opt.value} 
                  className={`gender-card ${answers[currentStep.id] === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentStep.id, opt.value)}
                >
                  <div className="gender-avatar-wrapper">
                    {opt.icon === 'male' ? (
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="32" fill="#E2E8F0" />
                        <circle cx="32" cy="22" r="10" fill="#475569" />
                        <path d="M14 48C14 39.1634 22.0589 32 32 32C41.9411 32 50 39.1634 50 48V52H14V48Z" fill="#475569" />
                      </svg>
                    ) : (
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32" cy="32" r="32" fill="#FCE7F3" />
                        <circle cx="32" cy="22" r="9" fill="#DB2777" />
                        <path d="M16 46C16 38.268 23.1634 32 32 32C40.8366 32 48 38.268 48 46V52H16V46Z" fill="#DB2777" />
                      </svg>
                    )}
                  </div>
                  <span className="gender-card-label">{opt.label}</span>
                </div>
              ))}
            </div>

            <p className="disclaimer-text">
              Termos de Uso e Serviço • Política de Privacidade • Política de Assinatura • Política de Cookies
            </p>
          </div>
        );

      case 'age':
        return (
          <div className="animate-fade-in">
            <h1 className="title">{currentStep.title}</h1>
            <p className="subtitle">{currentStep.subtitle}</p>
            <div className="options-container">
              {currentStep.options.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${answers[currentStep.id] === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentStep.id, opt.value)}
                >
                  <span className="option-label" style={{ marginLeft: '8px' }}>{opt.label}</span>
                  <div className="radio-indicator">
                    <div className="radio-indicator-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'welcome':
        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
            <div className="welcome-illustration">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
            </div>
            <h1 className="title" style={{ fontSize: '26px' }}>{currentStep.title}</h1>
            <p className="welcome-text">{currentStep.text}</p>
            
            <p className="disclaimer-text" style={{ marginTop: 'auto', marginBottom: '16px' }}>
              {currentStep.disclaimer}
            </p>
            <button className="cta-button" onClick={handleContinue}>
              Continuar
            </button>
          </div>
        );

      case 'list':
        return (
          <div className="animate-fade-in">
            <h2 className="title" style={{ textAlign: 'left', fontSize: '22px', marginBottom: '24px' }}>
              {currentStep.title}
            </h2>
            <div className="options-container">
              {currentStep.options.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${answers[currentStep.id] === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentStep.id, opt.value)}
                >
                  <div className="option-card-left">
                    <div className="option-icon-wrapper">
                      <SvgIcon name={opt.icon} />
                    </div>
                    <span className="option-label">{opt.label}</span>
                  </div>
                  <div className="radio-indicator">
                    <div className="radio-indicator-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'no-icon-list':
        return (
          <div className="animate-fade-in">
            <h2 className="title" style={{ textAlign: 'left', fontSize: '22px', marginBottom: '24px' }}>
              {currentStep.title}
            </h2>
            {currentStep.subtitle && <p className="subtitle" style={{ textAlign: 'left', marginTop: '-16px' }}>{currentStep.subtitle}</p>}
            <div className="options-container">
              {currentStep.options.map((opt) => (
                <div 
                  key={opt.value}
                  className={`option-card ${answers[currentStep.id] === opt.value ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentStep.id, opt.value)}
                >
                  <span className="option-label" style={{ marginLeft: '8px' }}>{opt.label}</span>
                  <div className="radio-indicator">
                    <div className="radio-indicator-dot"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'likert':
        const likertValues = [1, 2, 3, 4, 5];
        const emojis = ['👎', '🙁', '😐', '🙂', '😊'];
        const selectedValue = answers[currentStep.id];

        return (
          <div className="animate-fade-in">
            <div className="likert-title-wrapper">
              <p className="subtitle" style={{ color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', marginBottom: '8px' }}>
                {currentStep.subtitle}
              </p>
              <h2 className="title" style={{ textAlign: 'left', fontSize: '22px' }}>
                {currentStep.title}
              </h2>
            </div>

            <div className="likert-scale">
              {likertValues.map((val, idx) => (
                <div 
                  key={val}
                  className={`likert-option ${selectedValue === val ? 'selected' : ''}`}
                  onClick={() => handleSelectOption(currentStep.id, val)}
                >
                  <span className="likert-emoji">{emojis[idx]}</span>
                </div>
              ))}
            </div>

            <div className="likert-captions">
              <span className="likert-caption likert-caption-left">Discordo totalmente</span>
              <span className="likert-caption likert-caption-right">Concordo totalmente</span>
            </div>
          </div>
        );

      case 'multi-select':
        const selectedList = answers[currentStep.id] || [];
        const isNoneSelected = selectedList.length === 0;

        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
            <h2 className="title" style={{ textAlign: 'left', fontSize: '22px' }}>
              {currentStep.title}
            </h2>
            <p className="subtitle" style={{ textAlign: 'left', marginBottom: '24px' }}>
              {currentStep.subtitle}
            </p>

            <div className="options-container" style={{ marginBottom: '40px' }}>
              {currentStep.options.map((opt) => {
                const isSelected = selectedList.includes(opt.value);
                return (
                  <div 
                    key={opt.value}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleMultiOption(currentStep.id, opt.value)}
                  >
                    <div className="option-card-left">
                      <div className="option-icon-wrapper">
                        <SvgIcon name={opt.icon} />
                      </div>
                      <span className="option-label">{opt.label}</span>
                    </div>
                    <div className="checkbox-indicator">
                      <span className="checkbox-indicator-checkmark">
                        <SvgIcon name="check" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              className="cta-button" 
              onClick={handleContinue}
              disabled={isNoneSelected}
              style={{ marginTop: 'auto' }}
            >
              Continuar
            </button>
          </div>
        );

      case 'transition':
        if (currentStep.theme === 'evidence') {
          return (
            <div className="animate-fade-in transition-layout" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
              <div className="evidence-logos">
                <div className="evidence-logo-item">Harvard</div>
                <div className="evidence-logo-item">Oxford</div>
                <div className="evidence-logo-item">Cambridge</div>
              </div>
              <h1 className="title" style={{ fontSize: '26px', marginBottom: '16px' }}>{currentStep.title}</h1>
              <p className="welcome-text" style={{ color: 'var(--color-text-muted)', marginBottom: '40px' }}>{currentStep.subtitle}</p>
              
              <button className="cta-button" onClick={handleContinue} style={{ marginTop: 'auto' }}>
                Continuar
              </button>
            </div>
          );
        }

        if (currentStep.theme === 'specialist') {
          return (
            <div className="animate-fade-in transition-layout" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
              <div className="specialist-badge">Revisado por Especialista</div>
              
              <div className="transition-graphic">
                {/* SVG diagram representing Thoughts -> Feelings -> Behaviors (CBT Model) */}
                <svg width="220" height="150" viewBox="0 0 220 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="55" width="200" height="40" rx="10" fill="var(--color-primary-light)" stroke="var(--color-primary)" strokeWidth="1.5" />
                  <text x="110" y="80" fill="var(--color-primary)" fontWeight="700" fontSize="13" textAnchor="middle">Sentimentos</text>
                  
                  <rect x="65" y="5" width="90" height="30" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
                  <text x="110" y="24" fill="#374151" fontWeight="700" fontSize="12" textAnchor="middle">Pensamentos</text>

                  <rect x="65" y="115" width="90" height="30" rx="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
                  <text x="110" y="134" fill="#374151" fontWeight="700" fontSize="12" textAnchor="middle">Comportamentos</text>
                  
                  {/* Connective arrows */}
                  <path d="M110 35 V55" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" />
                  <path d="M110 95 V115" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="3 3" />
                </svg>
              </div>

              <h2 className="title" style={{ fontSize: '22px', marginBottom: '16px' }}>{currentStep.title}</h2>
              <blockquote className="specialist-quote">
                {currentStep.subtitle}
                <div className="specialist-author">
                  <div className="specialist-photo">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                      <circle cx="22" cy="22" r="22" fill="#D1D5DB" />
                      <path d="M12 36C12 28 17 24 22 24C27 24 32 28 32 36" stroke="white" strokeWidth="3" />
                      <circle cx="22" cy="15" r="6" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <div className="specialist-name">Tara Passaretti</div>
                    <div className="specialist-role">Salud Mental Licenciada</div>
                  </div>
                </div>
              </blockquote>

              <button className="cta-button" onClick={handleContinue} style={{ marginTop: 'auto' }}>
                Continuar
              </button>
            </div>
          );
        }

        if (currentStep.theme === 'community') {
          return (
            <div className="animate-fade-in transition-layout" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
              <div className="community-bubbles">
                <div className="community-bubble">
                  <div className="community-avatar">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="#9CA3AF"><circle cx="16" cy="16" r="16" /></svg>
                  </div>
                  <div>
                    <div className="community-bubble-user">Lucas, 28</div>
                    <p className="community-bubble-text">"A Reliven me ajudou a entender meus sentimentos de forma extremamente prática. Sinto que me conheço bem melhor."</p>
                  </div>
                </div>

                <div className="community-bubble">
                  <div className="community-avatar">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="#F472B6"><circle cx="16" cy="16" r="16" /></svg>
                  </div>
                  <div>
                    <div className="community-bubble-user">Mariana, 34</div>
                    <p className="community-bubble-text">"Finalmente consigo dormir bem sem aquela sensação constante de aperto e preocupação no peito."</p>
                  </div>
                </div>

                <div className="community-bubble">
                  <div className="community-avatar">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="#60A5FA"><circle cx="16" cy="16" r="16" /></svg>
                  </div>
                  <div>
                    <div className="community-bubble-user">Fernando, 41</div>
                    <p className="community-bubble-text">"Os exercícios curtos diários de 10 minutos se encaixam perfeitamente na minha rotina e fazem muita diferença."</p>
                  </div>
                </div>
              </div>

              <h1 className="title" style={{ fontSize: '24px', marginBottom: '8px' }}>{currentStep.title}</h1>
              <p className="subtitle">{currentStep.subtitle}</p>

              <button className="cta-button" onClick={handleContinue} style={{ marginTop: 'auto' }}>
                Continuar
              </button>
            </div>
          );
        }
        return null;

      case 'email':
        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
            <h1 className="title" style={{ textAlign: 'left', fontSize: '24px', marginTop: '20px' }}>{currentStep.title}</h1>
            
            <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div className="input-group">
                <input 
                  type="email" 
                  className="input-field" 
                  placeholder="Insira seu e-mail" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if(emailError) setEmailError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleEmailSubmit(e);
                    }
                  }}
                />
                <div className="input-icon-wrapper">
                  <SvgIcon name="lockAlt" />
                </div>
              </div>
              
              {emailError && <p style={{ color: 'var(--color-error)', fontSize: '13px', fontWeight: '600', marginTop: '-12px', marginBottom: '16px' }}>{emailError}</p>}
              
              <p className="welcome-text" style={{ fontSize: '13px', color: 'var(--color-text-muted)', textAlign: 'left', lineHeight: '1.5' }}>
                {currentStep.text}
              </p>

              <button type="submit" className="cta-button" style={{ marginTop: 'auto' }}>
                Continuar
              </button>
            </form>
          </div>
        );

      case 'name':
        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
            <h1 className="title" style={{ textAlign: 'left', fontSize: '24px', marginTop: '20px' }}>{currentStep.title}</h1>
            <p className="subtitle" style={{ textAlign: 'left', marginBottom: '8px' }}>{currentStep.subtitle}</p>
            
            <form onSubmit={handleNameSubmit} style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Insira seu nome" 
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if(nameError) setNameError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNameSubmit(e);
                    }
                  }}
                  style={{ paddingLeft: '20px' }} // No lock icon needed for name
                />
              </div>

              {nameError && <p style={{ color: 'var(--color-error)', fontSize: '13px', fontWeight: '600', marginTop: '-12px', marginBottom: '16px' }}>{nameError}</p>}

              <button type="submit" className="cta-button" style={{ marginTop: 'auto' }}>
                Continuar
              </button>
            </form>
          </div>
        );

      case 'loading':
        return (
          <div className="loader-container">
            <div className="spinner"></div>
            <h2 className="title" style={{ marginBottom: '32px' }}>{currentStep.title}</h2>
            
            <div className="loader-steps">
              {loadingStepsTexts.map((text, idx) => {
                let statusClass = '';
                if (loadingStep > idx) statusClass = 'completed';
                else if (loadingStep === idx) statusClass = 'active';

                return (
                  <div key={idx} className={`loader-step-item ${statusClass}`}>
                    <div className="loader-step-check">
                      {loadingStep > idx && (
                        <span className="loader-step-icon">
                          <SvgIcon name="check" />
                        </span>
                      )}
                    </div>
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
            <h1 className="title" style={{ fontSize: '22px', marginBottom: '16px' }}>{currentStep.title}</h1>
            
            <div className="results-profile-card">
              <div className="results-avatar">
                {/* SVG avatar representing a stressed but friendly user profile */}
                <svg width="110" height="110" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="55" cy="55" r="55" fill="#FFE4E6" />
                  <path d="M25 88C25 72 38.4315 62 55 62C71.5685 62 85 72 85 88V95H25V88Z" fill="#F43F5E" />
                  <circle cx="55" cy="40" r="15" fill="#F43F5E" />
                  {/* Subtle steam/anxiety ripples */}
                  <path d="M32 25C32 25 35 22 35 25C35 28 32 28 32 25Z" fill="#E11D48" />
                  <path d="M78 25C78 25 75 22 75 25C75 28 78 28 78 25Z" fill="#E11D48" />
                </svg>
              </div>

              <span className="results-badge-red">Nível de Efeitos Negativos: Alto</span>
              <p className="results-score-label">Seu Nível de Sensibilidade</p>
              
              <div className="results-bar-container">
                <div className="results-bar-fill"></div>
              </div>
              <div className="results-bar-markers">
                <span>MÉDIO</span>
                <span>ALTO</span>
              </div>

              <p className="results-description">
                Olá, <strong>{name || 'visitante'}</strong>. Suas respostas indicam que você pode estar sentindo mais preocupação, pressão, esgotamento de energia e oscilações no sono ultimamente.
              </p>
            </div>

            <div className="results-grid" style={{ marginBottom: '32px' }}>
              <div className="results-grid-card">
                <p className="results-grid-label">Dificuldade Principal</p>
                <p className="results-grid-value">{getDynamicResultValue('dificuldade')}</p>
              </div>
              
              <div className="results-grid-card">
                <p className="results-grid-label">Gatilho Identificado</p>
                <p className="results-grid-value">{getDynamicResultValue('gatilho')}</p>
              </div>

              <div className="results-grid-card">
                <p className="results-grid-label">Período Crítico</p>
                <p className="results-grid-value">{getDynamicResultValue('periodo')}</p>
              </div>

              <div className="results-grid-card">
                <p className="results-grid-label">Nível de Energia</p>
                <p className="results-grid-value" style={{ color: '#EF4444' }}>{getDynamicResultValue('energia')}</p>
              </div>
            </div>

            <button className="cta-button" onClick={handleContinue} style={{ marginTop: 'auto' }}>
              Ver Meu Cronograma
            </button>
          </div>
        );

      case 'timeline':
        // Display dynamic month targets: e.g. July (now), August (middle), September (target)
        const months = ['Julho', 'Agosto', 'Setembro'];
        const year = '2026';

        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
            <h1 className="title" style={{ fontSize: '22px', textAlign: 'left', lineHeight: '1.3' }}>
              {currentStep.title}
            </h1>
            <p className="subtitle" style={{ textAlign: 'left', fontSize: '14px', marginBottom: '16px' }}>
              Com base no seu perfil, estimamos que com foco diário você sinta uma redução drástica nos níveis de esgotamento e sobrecarga até <strong>{months[2]} de {year}</strong>.
            </p>

            <div className="timeline-graph-container">
              <p className="results-score-label" style={{ marginBottom: '0' }}>Níveis de Estresse Projetados</p>
              
              <div className="timeline-bars">
                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar timeline-bar-1">
                    <span className="timeline-bar-label">Alto</span>
                  </div>
                  <span className="timeline-month">{months[0]}</span>
                </div>

                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar timeline-bar-2">
                    <span className="timeline-bar-label">Médio</span>
                  </div>
                  <span className="timeline-month">{months[1]}</span>
                </div>

                <div className="timeline-bar-wrapper">
                  <div className="timeline-bar timeline-bar-3">
                    <span className="timeline-bar-label">Baixo</span>
                  </div>
                  <span className="timeline-month">{months[2]}</span>
                </div>
              </div>

              <div className="timeline-legend">
                <div className="timeline-legend-item">
                  <div className="timeline-dot" style={{ backgroundColor: '#EF4444' }}></div>
                  <span>Atual</span>
                </div>
                <div className="timeline-legend-item">
                  <div className="timeline-dot" style={{ backgroundColor: '#F59E0B' }}></div>
                  <span>Transição</span>
                </div>
                <div className="timeline-legend-item">
                  <div className="timeline-dot" style={{ backgroundColor: 'var(--color-success)' }}></div>
                  <span>Meta</span>
                </div>
              </div>
            </div>

            <p className="welcome-text" style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: '1.5', marginTop: '12px' }}>
              Seu plano inclui ferramentas de TCC personalizadas, monitoramento de hábitos e sessões rápidas de respiração e regulação emocional focadas em <strong>{getDynamicResultValue('dificuldade')}</strong>.
            </p>

            <button 
              className="cta-button" 
              onClick={handleContinue} 
              style={{ marginTop: 'auto' }}
            >
              Obter Meu Plano
            </button>
          </div>
        );

      case 'checkout':
        const toggleAccordion = (index) => {
          if (openAccordion === index) {
            setOpenAccordion(null);
          } else {
            setOpenAccordion(index);
          }
        };

        const accordionsData = [
          {
            q: "E se eu não tiver força de vontade suficiente para seguir o plano?",
            a: "Não se preocupe, nosso plano é estruturado em micropassos de apenas 5 a 10 minutos por dia. Nós te ajudamos a construir hábitos consistentes de forma gradual, sem exigir picos intensos de esforço. O foco é na consistência, não na intensidade."
          },
          {
            q: "E se eu tiver muitas distrações na minha vida?",
            a: "O Reliven foi feito exatamente para mentes atarefadas. Nossas ferramentas são projetadas para serem rápidas, diretas e acionáveis, ajudando você a recuperar o foco em poucos minutos, onde quer que você esteja."
          },
          {
            q: "E se eu me sentir sobrecarregado ao iniciar o plano?",
            a: "Você está no controle absoluto do seu ritmo. Se sentir sobrecarga, pode pausar, refazer ou reduzir a duração das atividades diárias. O plano se adapta a você, e não o contrário."
          },
          {
            q: "E se eu já tiver experimentado outras ferramentas que não funcionaram para mim?",
            a: "A maioria dos aplicativos foca apenas em registrar sintomas. O Reliven baseia-se em Terapia Cognitivo-Comportamental (TCC) prática, oferecendo reestruturação de hábitos realistas e exercícios baseados em evidência científica, criados para gerar efeitos de longo prazo."
          }
        ];

        const currentPlanDetails = {
          '7_days': { title: 'Teste de 7 Dias', price: 'R$ 39,20', hotmartUrl: 'https://pay.hotmart.com/V106642514I?off=ekp41bit' },
          '4_weeks': { title: 'Plano de 4 Semanas', price: 'R$ 97,03', hotmartUrl: 'https://pay.hotmart.com/V106642514I?off=41i7spqr' },
          '12_weeks': { title: 'Plano de 12 Semanas', price: 'R$ 195,99', hotmartUrl: 'https://pay.hotmart.com/V106642514I?off=z7szf7sx' }
        };

        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {/* 1. Now vs Goal Comparison Card */}
            <div className="checkout-compare-grid">
              {/* Card NOW */}
              <div className="checkout-compare-card now">
                <div className="compare-image-header">
                  {/* Stressed Avatar */}
                  <svg width="100%" height="100%" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="110" height="110" fill="#FFE4E6" />
                    <path d="M25 95C25 79 38.4 69 55 69C71.6 69 85 79 85 95V102H25V95Z" fill="#F43F5E" />
                    <circle cx="55" cy="47" r="15" fill="#F43F5E" />
                    {/* Stress sweat droplet */}
                    <path d="M72 32C72 32 74 29 74 32C74 35 72 35 72 32Z" fill="#E11D48" />
                  </svg>
                  <div className="compare-image-label">Agora</div>
                </div>
                <div className="compare-metrics">
                  <div className="compare-metric-row">
                    <div className="compare-metric-meta">
                      <span>Energia</span>
                      <span className="compare-metric-value">Baixo</span>
                    </div>
                    <div className="compare-progress-track">
                      <div className="compare-progress-fill red" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="compare-metric-row">
                    <div className="compare-metric-meta">
                      <span>Bem-estar</span>
                      <span className="compare-metric-value">Fraco</span>
                    </div>
                    <div className="compare-progress-track">
                      <div className="compare-progress-fill red" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="compare-metric-row">
                    <div className="compare-metric-meta">
                      <span>Autoestima</span>
                      <span className="compare-metric-value">Baixo</span>
                    </div>
                    <div className="compare-slider-track">
                      <div className="compare-slider-knob red"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card GOAL */}
              <div className="checkout-compare-card goal">
                <div className="compare-image-header">
                  {/* Smiling Avatar */}
                  <svg width="100%" height="100%" viewBox="0 0 110 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="110" height="110" fill="#CCFBF1" />
                    <path d="M25 95C25 79 38.4 69 55 69C71.6 69 85 79 85 95V102H25V95Z" fill="#0D9488" />
                    <circle cx="55" cy="47" r="15" fill="#0D9488" />
                    {/* Sparkles of health */}
                    <path d="M72 30L74 34L78 35L74 36L72 40L70 36L66 35L70 34L72 30Z" fill="#2DD4BF" />
                  </svg>
                  <div className="compare-image-label">Seu objetivo</div>
                </div>
                <div className="compare-metrics">
                  <div className="compare-metric-row">
                    <div className="compare-metric-meta">
                      <span>Energia</span>
                      <span className="compare-metric-value">Alto</span>
                    </div>
                    <div className="compare-progress-track">
                      <div className="compare-progress-fill green" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="compare-metric-row">
                    <div className="compare-metric-meta">
                      <span>Bem-estar</span>
                      <span className="compare-metric-value">Forte</span>
                    </div>
                    <div className="compare-progress-track">
                      <div className="compare-progress-fill green" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                  <div className="compare-metric-row">
                    <div className="compare-metric-meta">
                      <span>Autoestima</span>
                      <span className="compare-metric-value">Alto</span>
                    </div>
                    <div className="compare-slider-track">
                      <div className="compare-slider-knob green"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heading */}
            <h2 className="title" style={{ fontSize: '24px', margin: '16px 0 8px 0' }}>{currentStep.title}</h2>
            
            {/* Badges */}
            <div className="checkout-badges-container">
              <div className="checkout-badge-item">
                <div className="checkout-badge-item-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div className="checkout-badge-item-texts">
                  <span className="checkout-badge-item-label">Dificuldade</span>
                  <span className="checkout-badge-item-value">{getDynamicResultValue('dificuldade')}</span>
                </div>
              </div>

              <div className="checkout-badge-item">
                <div className="checkout-badge-item-icon" style={{ color: 'var(--color-primary)' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="checkout-badge-item-texts">
                  <span className="checkout-badge-item-label">Objetivo</span>
                  <span className="checkout-badge-item-value">Calma Mental</span>
                </div>
              </div>
            </div>

            {/* Plan Options */}
            <div className="checkout-plans-list">
              {/* Plan 1: 7 days */}
              <div 
                className={`checkout-plan-card ${selectedPlan === '7_days' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('7_days')}
              >
                <div className="checkout-plan-left">
                  <div className="radio-indicator" style={{ borderColor: selectedPlan === '7_days' ? 'var(--color-primary)' : '#D1D5DB' }}>
                    <div className="radio-indicator-dot" style={{ transform: selectedPlan === '7_days' ? 'scale(1)' : 'scale(0)' }}></div>
                  </div>
                  <div className="checkout-plan-details">
                    <span className="checkout-plan-title">Teste de 7 Dias</span>
                    <span className="checkout-plan-sub">Avaliação inicial rápida</span>
                  </div>
                </div>
                <div className="checkout-plan-price-box">
                  <span className="checkout-plan-price">R$ 39,20</span>
                  <span className="checkout-plan-daily">R$ 5,60/dia</span>
                </div>
              </div>

              {/* Plan 2: 4 weeks (Popular) */}
              <div className="checkout-plan-wrapper">
                <span className="popular-badge">Mais popular</span>
                <div 
                  className={`checkout-plan-card popular ${selectedPlan === '4_weeks' ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan('4_weeks')}
                >
                  <div className="checkout-plan-left">
                    <div className="radio-indicator" style={{ borderColor: selectedPlan === '4_weeks' ? 'var(--color-primary)' : '#D1D5DB' }}>
                      <div className="radio-indicator-dot" style={{ transform: selectedPlan === '4_weeks' ? 'scale(1)' : 'scale(0)' }}></div>
                    </div>
                    <div className="checkout-plan-details">
                      <span className="checkout-plan-title">Plano de 4 Semanas</span>
                      <span className="checkout-plan-sub">Ideal para fixar hábitos</span>
                    </div>
                  </div>
                  <div className="checkout-plan-price-box">
                     <span className="checkout-plan-price">R$ 97,03</span>
                     <span className="checkout-plan-daily">R$ 3,23/dia</span>
                  </div>
                </div>
              </div>

              {/* Plan 3: 12 weeks */}
              <div 
                className={`checkout-plan-card ${selectedPlan === '12_weeks' ? 'selected' : ''}`}
                onClick={() => setSelectedPlan('12_weeks')}
              >
                <div className="checkout-plan-left">
                  <div className="radio-indicator" style={{ borderColor: selectedPlan === '12_weeks' ? 'var(--color-primary)' : '#D1D5DB' }}>
                    <div className="radio-indicator-dot" style={{ transform: selectedPlan === '12_weeks' ? 'scale(1)' : 'scale(0)' }}></div>
                  </div>
                  <div className="checkout-plan-details">
                    <span className="checkout-plan-title">Plano de 12 Semanas</span>
                    <span className="checkout-plan-sub">Transformação de longo prazo</span>
                  </div>
                </div>
                <div className="checkout-plan-price-box">
                  <span className="checkout-plan-price">R$ 195,99</span>
                  <span className="checkout-plan-daily">R$ 2,17/dia</span>
                </div>
              </div>
            </div>


            {/* CTA Button */}
            <button 
              className="cta-button"
              onClick={openHotmartCheckout}
              style={{ marginTop: '10px' }}
            >
              OBTER MEU PLANO
            </button>

            {/* Disclaimer */}
            <p className="checkout-disclaimer">
              Ao clicar em "OBTER MEU PLANO", você concorda com a renovação automática da assinatura. O primeiro ciclo é {currentPlanDetails[selectedPlan].price}, depois renova pelo mesmo valor. Cancele quando quiser pelo app ou por e-mail: <a href="mailto:support@reliven.com">support@reliven.com</a>.
            </p>

            {/* Trust Badges */}
            <div className="checkout-trust-badge">
              <div className="checkout-trust-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Pagamento rápido e seguro
              </div>
              <div className="checkout-payment-logos">
                <div className="payment-logo">
                  <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: '800', fontSize: '11px', color: '#1A1F71', fontStyle: 'italic' }}>VISA</span>
                </div>
                <div className="payment-logo">
                  <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: '800', fontSize: '10px', color: '#EB001B' }}>MC</span>
                </div>
                <div className="payment-logo">
                  <span style={{ fontWeight: '700', fontSize: '9px', color: 'black' }}> Pay</span>
                </div>
                <div className="payment-logo">
                  <span style={{ fontFamily: 'var(--font-secondary)', fontWeight: '800', fontSize: '10px', color: '#003087' }}>PayPal</span>
                </div>
                <div className="payment-logo">
                  <span style={{ fontWeight: '800', fontSize: '10px', color: '#32BCAD' }}>Pix</span>
                </div>
              </div>
            </div>

            {/* 2. Objectives List Card */}
            <div className="checkout-objectives-card">
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-main)', textAlign: 'left', marginBottom: '8px' }}>
                Seu cronograma incluirá:
              </h3>
              <div className="checkout-objective-item">
                <div className="checkout-objective-check">✓</div>
                <span>Acordar com disposição e energia</span>
              </div>
              <div className="checkout-objective-item">
                <div className="checkout-objective-check">✓</div>
                <span>Livre-se de sobrecargas e preocupação diária</span>
              </div>
              <div className="checkout-objective-item">
                <div className="checkout-objective-check">✓</div>
                <span>Interrupção de pensamentos circulares repetitivos</span>
              </div>
              <div className="checkout-objective-item">
                <div className="checkout-objective-check">✓</div>
                <span>Reestruturação de hábitos em apenas 10 min/dia</span>
              </div>
              <div className="checkout-objective-item">
                <div className="checkout-objective-check">✓</div>
                <span>Aumento consistente da autoconfiança diária</span>
              </div>
            </div>

            {/* 3. Methodology / Publications Section */}
            <h3 className="checkout-section-title">Nosso programa tem base metodológica</h3>
            <div className="checkout-publications-grid">
              <div className="checkout-pub-card">HELLO!</div>
              <div className="checkout-pub-card">TECH TIMES</div>
              <div className="checkout-pub-card">Woman's World</div>
              <div className="checkout-pub-card">THE EVERYGIRL</div>
              <div className="checkout-pub-card">OK!</div>
              <div className="checkout-pub-card">MORNING BREW</div>
            </div>

            <div className="checkout-award-card">
              <span className="checkout-award-icon">🏆</span>
              <p className="checkout-award-text">
                A Reliven é a vencedora oficial do prestigiado <strong>Best Mobile App Award de 2025</strong> na categoria de Saúde Mental e Desenvolvimento Pessoal.
              </p>
            </div>

            {/* 4. Accordion FAQ Section */}
            <h3 className="checkout-section-title">Como a vida pode ser sem a Reliven</h3>
            <div className="checkout-accordions-list">
              {accordionsData.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`checkout-accordion-item ${openAccordion === idx ? 'open' : ''}`}
                >
                  <button className="checkout-accordion-header" onClick={() => toggleAccordion(idx)}>
                    <span>{item.q}</span>
                    <span className="checkout-accordion-chevron">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </span>
                  </button>
                  {openAccordion === idx && (
                    <div className="checkout-accordion-body">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 5. Testimonials Section */}
            <h3 className="checkout-section-title">Como a vida pode ser com a Reliven</h3>
            <p className="subtitle" style={{ marginTop: '-12px', marginBottom: '24px', textAlign: 'center' }}>Veja o que dizem sobre a Reliven</p>

            <div className="checkout-testimonials-list">
              {/* Testimonial 1 */}
              <div className="checkout-testimonial-card">
                <div className="checkout-testimonial-photo">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#E2E8F0" />
                    <path d="M14 38C14 31 19 28 24 28C29 28 34 31 34 38" stroke="#475569" strokeWidth="2.5" />
                    <circle cx="24" cy="18" r="5" fill="#475569" />
                  </svg>
                </div>
                <div className="checkout-testimonial-content">
                  <span className="checkout-testimonial-name">Brian Ross</span>
                  <div className="checkout-testimonial-stars">
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                  </div>
                  <p className="checkout-testimonial-quote">
                    "Realmente mudou a minha vida. Estou usando este aplicativo há seis meses. Nesse tempo, consegui me livrar do hábito de deixar tudo para a última hora. O app me ajudou a organizar melhor meu tempo e a começar a conquistar meus objetivos. Realmente mudou minha vida para melhor."
                  </p>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="checkout-testimonial-card">
                <div className="checkout-testimonial-photo">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#FCE7F3" />
                    <path d="M14 38C14 31 19 28 24 28C29 28 34 31 34 38" stroke="#DB2777" strokeWidth="2.5" />
                    <circle cx="24" cy="18" r="5" fill="#DB2777" />
                  </svg>
                </div>
                <div className="checkout-testimonial-content">
                  <span className="checkout-testimonial-name">Selactive</span>
                  <div className="checkout-testimonial-stars">
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                  </div>
                  <p className="checkout-testimonial-quote">
                    "A Reliven é uma ótima ferramenta de autodesenvolvimento... A Reliven me ajuda a entender por que eu procrastino nas tarefas e como posso superar isso. A Reliven faz isso muito bem. Sou muito grato(a) por ter uma ferramenta como a Reliven."
                  </p>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="checkout-testimonial-card">
                <div className="checkout-testimonial-photo">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="24" fill="#DBEAFE" />
                    <path d="M14 38C14 31 19 28 24 28C29 28 34 31 34 38" stroke="#2563EB" strokeWidth="2.5" />
                    <circle cx="24" cy="18" r="5" fill="#2563EB" />
                  </svg>
                </div>
                <div className="checkout-testimonial-content">
                  <span className="checkout-testimonial-name">Patrick Naughton</span>
                  <div className="checkout-testimonial-stars">
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                    <span className="checkout-testimonial-star">★</span>
                  </div>
                  <p className="checkout-testimonial-quote">
                    "Informações reveladoras... Sou novo neste aplicativo, mas meus problemas não são novidade para mim. Conforme envelheço, e agora aos 62 anos, sempre precisei de ajuda. O preço é muito baixo por informações reveladoras a respeito do meu eu interior e o que me motiva."
                  </p>
                </div>
              </div>
            </div>

            <p className="welcome-text" style={{ fontSize: '11px', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '24px' }}>
              Imagens, nomes e idades são gerados para proteger a privacidade de quem usa o app.
            </p>

            {/* Repeated Plan selection and CTA at the bottom for better UX */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', width: '100%', marginBottom: '24px' }}>
              <button 
                className="cta-button"
                onClick={openHotmartCheckout}
              >
                OBTER MEU PLANO
              </button>
            </div>
          </div>
        );

      default:
        return <div>Layout não encontrado.</div>;
    }
  };

  const showHeader = currentStep.type !== 'loading';
  const showBackButton = history.length > 0 && currentStep.type !== 'results' && currentStep.type !== 'timeline' && currentStep.type !== 'loading';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
      {showHeader && (
        <>
          <header className="app-header">
            {showBackButton ? (
              <button className="header-back-btn" onClick={handleBack} aria-label="Voltar">
                <SvgIcon name="chevronLeft" />
              </button>
            ) : (
              <div />
            )}
            
            <div className="header-logo">
              reliven
              <span className="header-logo-dot" />
            </div>

            {isQuizStep ? (
              <span className="header-step">
                {currentStep.stepNumber} / {totalQuizQuestions}
              </span>
            ) : (
              <div />
            )}
          </header>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </>
      )}

      <main className="scroll-container">
        {renderScreenContent()}
      </main>
    </div>
  );
}
