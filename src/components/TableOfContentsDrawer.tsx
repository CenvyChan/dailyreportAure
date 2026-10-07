import React from 'react';
import { X, BookOpen, Bookmark, ChevronRight } from 'lucide-react';
import { bookChapters } from '../data/reportData';

interface TableOfContentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: number;
  bookmarkedPages: number[];
  onSelectPage: (page: number) => void;
}

export const TableOfContentsDrawer: React.FC<TableOfContentsDrawerProps> = ({
  isOpen,
  onClose,
  currentPage,
  bookmarkedPages,
  onSelectPage
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-sm bg-slate-900 border-r border-slate-800 h-full shadow-2xl flex flex-col text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">公报章节目录</h3>
              <p className="text-[11px] text-slate-400">全篇共 7 章节 · 经营日报全景</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chapters List */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {bookChapters.map((chapter) => {
            const isCurrent = currentPage === chapter.page;
            const isBookmarked = bookmarkedPages.includes(chapter.page);

            return (
              <button
                key={chapter.page}
                onClick={() => {
                  onSelectPage(chapter.page);
                  onClose();
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  isCurrent
                    ? 'border-amber-500/50 bg-amber-500/10 text-white'
                    : 'border-slate-800/80 bg-slate-800/30 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                    isCurrent ? 'bg-amber-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                  }`}>
                    0{chapter.page}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono tracking-wider uppercase text-amber-500/80">
                        {chapter.kicker}
                      </span>
                      {isBookmarked && (
                        <Bookmark className="w-3 h-3 fill-amber-400 text-amber-400" />
                      )}
                    </div>
                    <span className="font-semibold block text-xs mt-0.5">{chapter.title}</span>
                    <span className="text-[10px] text-slate-400 block font-mono">{chapter.subtitle}</span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform ${
                  isCurrent ? 'text-amber-400 translate-x-1' : ''
                }`} />
              </button>
            );
          })}
        </div>

        {/* Drawer Footer Bookmarks Count */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>已标记 {bookmarkedPages.length} 处书签</span>
          </div>
          <span className="font-mono text-[10px]">ESC 键关闭</span>
        </div>
      </div>
    </div>
  );
};
