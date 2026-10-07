import React from 'react';
import { 
  X, 
  Palette, 
  Sparkles, 
  Type, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Layers,
  Play,
  Square,
  Check
} from 'lucide-react';
import { ReadingSettings, ThemeMode, FlipEngine, FontSize, ViewMode } from '../types';
import { THEME_CONFIGS } from '../utils/themeStyles';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onUpdateSettings: (newSettings: Partial<ReadingSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold">个性化阅读设置</h3>
              <p className="text-[11px] text-slate-400">定制电子书翻页动效、纸质色彩与排版比例</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-5 overflow-y-auto space-y-5 text-xs">
          {/* 1. Theme Selection */}
          <div>
            <label className="text-slate-300 font-medium block mb-2.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>纸张质感与主题配色</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {(Object.keys(THEME_CONFIGS) as ThemeMode[]).map((mode) => {
                const conf = THEME_CONFIGS[mode];
                const isSelected = settings.theme === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => onUpdateSettings({ theme: mode })}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50'
                        : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800/70 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-semibold text-slate-200 block text-xs">{conf.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 leading-relaxed">{conf.desc}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Flip Animation Engine */}
          <div>
            <label className="text-slate-300 font-medium block mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>翻页动画引擎</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ flipEngine: 'flip3d' })}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  settings.flipEngine === 'flip3d'
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300 font-semibold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-xs">3D 拟真翻折</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">带立体景深弧度</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ flipEngine: 'slide' })}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  settings.flipEngine === 'slide'
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300 font-semibold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-xs">平滑滑移</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">触控惯性阻尼</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ flipEngine: 'fade' })}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  settings.flipEngine === 'fade'
                    ? 'border-blue-500 bg-blue-500/15 text-blue-300 font-semibold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-xs">经典叠层</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">极速无缝淡入</span>
              </button>
            </div>
          </div>

          {/* 3. View Mode: Double Spread vs Single Page */}
          <div>
            <label className="text-slate-300 font-medium block mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>开本视口布局</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUpdateSettings({ viewMode: 'auto' })}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  settings.viewMode === 'auto'
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-xs">智能自适应</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">桌面双页/移动单页</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ viewMode: 'double' })}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  settings.viewMode === 'double'
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-xs">强制对开双页</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">左页+右页并排</span>
              </button>

              <button
                onClick={() => onUpdateSettings({ viewMode: 'single' })}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  settings.viewMode === 'single'
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300 font-semibold'
                    : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="block text-xs">单页全幅</span>
                <span className="block text-[10px] text-slate-500 mt-0.5">专注单版面阅读</span>
              </button>
            </div>
          </div>

          {/* 4. Font Size Scale */}
          <div>
            <label className="text-slate-300 font-medium block mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-purple-400" />
              <span>排版字号缩放比例</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['compact', 'normal', 'relaxed', 'large'] as FontSize[]).map((size) => {
                const labelMap = { compact: '紧凑 (85%)', normal: '标准 (100%)', relaxed: '舒适 (115%)', large: '大字 (130%)' };
                return (
                  <button
                    key={size}
                    onClick={() => onUpdateSettings({ fontSize: size })}
                    className={`py-2 px-1 text-center rounded-lg border transition-all text-[11px] ${
                      settings.fontSize === size
                        ? 'border-purple-500 bg-purple-500/15 text-purple-300 font-semibold'
                        : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {labelMap[size]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Toggles: Audio & Spine & Auto-play */}
          <div className="pt-2 border-t border-slate-800 space-y-3">
            {/* Audio Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-2">
                {settings.soundEnabled ? (
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <VolumeX className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <span className="font-medium text-slate-200 block">拟真翻页纸张摩擦音效</span>
                  <span className="text-[10px] text-slate-400 block">Web Audio API 真实白噪声合成，无网络依赖</span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  settings.soundEnabled ? 'bg-emerald-600' : 'bg-slate-700'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>

            {/* Spine Shadow Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <div>
                  <span className="font-medium text-slate-200 block">书籍中缝立体阴影</span>
                  <span className="text-[10px] text-slate-400 block">呈现精装开本自然装订阴影曲面</span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ spineShadow: !settings.spineShadow })}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  settings.spineShadow ? 'bg-amber-600' : 'bg-slate-700'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.spineShadow ? 'translate-x-5' : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>

            {/* Auto Play Toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-2">
                {settings.autoPlay ? (
                  <Play className="w-4 h-4 text-blue-400 animate-pulse" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <div>
                  <span className="font-medium text-slate-200 block">自动巡航翻页展示</span>
                  <span className="text-[10px] text-slate-400 block">每隔 {settings.autoPlayInterval} 秒自动翻向下一章节</span>
                </div>
              </div>
              <button
                onClick={() => onUpdateSettings({ autoPlay: !settings.autoPlay })}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  settings.autoPlay ? 'bg-blue-600' : 'bg-slate-700'
                }`}
              >
                <div 
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.autoPlay ? 'translate-x-5' : 'translate-x-0'
                  }`} 
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs transition-colors"
          >
            完成并应用
          </button>
        </div>
      </div>
    </div>
  );
};
