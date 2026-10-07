import {
  ReportMeta,
  OverviewKPIs,
  TrendDay,
  SalesRecord,
  PurchaseRecord,
  KingdeeComparison
} from '../types';

export const reportMeta: ReportMeta = {
  company: '飞诺斯电子科技有限公司',
  reportName: '经营日报',
  reportDate: '2026-08-10',
  formattedDate: '2026年08月10日',
  snapshotNumber: '#8',
  generatedAt: '2026-10-07 08:20:50',
  status: '数据完整',
  principle: '手填日报为主口径，金蝶数据作为参考与对账依据'
};

export const overviewKPIs: OverviewKPIs = {
  salesTotal: 471669.52,
  salesCount: 9,
  purchaseTotal: 127340.88,
  purchaseCount: 20,
  netMargin: 344328.64, // 471669.52 - 127340.88
  salesCoverageAmount: 0.0,
  purchaseCoverageAmount: 0.0,
  salesCoverageRate: 0,
  purchaseCoverageRate: 0
};

export const trendDays: TrendDay[] = [
  { date: '2026-08-01', label: '08-01', sales: 257395.73, purchase: 161428.67, notes: '月初集中接单与首期原料备料' },
  { date: '2026-08-02', label: '08-02', sales: 0.0, purchase: 0.0, notes: '周日休市' },
  { date: '2026-08-03', label: '08-03', sales: 230845.65, purchase: 107870.1, notes: '周初正常开工生产交货' },
  { date: '2026-08-04', label: '08-04', sales: 238609.3, purchase: 221765.16, notes: '新线物料投入与批量供货' },
  { date: '2026-08-05', label: '08-05', sales: 291807.97, purchase: 656662.74, notes: '月度原料及大宗元器件大额采购结算日' },
  { date: '2026-08-06', label: '08-06', sales: 729931.58, purchase: 219199.15, notes: '主客户昕诺飞批量出货，本月销售最高峰' },
  { date: '2026-08-07', label: '08-07', sales: 573454.71, purchase: 153099.84, notes: '高位稳健交货' },
  { date: '2026-08-08', label: '08-08', sales: 438283.23, purchase: 133681.63, notes: '周末前常规交付' },
  { date: '2026-08-09', label: '08-09', sales: 0.0, purchase: 0.0, notes: '周日休市' },
  { date: '2026-08-10', label: '08-10 (今日)', sales: 471669.52, purchase: 127340.88, notes: '今日经营状况良好，订单出货稳定' }
];

export const salesRecords: SalesRecord[] = [
  { id: 'S01', customer: '昕诺飞厦门', date: '2026-08-10', amount: 258580.15, linkedAmount: 0.0, status: 'unlinked', proportion: 54.82 },
  { id: 'S02', customer: '东莞台达', date: '2026-08-10', amount: 50477.93, linkedAmount: 0.0, status: 'unlinked', proportion: 10.70 },
  { id: 'S03', customer: '美加堂', date: '2026-08-10', amount: 45386.21, linkedAmount: 0.0, status: 'unlinked', proportion: 9.62 },
  { id: 'S04', customer: '赛诺', date: '2026-08-10', amount: 36337.35, linkedAmount: 0.0, status: 'unlinked', proportion: 7.70 },
  { id: 'S05', customer: '和而泰', date: '2026-08-10', amount: 26161.09, linkedAmount: 0.0, status: 'unlinked', proportion: 5.55 },
  { id: 'S06', customer: '三星医疗', date: '2026-08-10', amount: 24162.42, linkedAmount: 0.0, status: 'unlinked', proportion: 5.12 },
  { id: 'S07', customer: '昕诺飞荷兰', date: '2026-08-10', amount: 22963.97, linkedAmount: 0.0, status: 'unlinked', proportion: 4.87 },
  { id: 'S08', customer: '虹锐电工', date: '2026-08-10', amount: 5120.40, linkedAmount: 0.0, status: 'unlinked', proportion: 1.09 },
  { id: 'S09', customer: '三花', date: '2026-08-10', amount: 2480.00, linkedAmount: 0.0, status: 'unlinked', proportion: 0.53 }
];

