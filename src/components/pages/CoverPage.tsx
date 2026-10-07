import React from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { reportMeta, overviewKPIs } from '../../data/reportData';
import { ChevronRight, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

interface CoverPageProps {
  theme: ThemeConfig;
  onNextPage: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ theme, onNextPage }) => {
  return (
    <div className={`w-full h-full p-6 md:p-10 flex flex-col justify-between relative overflow-hidden select-none ${theme.pageBg} ${theme.textPrimary}`}>
      {/* Decorative architectural border framing */}
      <div className={`absolute inset-4 md:inset-6 border ${theme.divider} pointer-events-none rounded-lg flex flex-col justify-between p-3`}>
        <div className="flex justify-between items-start opacity-40">
          <div className="w-3 h-3 border-t-2 border-l-2 border-current" />
          <div className="w-3 h-3 border-t-2 border-r-2 border-current" />
        </div>
        <div className="flex justify-between items-end opacity-40">
          <div className="w-3 h-3 border-b-2 border-l-2 border-current" />
          <div className="w-3 h-3 border-b-2 border-r-2 border-current" />
        </div>
      </div>

      {/* Top Header Foil Line */}
      <div className="relative z-10 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono tracking-wider opacity-70">
          <Calendar className="w-3.5 h-3.5" />
          <span>FINOS OPERATING FOLIO · VOL. 2026-08</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>内部绝密 · 核验有效</span>
        </div>
      </div>

      {/* Center Hero Book Cover Branding */}
      <div className="relative z-10 my-auto text-center max-w-lg mx-auto py-4">
        {/* Geometric Emblem Crest */}
        <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 relative flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
            <polygon points="50,12 85,30 85,70 50,88 15,70 15,30" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <polygon points="50,22 76,36 76,64 50,78 24,64 24,36" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
            <circle cx="50" cy="50" r="16" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
            <path d="M42 50 L50 42 L58 50 L50 58 Z" fill="currentColor" opacity="0.8" />
          </svg>
        </div>

        <p className={`text-xs md:text-sm tracking-[0.25em] uppercase font-sans mb-3 ${theme.textSecondary}`}>
          {reportMeta.company}
        </p>

        <h1 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight mb-3">
          经营日报
        </h1>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-current/20 mb-6 opacity-80">
          <span>报告基准日：{reportMeta.formattedDate}</span>
          <span>·</span>
          <span>快照 {reportMeta.snapshotNumber}</span>
        </div>

        <p className={`text-xs md:text-sm max-w-md mx-auto leading-relaxed mb-8 ${theme.textSecondary}`}>
          {reportMeta.principle}。本公报汇编当日产销、原料采购账目、本月十日动态走势与金蝶系统全面对账稽核结论。
        </p>

        {/* 3 Key Figure Preview Badges */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-md mx-auto text-left mb-8">
          <div className={`p-2.5 md:p-3 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <span className={`text-[10px] block truncate ${theme.textSecondary}`}>销售手填金额</span>
            <span className="text-xs md:text-sm font-semibold font-mono tabular-nums text-blue-600 dark:text-blue-400 block mt-0.5">
              ¥{(overviewKPIs.salesTotal / 10000).toFixed(2)}万
            </span>
          </div>
          <div className={`p-2.5 md:p-3 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <span className={`text-[10px] block truncate ${theme.textSecondary}`}>采购手填金额</span>
            <span className="text-xs md:text-sm font-semibold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 block mt-0.5">
              ¥{(overviewKPIs.purchaseTotal / 10000).toFixed(2)}万
            </span>
          </div>
          <div className={`p-2.5 md:p-3 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <span className={`text-[10px] block truncate ${theme.textSecondary}`}>本日净出入差</span>
            <span className="text-xs md:text-sm font-semibold font-mono tabular-nums text-amber-600 dark:text-amber-400 block mt-0.5">
              +¥{(overviewKPIs.netMargin / 10000).toFixed(2)}万
            </span>
          </div>
        </div>

        {/* Read Button */}
        <button
          onClick={onNextPage}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>翻开公报 · 开启阅读</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Footer Details */}
      <div className={`relative z-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono border-t ${theme.divider} pt-3 ${theme.textTertiary}`}>
        <div>
          <span>签发归档：财务管控与运营决策委员会</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span>触屏滑动或按</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 text-[10px]">
              →
            </kbd>
            <span>翻页</span>
          </span>
          <span>第 1 页 / 共 7 页</span>
        </div>
      </div>
    </div>
  );
};
