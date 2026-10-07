import React from 'react';
import { 
  BookOpen, 
  Settings, 
  Maximize2, 
  Minimize2, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Code2,
  List
} from 'lucide-react';
import { ReadingSettings } from '../types';
import { bookChapters } from '../data/reportData';

interface BookNavbarProps {
  currentPage: number;
  totalPages: number;
  settings: ReadingSettings;
  isFullscreen: boolean;
  bookmarkedPages: number[];
  onToggleFullscreen: () => void;
  onOpenSettings: () => void;
  onOpenToc: () => void;
  onOpenVueMigration: () => void;
  onToggleBookmark: () => void;
  onToggleSound: () => void;
  onGoToPage: (page: number) => void;
}

export const BookNavbar: React.FC<BookNavbarProps> = ({
  currentPage,
  totalPages,
  settings,
  isFullscreen,
  bookmarkedPages,
  onToggleFullscreen,
  onOpenSettings,
  onOpenToc,
  onOpenVueMigration,
  onToggleBookmark,
  onToggleSound,
  onGoToPage
}) => {
  const isBookmarked = bookmarkedPages.includes(currentPage);

  return (
    <header className="h-14 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-200 px-4 md:px-6 flex items-center justify-between z-30 transition-all select-none">
      {/* Zone 1: Brand Title (Single text element wordmark in display face) */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onGoToPage(1)} 
          className="flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
          title="返回封面"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-blue-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight text-white block">
              飞诺斯电子 · 经营日报
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              2026-08-10 · 快照 #8
            </span>
          </div>
        </button>
      </div>

      {/* Zone 2: Navigation Links (4-6 single-line links for quick chapter jump) */}
      <nav className="hidden lg:flex items-center gap-1 text-xs">
        <button
          onClick={onOpenToc}
          className="px-2.5 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          <List className="w-3.5 h-3.5" />
          <span>目录导航</span>
        </button>

        <span className="text-slate-700" aria-hidden="true">|</span>

        {bookChapters.slice(0, 6).map((chapter) => {
          const isActive = currentPage === chapter.page || (settings.viewMode === 'double' && currentPage + 1 === chapter.page);
          return (
            <button
              key={chapter.page}
              onClick={() => onGoToPage(chapter.page)}
              className={`px-2.5 py-1.5 rounded transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <span>{chapter.title.split('与')[0]}</span>
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary Actions (Settings, Sound, Vue Tech Stack, Fullscreen) */}
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Toggle Bookmark */}
        <button
          onClick={onToggleBookmark}
          className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
            isBookmarked 
              ? 'text-amber-400 bg-amber-500/15' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
          title={isBookmarked ? '移除书签' : '为此页添加书签'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          <span className="hidden sm:inline text-[11px]">
            {isBookmarked ? '已标记' : '书签'}
          </span>
        </button>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          title={settings.soundEnabled ? '翻页音效：已开启' : '翻页音效：已静音'}
        >
          {settings.soundEnabled ? (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>

        {/* Vue Migration Spec */}
        <button
          onClick={onOpenVueMigration}
          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors flex items-center gap-1.5 whitespace-nowrap"
          title="查看 Vue 3 + Tailwind CSS 迁移技术实现与方案"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Vue 3 架构</span>
          <span className="md:hidden">Vue</span>
        </button>

        {/* Reader Settings Drawer/Modal */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          title="个性化阅读设置 (主题/动效/字号)"
        >
          <Settings className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">设置</span>
        </button>

        {/* Immersive Fullscreen Mode */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title={isFullscreen ? '退出全屏沉浸模式 (Esc)' : '进入全屏沉浸模式 (F)'}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4 text-amber-400" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
};