export const purchaseRecords: PurchaseRecord[] = [
  { id: 'P01', supplier: '宁波三赢化工有限公司', date: '2026-08-10', amount: 31460.00, linkedAmount: 0.0, status: 'unlinked', category: '化工原料' },
  { id: 'P02', supplier: '瑞年新材料（广东）有限公司', date: '2026-08-10', amount: 21775.00, linkedAmount: 0.0, status: 'unlinked', category: '核心复合材料' },
  { id: 'P03', supplier: '宁波卢米电子科技有限公司', date: '2026-08-10', amount: 18415.80, linkedAmount: 0.0, status: 'unlinked', category: '电子元器件' },
  { id: 'P04', supplier: '嘉兴市宏越模具有限公司', date: '2026-08-10', amount: 13860.00, linkedAmount: 0.0, status: 'unlinked', category: '精密模具治具' },
  { id: 'P05', supplier: '慈溪市桥城五金厂（普通合伙）', date: '2026-08-10', amount: 8972.88, linkedAmount: 0.0, status: 'unlinked', category: '五金冲压件' },
  { id: 'P06', supplier: '昆山铂信橡塑材料有限公司', date: '2026-08-10', amount: 8400.00, linkedAmount: 0.0, status: 'unlinked', category: '橡塑阻燃材料' },
  { id: 'P07', supplier: '中铭(四川)新材料科技有限公司', date: '2026-08-10', amount: 5860.16, linkedAmount: 0.0, status: 'unlinked', category: '结构件绝缘材料' },
  { id: 'P08', supplier: '宁波陆路金属材料有限公司', date: '2026-08-10', amount: 3086.90, linkedAmount: 0.0, status: 'unlinked', category: '铜铝导电金属' },
  { id: 'P09', supplier: '网购 (零星急用备品备件)', date: '2026-08-10', amount: 2716.66, linkedAmount: 0.0, status: 'unlinked', category: '车间耗材' },
  { id: 'P10', supplier: '慈溪程拓仪表配件有限公司', date: '2026-08-10', amount: 2250.00, linkedAmount: 0.0, status: 'unlinked', category: '测试检测耗材' },
  { id: 'P11', supplier: '南通鸿杰电子有限公司', date: '2026-08-10', amount: 1800.00, linkedAmount: 0.0, status: 'unlinked', category: '接插件连接器' },
  { id: 'P12', supplier: '慈溪市南天机电设备有限公司', date: '2026-08-10', amount: 1681.00, linkedAmount: 0.0, status: 'unlinked', category: '设备备品备件' },
  { id: 'P13', supplier: '宁波环胜包装材料有限公司', date: '2026-08-10', amount: 1600.00, linkedAmount: 0.0, status: 'unlinked', category: '包材及纸箱' },
  { id: 'P14', supplier: '慈溪市加德科化工有限公司', date: '2026-08-10', amount: 1200.00, linkedAmount: 0.0, status: 'unlinked', category: '助焊防护剂' },
  { id: 'P15', supplier: '苏州凡昕达电子有限公司', date: '2026-08-10', amount: 1150.00, linkedAmount: 0.0, status: 'unlinked', category: '线束连接器' },
  { id: 'P16', supplier: '慈溪市云采办公用品有限公司', date: '2026-08-10', amount: 900.00, linkedAmount: 0.0, status: 'unlinked', category: '厂务行政用品' },
  { id: 'P17', supplier: '慈溪市乐旺包装用品有限公司', date: '2026-08-10', amount: 738.00, linkedAmount: 0.0, status: 'unlinked', category: '防静电泡沫袋' },
  { id: 'P18', supplier: '慈溪市恒发模具配件有限公司', date: '2026-08-10', amount: 717.48, linkedAmount: 0.0, status: 'unlinked', category: '模具顶针配件' },
  { id: 'P19', supplier: '宁波东豪新材料有限公司', date: '2026-08-10', amount: 694.00, linkedAmount: 0.0, status: 'unlinked', category: '特种工程胶水' },
  { id: 'P20', supplier: '余姚市永盛塑染有限公司', date: '2026-08-10', amount: 63.00, linkedAmount: 0.0, status: 'unlinked', category: '色母料测试样' }
];

export const kingdeeComparisons: KingdeeComparison[] = [
  {
    type: 'sales',
    title: '销售 · 本月参考对账',
    dailyTotal: 3231997.70,
    kingdeeTotal: 3003691.57,
    delta: 228306.13,
    unallocatedAmount: 1639399.29,
    detailRows: 500,
    explanation: '日报手填累计额略高于金蝶ERP系统，差额系部分当日交付大货尚未在金蝶完成终审开票回执录入，属于正常结算时间差。'
  },
  {
    type: 'purchase',
    title: '采购 · 本月参考对账',
    dailyTotal: 1781048.17,
    kingdeeTotal: 5542062.85,
    delta: -3761014.68,
    unallocatedAmount: 1194199.69,
    detailRows: 500,
    explanation: '金蝶采购系统累计额高于日报手填额376.1万元，主因金蝶已录入全月合同采购预提单据与预付账期单，而日报严格以当日仓库实际验收入库单为手填核算口径。'
  }
];

export const bookChapters = [
  { page: 1, title: '封面与公报摘要', subtitle: 'Executive Folio & Briefing', kicker: 'VOL. 08-10' },
  { page: 2, title: '经营总览与关键指标', subtitle: 'Executive KPI & Status', kicker: 'OVERVIEW' },
  { page: 3, title: '图表洞察与趋势对比', subtitle: 'Analytics & Trend Curve', kicker: 'ANALYTICS' },
  { page: 4, title: '销售日报明细账簿', subtitle: 'Sales Ledger (9 Transactions)', kicker: 'SALES' },
  { page: 5, title: '采购日报明细账簿', subtitle: 'Purchase Ledger (20 Transactions)', kicker: 'PURCHASE' },
  { page: 6, title: '金蝶参考与对账稽核', subtitle: 'ERP Reconciliation & Exceptions', kicker: 'AUDIT' },
  { page: 7, title: '封底归档与签发备忘', subtitle: 'Colophon & Migration Guide', kicker: 'COLOPHON' }
];
