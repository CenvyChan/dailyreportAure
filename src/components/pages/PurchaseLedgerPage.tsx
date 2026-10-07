import React, { useState } from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { purchaseRecords, overviewKPIs } from '../../data/reportData';
import { Search, ArrowUpDown, Truck, Copy, Check } from 'lucide-react';

interface PurchaseLedgerPageProps {
  theme: ThemeConfig;
}

export const PurchaseLedgerPage: React.FC<PurchaseLedgerPageProps> = ({ theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'amount-desc' | 'amount-asc'>('amount-desc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  const categories = ['all', '化工原料', '核心复合材料', '电子元器件', '精密模具治具', '五金冲压件'];

  const filteredRecords = purchaseRecords
    .filter(r => {
      const matchSearch = r.supplier.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = selectedCategory === 'all' || r.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'amount-desc') return b.amount - a.amount;
      return a.amount - b.amount;
    });

  const totalFilteredAmount = filteredRecords.reduce((sum, r) => sum + r.amount, 0);

  const handleCopySummary = () => {
    const text = filteredRecords
      .map(r => `${r.supplier}\t¥${r.amount.toFixed(2)}\t${r.category}\t${r.status === 'linked' ? '已关联' : '未关联'}`)
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
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 block font-semibold">
              MANUAL PROCUREMENT LEDGER · SECTION 04
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-semibold mt-0.5">
              采购日报明细账簿
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              共 20 笔手填单据 · ¥127,340.88
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="搜索供应商 (如: 三赢化工, 瑞年, 卢米)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border ${theme.cardBorder} bg-black/5 dark:bg-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-500`}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortBy(sortBy === 'amount-desc' ? 'amount-asc' : 'amount-desc')}
              className={`px-2.5 py-1.5 rounded-lg border ${theme.cardBorder} bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-mono flex items-center gap-1 transition-colors`}
            >
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <span>金额 ({sortBy === 'amount-desc' ? '降序' : '升序'})</span>
            </button>

            <button
              onClick={handleCopySummary}
              className={`px-2.5 py-1.5 rounded-lg border ${theme.cardBorder} bg-black/5 dark:bg-white/5 hover:bg-black/10 text-xs font-mono flex items-center gap-1 transition-colors`}
              title="复制当前采购表格"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copied ? '已复制' : '复制'}</span>
            </button>
          </div>
        </div>

        {/* Category Pills (Functional filter buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 text-xs scrollbar-none">
          <span className="text-[11px] text-slate-400 font-mono shrink-0 mr-1">分类筛选:</span>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded text-[11px] font-sans transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-medium shadow-sm'
                  : 'bg-black/5 dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? '全部供应商' : cat}
            </button>
          ))}
        </div>

        {/* Table Container with Controlled Scroll */}
        <div className={`rounded-lg border ${theme.cardBorder} overflow-hidden shadow-sm mb-3 max-h-96 md:max-h-[380px] overflow-y-auto`}>
          <table className="w-full text-xs text-left">
            <thead className={`sticky top-0 ${theme.tableHeadBg} border-b ${theme.tableBorder} text-slate-600 dark:text-slate-400 font-mono text-[11px] z-10`}>
              <tr>
                <th className="py-2.5 px-3">序号</th>
                <th className="py-2.5 px-3">供应商名称</th>
                <th className="py-2.5 px-3">采购类目</th>
                <th className="py-2.5 px-3 text-right">日报金额 (元)</th>
                <th className="py-2.5 px-3 text-right">占比</th>
                <th className="py-2.5 px-3 text-center">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5 font-mono">
              {filteredRecords.map((item, index) => {
                const ratio = ((item.amount / overviewKPIs.purchaseTotal) * 100).toFixed(1);
                return (
                  <tr key={item.id} className={`${theme.tableRowHover} transition-colors group`}>
                    <td className="py-2 px-3 text-slate-400 text-[11px]">{index + 1}</td>
                    <td className="py-2 px-3 font-sans font-medium text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                      <span className="truncate max-w-[200px] md:max-w-[280px]" title={item.supplier}>
                        {item.supplier}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-500 text-[11px] font-sans">
                      <span className="text-[11px] text-slate-600 dark:text-slate-400">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                      {item.amount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums text-slate-500">
                      <span className="text-[10px]">{ratio}%</span>
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
          </table>
        </div>

        {/* Footer Summary Bar */}
        <div className={`p-3 rounded-lg border ${theme.cardBorder} bg-black/[0.02] dark:bg-white/[0.02] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-mono`}>
          <div>
            <span>当前筛选显示：<strong>{filteredRecords.length}</strong> / 20 笔单据</span>
            <span className="mx-2 text-slate-400">·</span>
            <span>筛选金额：<strong className="text-emerald-600 dark:text-emerald-400">¥{totalFilteredAmount.toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</strong></span>
          </div>
          <div className="text-[11px] text-slate-400">
            采购支出结构以化工原料(24.7%)及核心复合材料(17.1%)为主
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
        <span>飞诺斯电子 · 经营日报</span>
        <span>第 5 页 / 共 7 页</span>
      </div>
    </div>
  );
};
