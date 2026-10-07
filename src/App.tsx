/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ReadingSettings } from './types';
import { BookNavbar } from './components/BookNavbar';
import { BookContainer } from './components/BookContainer';
import { SettingsModal } from './components/SettingsModal';
import { TableOfContentsDrawer } from './components/TableOfContentsDrawer';
import { VueMigrationModal } from './components/VueMigrationModal';

const DEFAULT_SETTINGS: ReadingSettings = {
  theme: 'parchment',
  flipEngine: 'flip3d',
  fontSize: 'normal',
  viewMode: 'auto',
  soundEnabled: true,
  spineShadow: true,
  autoPlay: false,
  autoPlayInterval: 8
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 7;

  // Settings with LocalStorage persistence
  const [settings, setSettings] = useState<ReadingSettings>(() => {
    try {
      const saved = localStorage.getItem('finos_reader_settings');
      if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // fallback
    }
    return DEFAULT_SETTINGS;
  });

  const [bookmarkedPages, setBookmarkedPages] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('finos_reader_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [2]; // Default bookmark on Overview page
  });

  // Modal / Drawer States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isVueMigrationOpen, setIsVueMigrationOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finos_reader_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finos_reader_bookmarks', JSON.stringify(bookmarkedPages));
    } catch {
      // ignore
    }
  }, [bookmarkedPages]);

  // Track Fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const toggleBookmark = useCallback((pageToToggle?: number) => {
    const target = pageToToggle || currentPage;
    setBookmarkedPages((prev) => {
      if (prev.includes(target)) {
        return prev.filter((p) => p !== target);
      }
      return [...prev, target].sort((a, b) => a - b);
    });
  }, [currentPage]);

  const toggleSound = useCallback(() => {
    setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const handleUpdateSettings = (newPartial: Partial<ReadingSettings>) => {
    setSettings((prev) => ({ ...prev, ...newPartial }));
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        if (isSettingsOpen) setIsSettingsOpen(false);
        if (isTocOpen) setIsTocOpen(false);
        if (isVueMigrationOpen) setIsVueMigrationOpen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        setIsTocOpen((prev) => !prev);
      } else if (e.key === 's' || e.key === 'S') {
        setIsSettingsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsOpen, isTocOpen, isVueMigrationOpen, toggleFullscreen]);

  return (
    <div className="min-h-screen flex flex-col justify-between overflow-x-hidden antialiased bg-[#0e1218] text-slate-100 font-sans">
      {/* Top Navbar Contract */}
      <BookNavbar
        currentPage={currentPage}
        totalPages={totalPages}
        settings={settings}
        isFullscreen={isFullscreen}
        bookmarkedPages={bookmarkedPages}
        onToggleFullscreen={toggleFullscreen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenToc={() => setIsTocOpen(true)}
        onOpenVueMigration={() => setIsVueMigrationOpen(true)}
        onToggleBookmark={() => toggleBookmark(currentPage)}
        onToggleSound={toggleSound}
        onGoToPage={setCurrentPage}
      />

      {/* Center 3D Book Container */}
      <main className="flex-1 flex flex-col">
        <BookContainer
          currentPage={currentPage}
          totalPages={totalPages}
          settings={settings}
          bookmarkedPages={bookmarkedPages}
          onPageChange={setCurrentPage}
          onOpenVueMigration={() => setIsVueMigrationOpen(true)}
          onToggleBookmark={toggleBookmark}
        />
      </main>

      {/* Modals & Drawers */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />

      <TableOfContentsDrawer
        isOpen={isTocOpen}
        onClose={() => setIsTocOpen(false)}
        currentPage={currentPage}
        bookmarkedPages={bookmarkedPages}
        onSelectPage={setCurrentPage}
      />

      <VueMigrationModal
        isOpen={isVueMigrationOpen}
        onClose={() => setIsVueMigrationOpen(false)}
      />
    </div>
  );
}
