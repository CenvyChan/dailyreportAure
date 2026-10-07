import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { ReadingSettings, ThemeMode } from '../types';
import { THEME_CONFIGS, ThemeConfig } from '../utils/themeStyles';
import { playPageTurnSound } from '../utils/audio';

import { CoverPage } from './pages/CoverPage';
import { OverviewPage } from './pages/OverviewPage';
import { TrendsPage } from './pages/TrendsPage';
import { SalesLedgerPage } from './pages/SalesLedgerPage';
import { PurchaseLedgerPage } from './pages/PurchaseLedgerPage';
import { ReconciliationPage } from './pages/ReconciliationPage';
import { BackCoverPage } from './pages/BackCoverPage';

interface BookContainerProps {
  currentPage: number;
  totalPages: number;
  settings: ReadingSettings;
  bookmarkedPages: number[];
  onPageChange: (newPage: number) => void;
  onOpenVueMigration: () => void;
  onToggleBookmark: (page: number) => void;
}

export const BookContainer: React.FC<BookContainerProps> = ({
  currentPage,
  totalPages,
  settings,
  bookmarkedPages,
  onPageChange,
  onOpenVueMigration,
  onToggleBookmark
}) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastWheelTimeRef = useRef<number>(0);

  const theme: ThemeConfig = THEME_CONFIGS[settings.theme] || THEME_CONFIGS.parchment;

  // Track window resizing to adapt double/single spread
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine whether to show double page spread
  const isDesktop = windowWidth >= 1024;
  const isDoubleSpread = (settings.viewMode === 'double') || (settings.viewMode === 'auto' && isDesktop);

  // Turn page helpers
  const goToNextPage = useCallback(() => {
    if (isFlipping) return;
    let step = 1;
    if (isDoubleSpread) {
      if (currentPage === 1) {
        step = 1; // From cover to page 2 (spread 2-3)
      } else {
        step = 2; // Jump by two pages in double-spread
      }
    }

    const nextTarget = Math.min(totalPages, currentPage + step);
    if (nextTarget !== currentPage) {
      setFlipDirection('next');
      setIsFlipping(true);
      playPageTurnSound(settings.soundEnabled);
      onPageChange(nextTarget);
      setTimeout(() => setIsFlipping(false), 380);
    }
  }, [currentPage, totalPages, isDoubleSpread, isFlipping, settings.soundEnabled, onPageChange]);

  const goToPrevPage = useCallback(() => {
    if (isFlipping) return;
    let step = 1;
    if (isDoubleSpread) {
      if (currentPage === 2 || currentPage === 3) {
        step = currentPage - 1; // back to cover
      } else {
        step = 2;
      }
    }

    const prevTarget = Math.max(1, currentPage - step);
    if (prevTarget !== currentPage) {
      setFlipDirection('prev');
      setIsFlipping(true);
      playPageTurnSound(settings.soundEnabled);
      onPageChange(prevTarget);
      setTimeout(() => setIsFlipping(false), 380);
    }
  }, [currentPage, isDoubleSpread, isFlipping, settings.soundEnabled, onPageChange]);

  // Touch Gesture Handling (TouchStart, TouchMove, TouchEnd)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const diffX = e.touches[0].clientX - touchStartRef.current.x;
    const diffY = e.touches[0].clientY - touchStartRef.current.y;

    // If mostly horizontal, apply slight visual drag resistance
    if (Math.abs(diffX) > Math.abs(diffY)) {
      setSwipeOffset(diffX * 0.3);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const diffX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const diffY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    setSwipeOffset(0);

    // Threshold of 45px for page turning
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goToNextPage();
      } else {
        goToPrevPage();
      }
    }
  };

  // Debounced Wheel Scrolling
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTimeRef.current < 450) return;

    if (Math.abs(e.deltaX) > 40 || Math.abs(e.deltaY) > 60) {
      lastWheelTimeRef.current = now;
      if (e.deltaX > 40 || e.deltaY > 60) {
        goToNextPage();
      } else {
        goToPrevPage();
      }
    }
  };

  // Auto-play interval
  useEffect(() => {
    if (!settings.autoPlay) return;
    const timer = setInterval(() => {
      if (currentPage >= totalPages) {
        onPageChange(1);
      } else {
        goToNextPage();
      }
    }, settings.autoPlayInterval * 1000);

    return () => clearInterval(timer);
  }, [settings.autoPlay, settings.autoPlayInterval, currentPage, totalPages, goToNextPage, onPageChange]);

  // Page Component Factory
  const renderPageComponent = (pageNumber: number) => {
    switch (pageNumber) {
      case 1:
        return <CoverPage theme={theme} onNextPage={goToNextPage} />;
      case 2:
        return <OverviewPage theme={theme} />;
      case 3:
        return <TrendsPage theme={theme} />;
      case 4:
        return <SalesLedgerPage theme={theme} />;
      case 5:
        return <PurchaseLedgerPage theme={theme} />;
      case 6:
        return <ReconciliationPage theme={theme} />;
      case 7:
        return (
          <BackCoverPage 
            theme={theme} 
            onGoToPage={onPageChange} 
            onOpenVueMigration={onOpenVueMigration} 
          />
        );
      default:
        return null;
    }
  };

  // Font scale class
  const fontScaleClass = {
    compact: 'text-[88%]',
    normal: 'text-[100%]',
    relaxed: 'text-[112%]',
    large: 'text-[124%]'
  }[settings.fontSize];

  // Animation style classes depending on engine
  const getAnimationClasses = () => {
    if (!isFlipping) return 'transition-all duration-300';
    if (settings.flipEngine === 'flip3d') {
      return flipDirection === 'next' 
        ? 'transition-all duration-400 [transform:rotateY(-4deg)_scale(0.995)]'
        : 'transition-all duration-400 [transform:rotateY(4deg)_scale(0.995)]';
    }
    if (settings.flipEngine === 'slide') {
      return flipDirection === 'next'
        ? 'transition-all duration-300 [transform:translateX(-12px)] opacity-95'
        : 'transition-all duration-300 [transform:translateX(12px)] opacity-95';
    }
    // Fade
    return 'transition-opacity duration-300 opacity-80';
  };

  // Calculate left and right page in double mode
  let leftPageNumber = currentPage;
  let rightPageNumber: number | null = null;

  if (isDoubleSpread) {
    if (currentPage === 1) {
      leftPageNumber = 1;
      rightPageNumber = null; // Cover shown standalone
    } else {
      // Align to even page on left, odd on right (e.g. 2 & 3, 4 & 5, 6 & 7)
      const normalizedBase = currentPage % 2 === 0 ? currentPage : currentPage - 1;
      leftPageNumber = normalizedBase;
      rightPageNumber = normalizedBase + 1 <= totalPages ? normalizedBase + 1 : null;
    }
  }

  const isLeftBookmarked = bookmarkedPages.includes(leftPageNumber);
  const isRightBookmarked = rightPageNumber ? bookmarkedPages.includes(rightPageNumber) : false;

  return (
    <div 
      className={`flex-1 flex flex-col justify-between items-center relative overflow-hidden select-none p-2 sm:p-4 md:p-6 transition-colors duration-500 ${theme.outerBg} ${fontScaleClass}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Edge Navigation Buttons (Left Floating Button) */}
      <button
        onClick={goToPrevPage}
        disabled={currentPage <= 1 || isFlipping}
        className={`absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white shadow-xl backdrop-blur-md transition-all border border-slate-700/60 ${
          currentPage <= 1 ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100 hover:scale-110 active:scale-95'
        }`}
        title="翻向前一页 (← / 滚轮向下 / 右滑)"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Edge Navigation Buttons (Right Floating Button) */}
      <button
        onClick={goToNextPage}
        disabled={currentPage >= totalPages || isFlipping}
        className={`absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2.5 md:p-3 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white shadow-xl backdrop-blur-md transition-all border border-slate-700/60 ${
          currentPage >= totalPages ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100 hover:scale-110 active:scale-95'
        }`}
        title="翻向后一页 (→ / 滚轮向上 / 左滑)"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Main E-Book Viewport Canvas */}
      <div 
        className="w-full flex-1 flex items-center justify-center max-w-6xl py-2 px-1 perspective-2000"
        style={{
          transform: `translateX(${swipeOffset}px)`
        }}
      >
        {/* Book Hardcover Spread Wrap */}
        <div 
          className={`w-full max-h-[85vh] rounded-2xl overflow-hidden relative ${theme.bookShadow} border ${theme.pageBorder} ${getAnimationClasses()} ${
            isDoubleSpread && rightPageNumber ? 'flex' : 'max-w-3xl aspect-[1.3/1]'
          }`}
          style={{ minHeight: '520px' }}
        >
          {/* Double Spread Mode */}
          {isDoubleSpread && rightPageNumber ? (
            <>
              {/* Left Page */}
              <div className="w-1/2 h-full relative overflow-hidden flex flex-col border-r book-page-shadow-left" style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
                {/* Ribbon Bookmark Indicator Left */}
                {isLeftBookmarked && (
                  <div 
                    onClick={() => onToggleBookmark(leftPageNumber)}
                    className="absolute top-0 right-8 z-20 cursor-pointer group"
                    title="点击移除左页书签"
                  >
                    <div className="w-5 h-8 bg-amber-500 shadow-md flex items-end justify-center pb-1 text-white">
                      <Bookmark className="w-3 h-3 fill-white" />
                    </div>
                  </div>
                )}
                {renderPageComponent(leftPageNumber)}
              </div>

              {/* Center Book Spine 3D Shadow Ridge */}
              {settings.spineShadow && (
                <div 
                  className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 book-spine-shadow pointer-events-none z-20`}
                />
              )}

              {/* Right Page */}
              <div className="w-1/2 h-full relative overflow-hidden flex flex-col book-page-shadow-right group">
                {/* Ribbon Bookmark Indicator Right */}
                {isRightBookmarked && (
                  <div 
                    onClick={() => onToggleBookmark(rightPageNumber)}
                    className="absolute top-0 right-8 z-20 cursor-pointer group"
                    title="点击移除右页书签"
                  >
                    <div className="w-5 h-8 bg-amber-500 shadow-md flex items-end justify-center pb-1 text-white">
                      <Bookmark className="w-3 h-3 fill-white" />
                    </div>
                  </div>
                )}
                {renderPageComponent(rightPageNumber)}

                {/* Interactive Page Curl Affordance (hover peeks in bottom right) */}
                {rightPageNumber < totalPages && (
                  <div 
                    onClick={goToNextPage}
                    className="page-corner-curl cursor-pointer pointer-events-auto"
                    title="点击此角落翻页"
                  />
                )}
              </div>
            </>
          ) : (
            /* Single Page Mode (Mobile or Forced Single or Cover) */
            <div className="w-full h-full relative overflow-hidden flex flex-col group">
              {isLeftBookmarked && (
                <div 
                  onClick={() => onToggleBookmark(leftPageNumber)}
                  className="absolute top-0 right-8 z-20 cursor-pointer"
                  title="点击移除此页书签"
                >
                  <div className="w-5 h-8 bg-amber-500 shadow-md flex items-end justify-center pb-1 text-white">
                    <Bookmark className="w-3 h-3 fill-white" />
                  </div>
                </div>
              )}
              {renderPageComponent(leftPageNumber)}

              {/* Interactive Page Curl */}
              {leftPageNumber < totalPages && (
                <div 
                  onClick={goToNextPage}
                  className="page-corner-curl cursor-pointer pointer-events-auto"
                  title="点击此角落翻页"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer Controls & Pagination Dots */}
      <footer className="w-full max-w-4xl py-2 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs z-20">
        {/* Gestures hint */}
        <div className="text-[11px] text-slate-400 font-mono hidden md:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>手势：支持屏幕滑动、滚轮、方向键翻页</span>
        </div>

        {/* Page Dots & Navigation Slider */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isActive = isDoubleSpread && rightPageNumber 
                ? page === leftPageNumber || page === rightPageNumber 
                : page === leftPageNumber;
              const hasBookmark = bookmarkedPages.includes(page);

              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative transition-all ${
                    isActive 
                      ? 'w-6 h-2 bg-amber-400 rounded-full' 
                      : 'w-2 h-2 bg-slate-600 hover:bg-slate-400 rounded-full'
                  }`}
                  title={`跳转到第 ${page} 页`}
                >
                  {hasBookmark && (
                    <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-300 ring-1 ring-slate-900" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-[11px] font-mono text-slate-300 bg-slate-900/60 px-2.5 py-1 rounded-full border border-slate-800">
            {isDoubleSpread && rightPageNumber ? (
              <span>第 {leftPageNumber}-{rightPageNumber} 页 / 共 {totalPages} 页</span>
            ) : (
              <span>第 {leftPageNumber} 页 / 共 {totalPages} 页</span>
            )}
          </div>
        </div>

        {/* Mode Badge */}
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60">
            {isDoubleSpread && rightPageNumber ? '双页对开模式' : '单页全幅模式'}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60">
            {theme.name}
          </span>
        </div>
      </footer>
    </div>
  );
};
