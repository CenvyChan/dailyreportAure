import React, { useState } from 'react';
import { ThemeConfig } from '../../utils/themeStyles';
import { trendDays, overviewKPIs } from '../../data/reportData';
import { BarChart3, LineChart, PieChart, Info } from 'lucide-react';

interface TrendsPageProps {
  theme: ThemeConfig;
}

export const TrendsPage: React.FC<TrendsPageProps> = ({ theme }) => {
  const [hoveredDay, setHoveredDay] = useState<number | null>(9); // Default to today (index 9)

  // Max value for chart scaling
  const maxVal = 750000;
  const svgWidth = 660;
  const svgHeight = 160;
  const paddingX = 40;
  const paddingY = 25;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const pointsCount = trendDays.length;

  const getCoordinates = (index: number, value: number) => {
    const x = paddingX + (index / (pointsCount - 1)) * chartW;
    const y = svgHeight - paddingY - (value / maxVal) * chartH;
    return { x, y };
  };

  const salesPoints = trendDays.map((d, i) => getCoordinates(i, d.sales));
  const purchasePoints = trendDays.map((d, i) => getCoordinates(i, d.purchase));

  const salesPolyline = salesPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const purchasePolyline = purchasePoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  const activeDay = hoveredDay !== null ? trendDays[hoveredDay] : trendDays[9];

  return (
    <div className={`w-full h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto ${theme.pageBg} ${theme.textPrimary}`}>
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-5" style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
          <div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 block font-semibold">
              VISUAL ANALYTICS · SECTION 02
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-semibold mt-0.5">
              趋势对比与图表洞察
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              销售日报
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              采购日报
            </span>
          </div>
        </div>

        {/* Top 2 Comparison Cards: Bar Chart + Donut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Bar Chart: Sales vs Purchase */}
          <div className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wide font-mono">
                  今日销售 / 采购金额对比
                </h3>
              </div>
              <span className={`text-[10px] font-mono ${theme.textTertiary}`}>手填主金额</span>
            </div>

            <div className="h-32 flex items-end justify-center gap-12 pt-3 pb-1 border-b border-black/10 dark:border-white/10">
              {/* Sales Bar */}
              <div className="flex flex-col items-center gap-1.5 w-20">
                <span className="text-[11px] font-mono font-semibold tabular-nums text-blue-600 dark:text-blue-400">
                  471,670
                </span>
                <div 
                  className="w-14 rounded-t bg-gradient-to-t from-blue-700 to-blue-500 transition-all duration-500 hover:brightness-110 shadow-sm"
                  style={{ height: '88px' }}
                />
                <span className="text-xs font-medium">销售日报</span>
              </div>

              {/* Purchase Bar */}
              <div className="flex flex-col items-center gap-1.5 w-20">
                <span className="text-[11px] font-mono font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                  127,341
                </span>
                <div 
                  className="w-14 rounded-t bg-gradient-to-t from-emerald-700 to-emerald-500 transition-all duration-500 hover:brightness-110 shadow-sm"
                  style={{ height: '24px' }}
                />
                <span className="text-xs font-medium">采购日报</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-slate-500">
              <span>采购占销售比：27.0%</span>
              <span className="text-amber-600 font-semibold">结余率：73.0%</span>
            </div>
          </div>

          {/* Donut Chart: Coverage Breakdown */}
          <div className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <PieChart className="w-4 h-4 text-emerald-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wide font-mono">
                  日报关联覆盖状态构成
                </h3>
              </div>
              <span className={`text-[10px] font-mono ${theme.textTertiary}`}>金额覆盖</span>
            </div>

            <div className="h-32 flex items-center justify-around">
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-black/10 dark:border-white/10 flex items-center justify-center">
                    <span className="text-xs font-bold font-mono">0.0%</span>
                  </div>
                </div>
                <span className="text-xs font-medium mt-1 text-blue-600 dark:text-blue-400">销售覆盖</span>
                <span className={`text-[10px] font-mono ${theme.textTertiary}`}>未关联 47.17万</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-black/10 dark:border-white/10 flex items-center justify-center">
                    <span className="text-xs font-bold font-mono">0.0%</span>
                  </div>
                </div>
                <span className="text-xs font-medium mt-1 text-emerald-600 dark:text-emerald-400">采购覆盖</span>
                <span className={`text-[10px] font-mono ${theme.textTertiary}`}>未关联 12.73万</span>
              </div>
            </div>

            <div className={`pt-2 border-t border-black/5 dark:border-white/5 text-[11px] ${theme.textSecondary} flex items-center gap-1`}>
              <Info className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>当日首批申报单据统一在次日金蝶过账后触发关联</span>
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Trend Chart */}
        <div className={`p-4 rounded-lg border ${theme.cardBorder} ${theme.cardBg}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-2">
              <LineChart className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-semibold uppercase tracking-wide font-mono">
                本月日报金额动态走势 (8月1日 - 8月10日真实数据)
              </h3>
            </div>
            {activeDay && (
              <div className="text-xs font-mono bg-black/5 dark:bg-white/5 px-2.5 py-0.5 rounded flex items-center gap-2">
                <span className="font-semibold text-amber-600">{activeDay.date}:</span>
                <span className="text-blue-600 dark:text-blue-400">销 ¥{activeDay.sales.toLocaleString()}</span>
                <span className="text-emerald-600 dark:text-emerald-400">采 ¥{activeDay.purchase.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* SVG Trend Chart */}
          <div className="relative w-full overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] rounded border border-black/5 dark:border-white/5 py-2">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-36 md:h-44 block select-none"
            >
              {/* Grid Lines */}
              <line x1={paddingX} y1={svgHeight - paddingY} x2={svgWidth - paddingX} y2={svgHeight - paddingY} stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" />
              <line x1={paddingX} y1={svgHeight - paddingY - chartH * 0.5} x2={svgWidth - paddingX} y2={svgHeight - paddingY - chartH * 0.5} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />
              <line x1={paddingX} y1={paddingY} x2={svgWidth - paddingX} y2={paddingY} stroke="currentColor" strokeOpacity="0.08" strokeDasharray="3 3" />

              {/* Polylines */}
              <polyline 
                points={salesPolyline} 
                fill="none" 
                stroke="#2563eb" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <polyline 
                points={purchasePolyline} 
                fill="none" 
                stroke="#16a34a" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Interactive Points */}
              {salesPoints.map((pt, i) => (
                <g key={`s-${i}`} className="cursor-pointer" onMouseEnter={() => setHoveredDay(i)}>
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={hoveredDay === i ? 6 : 3.5} 
                    fill="#2563eb" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    className="transition-all"
                  />
                </g>
              ))}

              {purchasePoints.map((pt, i) => (
                <g key={`p-${i}`} className="cursor-pointer" onMouseEnter={() => setHoveredDay(i)}>
                  <circle 
                    cx={pt.x} 
                    cy={pt.y} 
                    r={hoveredDay === i ? 6 : 3.5} 
                    fill="#16a34a" 
                    stroke="white" 
                    strokeWidth="1.5" 
                    className="transition-all"
                  />
                </g>
              ))}

              {/* Active Day Line */}
              {hoveredDay !== null && (
                <line 
                  x1={salesPoints[hoveredDay].x} 
                  y1={paddingY} 
                  x2={salesPoints[hoveredDay].x} 
                  y2={svgHeight - paddingY} 
                  stroke="currentColor" 
                  strokeOpacity="0.3" 
                  strokeDasharray="2 2" 
                />
              )}
            </svg>

            {/* X Axis Labels */}
            <div className="flex justify-between px-7 text-[10px] font-mono text-slate-400 mt-1">
              {trendDays.map((d, i) => (
                <button
                  key={d.date}
                  onClick={() => setHoveredDay(i)}
                  onMouseEnter={() => setHoveredDay(i)}
                  className={`transition-colors ${hoveredDay === i ? 'text-amber-500 font-bold underline' : 'hover:text-slate-200'}`}
                >
                  {d.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
            <span>峰值记录：8-06 销售最高 (¥72.99万) · 8-05 采购大宗原料 (¥65.67万)</span>
            <span>移动鼠标或触控节点查看当日明细</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`pt-3 border-t flex items-center justify-between text-[11px] font-mono ${theme.textTertiary}`} style={{ borderColor: 'rgba(120,113,108,0.2)' }}>
        <span>飞诺斯电子 · 经营日报</span>
        <span>第 3 页 / 共 7 页</span>
      </div>
    </div>
  );
};
