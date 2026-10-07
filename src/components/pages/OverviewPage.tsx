import React from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { reportMeta, overviewKPIs } from '../../data/reportData';
import { 
  TrendingUp, 
  TrendingDown, 
  Link2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';

interface OverviewPageProps {
  theme: ThemeConfig;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ theme }) => {
  return (
    <div className={`w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto ${theme.pageBg} ${theme.textPrimary}`}>
      {/* Chapter Header */}
      <div>
        <div className="flex items-center justify-between border-b pb-3 mb-5" style={{ borderColor: 'var(--divider-color, rgba(120,113,108,0.2))' }}>
          <div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 block font-semibold">
              EXECUTIVE OVERVIEW · SECTION 01
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-semibold mt-0.5">
              经营总览与关键指标
            </h2>
          </div>
          <div className="text-right">
            <span className={`text-[11px] font-mono block ${theme.textSecondary}`}>
              快照 {reportMeta.snapshotNumber}
            </span>
            <span className={`text-[10px] font-mono block ${theme.textTertiary}`}>
              {reportMeta.generatedAt}
            </span>
          </div>
        </div>

        {/* 4 Primary KPI Cards (Zero-pill discipline, crisp typography) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* Sales KPI */}
          <div className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} transition-all`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-medium ${theme.textSecondary}`}>销售日报金额</span>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-lg md:text-xl font-bold font-mono tabular-nums text-blue-600 dark:text-blue-400">
              ¥{overviewKPIs.salesTotal.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-[11px] font-mono mt-1 ${theme.textTertiary}`}>
              {overviewKPIs.salesCount} 笔手填日报明细
            </div>
          </div>

          {/* Purchase KPI */}
          <div className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} transition-all`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-medium ${theme.textSecondary}`}>采购日报金额</span>
              <TrendingDown className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-lg md:text-xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
              ¥{overviewKPIs.purchaseTotal.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
            </div>
            <div className={`text-[11px] font-mono mt-1 ${theme.textTertiary}`}>
              {overviewKPIs.purchaseCount} 笔手填日报明细
            </div>
          </div>

          {/* Sales Link Coverage */}
          <div className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} transition-all`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-medium ${theme.textSecondary}`}>销售关联覆盖</span>
              <Link2 className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-lg md:text-xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
              0.00%
            </div>
            <div className={`text-[11px] font-mono mt-1 ${theme.textTertiary}`}>
              已关联 ¥0.00 / 待核销
            </div>
          </div>

          {/* Purchase Link Coverage */}
          <div className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} transition-all`}>
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-medium ${theme.textSecondary}`}>采购关联覆盖</span>
              <Link2 className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-lg md:text-xl font-bold font-mono tabular-nums text-purple-600 dark:text-purple-400">
              0.00%
            </div>
            <div className={`text-[11px] font-mono mt-1 ${theme.textTertiary}`}>
              已关联 ¥0.00 / 待核销
            </div>
          </div>
        </div>

        {/* Operational Status & Link Gauges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Daily Link Status Gauge */}
          <div className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: 'rgba(120,113,108,0.15)' }}>
              <h3 className="text-xs font-semibold tracking-wide uppercase font-mono">
                日报关联覆盖率 (手填关联状态)
              </h3>
              <span className={`text-[11px] ${theme.textTertiary}`}>手填口径</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex flex-col items-center justify-center p-3 rounded bg-black/5 dark:bg-white/5">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="none" className="opacity-15" />
                    <circle cx="32" cy="32" r="26" stroke="#2563eb" strokeWidth="5" fill="none" strokeDasharray="163" strokeDashoffset="163" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-sm font-bold font-mono">0%</span>
                </div>
                <span className="text-xs font-medium mt-2 text-blue-600 dark:text-blue-400">销售关联</span>
                <span className={`text-[10px] font-mono ${theme.textTertiary}`}>未关联 9 笔</span>
              </div>

              <div className="flex flex-col items-center justify-center p-3 rounded bg-black/5 dark:bg-white/5">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="none" className="opacity-15" />
                    <circle cx="32" cy="32" r="26" stroke="#16a34a" strokeWidth="5" fill="none" strokeDasharray="163" strokeDashoffset="163" strokeLinecap="round" />
                  </svg>
                  <span className="absolute text-sm font-bold font-mono">0%</span>
                </div>
                <span className="text-xs font-medium mt-2 text-emerald-600 dark:text-emerald-400">采购关联</span>
                <span className={`text-[10px] font-mono ${theme.textTertiary}`}>未关联 20 笔</span>
              </div>
            </div>
          </div>

          {/* Today Operational Health Check */}
          <div className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: 'rgba(120,113,108,0.15)' }}>
              <h3 className="text-xs font-semibold tracking-wide uppercase font-mono">
                今日经营状态快速核验
              </h3>
              <span className={`text-[11px] ${theme.textTertiary}`}>实时监控</span>
            </div>

            <div className="space-y-2.5 py-1">
              <div className="flex items-center justify-between p-2 rounded bg-black/5 dark:bg-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">日报主数据录入</span>
                </div>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">已录入完成</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-black/5 dark:bg-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span className="font-medium">金蝶参考同步状态</span>
                </div>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">实时可用 / 待冲账</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-black/5 dark:bg-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-medium">历史更正稽核</span>
                </div>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">无待处理项</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Executive Commentary */}
        <div className={`p-4 rounded-lg border ${theme.cardBorder} bg-black/[0.02] dark:bg-white/[0.02]`}>
          <div className="flex items-center gap-2 mb-2">
            <FileSpreadsheet className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h4 className="text-xs font-semibold uppercase tracking-wider font-mono">
              经营纪要与管理层建议
            </h4>
          </div>
          <p className={`text-xs md:text-sm leading-relaxed ${theme.textSecondary}`}>
            今日实现销售出货手填金额 <strong>47.17 万元</strong>，采购发生额 <strong>12.73 万元</strong>，本日经营活动现金流入净差额 <strong>+34.43 万元</strong>。
            销售结构中昕诺飞及东莞台达合计出货占比超 65%；目前当日手工单据与金蝶单据处于结账归集周期中，关联匹配将于次日金蝶入账凭证生成后自动冲销更新。
          </p>
        </div>
      </div>

      {/* Page Footer */}
      <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
        <span>飞诺斯电子 · 经营日报</span>
        <span>第 2 页 / 共 7 页</span>
      </div>
    </div>
  );
};
