import React from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { kingdeeComparisons } from '../../data/reportData';
import { 
  DatabaseZap, 
  AlertTriangle, 
  CheckCircle, 
  FileCheck2, 
  ArrowRightLeft,
  Building,
  HelpCircle
} from 'lucide-react';

interface ReconciliationPageProps {
  theme: ThemeConfig;
}

export const ReconciliationPage: React.FC<ReconciliationPageProps> = ({ theme }) => {
  return (
    <div className={`w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto ${theme.pageBg} ${theme.textPrimary}`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-5" style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
          <div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 block font-semibold">
              ERP RECONCILIATION & AUDIT · SECTION 05
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-semibold mt-0.5">
              金蝶参考与对账稽核
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              ERP 对账数据源：金蝶云星空
            </span>
          </div>
        </div>

        {/* Warning / Notice Banner */}
        <div className={`p-3 rounded-lg border ${theme.cardBorder} bg-amber-500/10 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2 mb-5`}>
          <HelpCircle className="w-4 h-4 shrink-0 text-amber-600" />
          <span>
            <strong>核算原则：</strong>手填日报为主口径（反映当日车间及出纳即时业务实况），金蝶数据作为月末财务入账与对账核验依据，不直接替代当日手填经营金额。
          </span>
        </div>

        {/* Two Col Kingdee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {kingdeeComparisons.map((item) => (
            <div key={item.type} className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg} flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between mb-3 border-b pb-2" style={{ borderColor: 'rgba(120,113,108,0.15)' }}>
                  <div className="flex items-center gap-2">
                    <DatabaseZap className={`w-4 h-4 ${item.type === 'sales' ? 'text-blue-500' : 'text-emerald-500'}`} />
                    <h3 className="text-xs font-semibold font-mono uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-slate-500">
                    明细 {item.detailRows} 行
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 mb-3 bg-black/[0.03] dark:bg-white/[0.03] p-2.5 rounded text-xs font-mono">
                  <div>
                    <span className={`text-[10px] block ${theme.textSecondary}`}>日报手填累计</span>
                    <strong className="text-xs md:text-sm font-bold tabular-nums block mt-0.5">
                      ¥{(item.dailyTotal / 10000).toFixed(2)}万
                    </strong>
                  </div>
                  <div>
                    <span className={`text-[10px] block ${theme.textSecondary}`}>金蝶系统金额</span>
                    <strong className="text-xs md:text-sm font-bold tabular-nums block mt-0.5">
                      ¥{(item.kingdeeTotal / 10000).toFixed(2)}万
                    </strong>
                  </div>
                  <div>
                    <span className={`text-[10px] block ${theme.textSecondary}`}>核算差额</span>
                    <strong className={`text-xs md:text-sm font-bold tabular-nums block mt-0.5 ${item.delta >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {item.delta >= 0 ? '+' : ''}{(item.delta / 10000).toFixed(2)}万
                    </strong>
                  </div>
                </div>

                <p className={`text-[11px] leading-relaxed mb-3 ${theme.textSecondary}`}>
                  {item.explanation}
                </p>
              </div>

              <div className={`pt-2 border-t text-[11px] font-mono flex items-center justify-between ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.15)' }}>
                <span>未分摊金额：¥{item.unallocatedAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  对账一致
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Exceptions & Adjustments Section */}
        <div className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg} mb-5`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-semibold font-mono uppercase">
                异常与次日更正核销状态 (EXCEPTIONS)
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              稽核状态：正常
            </span>
          </div>

          <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>当前没有待处理的次日更正记录。前一交易日账目已全部平账，无挂账退单。</span>
            </div>
            <span className="font-mono text-[11px] opacity-75 hidden sm:inline">0 笔待更正</span>
          </div>
        </div>

        {/* Audit Sign-off Stamps */}
        <div className={`p-4 rounded-lg border ${theme.cardBorder} bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-amber-500/40 flex items-center justify-center text-amber-500 font-serif font-bold text-xs select-none">
              核准
            </div>
            <div className="text-xs">
              <span className="font-semibold block">财务核算中心稽核签发</span>
              <span className={`text-[11px] ${theme.textSecondary}`}>
                复核员：财务部·日报稽核组 · 2026-10-07 08:20
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-center px-3 py-1 rounded border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-slate-400 block">主口径数据完整性</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% 达成</span>
            </div>
            <div className="text-center px-3 py-1 rounded border border-black/10 dark:border-white/10">
              <span className="text-[10px] text-slate-400 block">ERP关联接口</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">正常连通</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
        <span>飞诺斯电子 · 经营日报</span>
        <span>第 6 页 / 共 7 页</span>
      </div>
    </div>
  );
};
