import React, { useState } from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { salesRecords, overviewKPIs } from '../../data/reportData';
import { Search, ArrowUpDown, Building2, Check, Copy } from 'lucide-react';

interface SalesLedgerPageProps {
  theme: ThemeConfig;
}

export const SalesLedgerPage: React.FC<SalesLedgerPageProps> = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'amount-desc' | 'amount-asc'>('amount-desc');
  const [copied, setCopied] = useState(false);

  // Filter & sort
  const filteredRecords = salesRecords
    .filter(r => r.customer.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      return a.amount - b.amount;
    });

  const totalFilteredAmount = filteredRecords.reduce((sum, r) => sum + r.amount, 0);

  const handleCopySummary = () => {
    const text = filteredRecords
      .map(r => `${r.customer}\t¥${r.amount.toFixed(2)}\t${r.status === 'linked' ? '已关联' : '未关联'}`)
      .join('\n');
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto ${theme.pageBg} ${theme.textPrimary}`}>
      <div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 mb-4" style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
          <div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 block font-semibold">
              MANUAL SALES LEDGER · SECTION 03
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-semibold mt-0.5">
              销售日报明细账簿
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              共 9 笔手填单据 · ¥471,669.52
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-4">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="搜索客户名称 (如: 昕诺飞, 台达)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border ${theme.cardBorder} bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy(sortBy === 'amount-desc' ? 'amount-asc' : 'amount-desc')}
              className={`px-2.5 py-1.5 rounded-lg border ${theme.cardBorder} bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-mono flex items-center gap-1 transition-colors`}
            >
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <span>金额排序 ({sortBy === 'amount-desc' ? '高→低' : '低→高'})</span>
            </button>

            <button
              onClick={handleCopySummary}
              className={`px-2.5 py-1.5 rounded-lg border ${theme.cardBorder} bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-mono flex items-center gap-1 transition-colors`}
              title="复制当前销售明细表格"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copied ? '已复制' : '复制'}</span>
            </button>
          </div>
        </div>

        {/* Main Sales Table */}
        <div className={`rounded-lg border ${theme.cardBorder} overflow-hidden shadow-sm mb-4`}>
          <table className="w-full text-xs text-left">
            <thead className={`${theme.tableHeadBg} border-b ${theme.tableBorder} text-slate-600 dark:text-slate-400 font-mono text-[11px]`}>
              <tr>
                <th className="py-2.5 px-3">序号</th>
                <th className="py-2.5 px-3">客户名称</th>
                <th className="py-2.5 px-3">业务日期</th>
                <th className="py-2.5 px-3 text-right">日报金额 (元)</th>
                <th className="py-2.5 px-3 text-right">占比</th>
                <th className="py-2.5 px-3 text-right">已关联金额</th>
                <th className="py-2.5 px-3 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
              {filteredRecords.map((item, index) => {
                const ratio = ((item.amount / overviewKPIs.salesTotal) * 100).toFixed(1);
                return (
                  <tr key={item.id} className={`${theme.tableRowHover} transition-colors group`}>
                    <td className="py-2 px-3 text-slate-400 text-[11px]">{index + 1}</td>
                    <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <span>{item.customer}</span>
                    </td>
                    <td className="py-2 px-3 text-slate-500 text-[11px]">{item.date}</td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                      {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-500">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[10px]">{ratio}%</span>
                        <div className="w-10 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${Math.min(100, parseFloat(ratio))}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-400">
                      {item.linkedAmount.toFixed(2)}
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20">
                        未关联
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Summary Footer */}
            <tfoot className={`${theme.tableHeadBg} border-t ${theme.tableBorder} font-mono font-semibold`}>
              <tr>
                <td colSpan={3} className="py-2.5 px-3">
                  合计 ({filteredRecords.length} 笔)
                </td>
                <td className="py-2.5 px-3 text-right text-blue-600 dark:text-blue-400 font-bold tabular-nums">
                  ¥{totalFilteredAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums text-slate-500">
                  {((totalFilteredAmount / overviewKPIs.salesTotal) * 100).toFixed(1)}%
                </td>
                <td className="py-2.5 px-3 text-right tabular-nums text-slate-400">
                  ¥0.00
                </td>
                <td className="py-2.5 px-3 text-center text-slate-400 text-[10px]">
                  待回单核销
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Customer Structure Insight Note */}
        <div className={`p-3 rounded-lg border ${theme.cardBorder} bg-black/[0.02] dark:bg-white/[0.02] text-xs leading-relaxed ${theme.textSecondary}`}>
          <span className="font-semibold text-slate-800 dark:text-slate-200 font-sans">客户集中度分析：</span>
          今日前三大出货客户分别为 <strong>昕诺飞厦门</strong> (¥25.86万，占54.8%)、<strong>东莞台达</strong> (¥5.05万，占10.7%) 与 <strong>美加堂</strong> (¥4.54万，占9.6%)，三大客户合计占当日总销量的 <strong>75.14%</strong>。产销配合稳定，质检回执齐备。
        </div>
      </div>

      {/* Footer */}
      <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
        <span>飞诺斯电子 · 经营日报</span>
        <span>第 4 页 / 共 7 页</span>
      </div>
    </div>
  );
};
