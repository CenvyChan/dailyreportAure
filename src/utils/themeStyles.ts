import { ThemeMode } from '../types';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  desc: string;
  outerBg: string;
  pageBg: string;
  pageBorder: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textAccent: string;
  cardBg: string;
  cardBorder: string;
  tableHeadBg: string;
  tableRowHover: string;
  tableBorder: string;
  divider: string;
  badgeBg: string;
  chartLineSales: string;
  chartLinePurchase: string;
  spineGradient: string;
  bookShadow: string;
}

export const THEME_CONFIGS: Record<ThemeMode, ThemeConfig> = {
  parchment: {
    id: 'parchment',
    name: '经典原浆纸',
    desc: '温润微黄的典藏书刊质感，柔光护眼',
    outerBg: 'bg-[#1c1917]',
    pageBg: 'bg-[#FBF8EF]',
    pageBorder: 'border-[#E7DEC5]',
    textPrimary: 'text-[#292524]',
    textSecondary: 'text-[#78716C]',
    textTertiary: 'text-[#A8A29E]',
    textAccent: 'text-[#9A3412]',
    cardBg: 'bg-[#F3EEDD]',
    cardBorder: 'border-[#E2D8BE]',
    tableHeadBg: 'bg-[#EDE7D4]',
    tableRowHover: 'hover:bg-[#F5F0DF]',
    tableBorder: 'border-[#E2D8BE]',
    divider: 'border-[#E5DEC7]',
    badgeBg: 'bg-[#EAE2CE]',
    chartLineSales: '#2563EB',
    chartLinePurchase: '#16A34A',
    spineGradient: 'from-amber-950/20 via-transparent to-amber-950/20',
    bookShadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_1px_rgba(0,0,0,0.4)]'
  },
  modern: {
    id: 'modern',
    name: '现代极简白',
    desc: '清晰利落的纯白科技纸感，专业克制',
    outerBg: 'bg-[#0F172A]',
    pageBg: 'bg-[#FFFFFF]',
    pageBorder: 'border-slate-200',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    textTertiary: 'text-slate-400',
    textAccent: 'text-blue-600',
    cardBg: 'bg-slate-50',
    cardBorder: 'border-slate-200',
    tableHeadBg: 'bg-slate-100',
    tableRowHover: 'hover:bg-slate-50',
    tableBorder: 'border-slate-200',
    divider: 'border-slate-200',
    badgeBg: 'bg-slate-100',
    chartLineSales: '#2563EB',
    chartLinePurchase: '#16A34A',
    spineGradient: 'from-slate-900/12 via-transparent to-slate-900/12',
    bookShadow: 'shadow-[0_25px_60px_rgba(0,0,0,0.45)]'
  },
  dark: {
    id: 'dark',
    name: '深邃夜读墨',
    desc: '黑曜夜间阅读，高对比度低视觉疲劳',
    outerBg: 'bg-[#080B10]',
    pageBg: 'bg-[#0F141C]',
    pageBorder: 'border-[#222B38]',
    textPrimary: 'text-[#E6EDF3]',
    textSecondary: 'text-[#8B949E]',
    textTertiary: 'text-[#484F58]',
    textAccent: 'text-indigo-400',
    cardBg: 'bg-[#161D27]',
    cardBorder: 'border-[#2A3545]',
    tableHeadBg: 'bg-[#1C2431]',
    tableRowHover: 'hover:bg-[#1A222E]',
    tableBorder: 'border-[#222B38]',
    divider: 'border-[#222B38]',
    badgeBg: 'bg-[#1C2431]',
    chartLineSales: '#60A5FA',
    chartLinePurchase: '#4ADE80',
    spineGradient: 'from-black/40 via-transparent to-black/40',
    bookShadow: 'shadow-[0_25px_60px_rgba(0,0,0,0.85)]'
  },
  sage: {
    id: 'sage',
    name: '青竹护眼绿',
    desc: '低饱和度豆沙淡青色，舒缓眼肌',
    outerBg: 'bg-[#131E17]',
    pageBg: 'bg-[#F2F6F1]',
    pageBorder: 'border-[#D1DDD0]',
    textPrimary: 'text-[#1B291E]',
    textSecondary: 'text-[#586B5C]',
    textTertiary: 'text-[#87998B]',
    textAccent: 'text-[#15803D]',
    cardBg: 'bg-[#E5ECE4]',
    cardBorder: 'border-[#CBD7CA]',
    tableHeadBg: 'bg-[#DDE6DC]',
    tableRowHover: 'hover:bg-[#EAF0E9]',
    tableBorder: 'border-[#CBD7CA]',
    divider: 'border-[#CBD7CA]',
    badgeBg: 'bg-[#DFE8DE]',
    chartLineSales: '#2563EB',
    chartLinePurchase: '#16A34A',
    spineGradient: 'from-emerald-950/20 via-transparent to-emerald-950/20',
    bookShadow: 'shadow-[0_20px_50px_rgba(0,0,0,0.55)]'
  }
};
