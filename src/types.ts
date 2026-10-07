export type ThemeMode = 'parchment' | 'modern' | 'dark' | 'sage';
export type FlipEngine = 'flip3d' | 'slide' | 'fade';
export type FontSize = 'compact' | 'normal' | 'relaxed' | 'large';
export type ViewMode = 'auto' | 'double' | 'single';

export interface ReportMeta {
  company: string;
  reportName: string;
  reportDate: string;
  formattedDate: string;
  snapshotNumber: string;
  generatedAt: string;
  status: string;
  principle: string;
}

export interface OverviewKPIs {
  salesTotal: number;
  salesCount: number;
  purchaseTotal: number;
  purchaseCount: number;
  netMargin: number;
  salesCoverageAmount: number;
  purchaseCoverageAmount: number;
  salesCoverageRate: number;
  purchaseCoverageRate: number;
}

export interface TrendDay {
  date: string;
  label: string;
  sales: number;
  purchase: number;
  notes?: string;
}

export interface SalesRecord {
  id: string;
  customer: string;
  date: string;
  amount: number;
  linkedAmount: number;
  status: 'linked' | 'unlinked';
  proportion?: number;
}

export interface PurchaseRecord {
  id: string;
  supplier: string;
  date: string;
  amount: number;
  linkedAmount: number;
  status: 'linked' | 'unlinked';
  category?: string;
}

export interface KingdeeComparison {
  type: 'sales' | 'purchase';
  title: string;
  dailyTotal: number;
  kingdeeTotal: number;
  delta: number;
  unallocatedAmount: number;
  detailRows: number;
  explanation: string;
}

export interface ReadingSettings {
  theme: ThemeMode;
  flipEngine: FlipEngine;
  fontSize: FontSize;
  viewMode: ViewMode;
  soundEnabled: boolean;
  spineShadow: boolean;
  autoPlay: boolean;
  autoPlayInterval: number; // in seconds
}
