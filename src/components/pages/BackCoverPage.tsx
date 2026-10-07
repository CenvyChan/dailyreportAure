import React, { useState } from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { reportMeta, overviewKPIs } from '../../data/reportData';
import { 
  Printer, 
  Copy, 
  Check, 
  RotateCcw, 
  Code2, 
  FileText,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

interface BackCoverPageProps {
  theme: ThemeConfig;
  onGoToPage: (page: number) => void;
  onOpenVueMigration: () => void;
}

export const BackCoverPage: React.FC<BackCoverPageProps> = ({ 
  theme, 
  onGoToPage,
  onOpenVueMigration 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyExecutiveSummary = () => {
    const summary = `【${reportMeta.company} 经营日报速报】
基准日期：${reportMeta.formattedDate}
1. 销售日报：¥${overviewKPIs.salesTotal.toLocaleString()} (${overviewKPIs.salesCount}笔)
2. 采购日报：¥${overviewKPIs.purchaseTotal.toLocaleString()} (${overviewKPIs.purchaseCount}笔)
3. 经营收支净差：+¥${overviewKPIs.netMargin.toLocaleString()}
4. 对账状态：金蝶ERP核算接口已连通，无历史更正待处理。
（快照${reportMeta.snapshotNumber} · 生成于${reportMeta.generatedAt}）`;

    navigator.clipboard?.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={`w-full h-full p-6 md:p-10 flex flex-col justify-between overflow-y-auto ${theme.pageBg} ${theme.textPrimary}`}>
      {/* Decorative Top */}
      <div>
        <div className="flex items-center justify-between border-b pb-3 mb-6" style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
          <div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-500 block font-semibold">
              COLOPHON & AUDIT ARCHIVE · SECTION 06
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-semibold mt-0.5">
              封底归档与签发备忘
            </h2>
          </div>
          <div className="text-xs font-mono opacity-60">
            FINOS-REP-20260810-08
          </div>
        </div>

        {/* Executive Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <button
            onClick={handleCopyExecutiveSummary}
            className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} hover:border-amber-500/50 transition-all text-left group`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">复制高管日报速报</span>
              {copied ? (
                <Check className="w-4 h-4 text-emerald-500" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-amber-500 transition-colors" />
              )}
            </div>
            <p className={`text-[11px] ${theme.textSecondary}`}>
              {copied ? '已成功复制到剪贴板！' : '一键生成适合微信/邮件汇报的文本'}
            </p>
          </button>

          <button
            onClick={handlePrint}
            className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} hover:border-blue-500/50 transition-all text-left group`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold">打印 / 导出 PDF</span>
              <Printer className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className={`text-[11px] ${theme.textSecondary}`}>
              以专业无边框版式调用系统打印或保存
            </p>
          </button>

          <button
            onClick={onOpenVueMigration}
            className={`p-3.5 rounded-lg border ${theme.cardBorder} ${theme.cardBg} hover:border-emerald-500/50 transition-all text-left group`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Vue 3 移植技术手册
              </span>
              <Code2 className="w-4 h-4 text-emerald-500" />
            </div>
            <p className={`text-[11px] ${theme.textSecondary}`}>
              查看 Vue 3 + Tailwind CSS 完整对应源码
            </p>
          </button>
        </div>

        {/* Publication Certification Box */}
        <div className={`p-5 rounded-lg border ${theme.cardBorder} bg-black/[0.02] dark:bg-white/[0.02] mb-6`}>
          <div className="flex items-start gap-3 mb-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider font-mono">
                企业经营机密与公报合规声明
              </h4>
              <p className={`text-xs mt-1 leading-relaxed ${theme.textSecondary}`}>
                本公报所载全部销售明细、供应商采购支出及金蝶 ERP 动态对账差额，属于飞诺斯电子科技有限公司商业机密。仅限授权高管审阅，未经书面许可严禁外传或擅自截取发布。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-3 border-t border-black/5 dark:border-white/5 text-[11px] font-mono text-slate-500">
            <div>
              <span>系统快照：</span>
              <strong className="text-slate-700 dark:text-slate-300">#8 (终审生效)</strong>
            </div>
            <div>
              <span>数据校验和：</span>
              <strong className="text-slate-700 dark:text-slate-300">SHA-256 Valid</strong>
            </div>
            <div>
              <span>生成节点：</span>
              <strong className="text-slate-700 dark:text-slate-300">Prod-Cluster-02</strong>
            </div>
            <div>
              <span>核算币种：</span>
              <strong className="text-slate-700 dark:text-slate-300">CNY (人民币元)</strong>
            </div>
          </div>
        </div>

        {/* Back to Cover Button */}
        <div className="text-center py-2">
          <button
            onClick={() => onGoToPage(1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-medium border border-current/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>合上书本 · 返回封面</span>
          </button>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className={`pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
        <span>© 2026 {reportMeta.company} · 版权所有</span>
        <span>第 7 页 / 共 7 页 (完)</span>
      </div>
    </div>
  );
};
