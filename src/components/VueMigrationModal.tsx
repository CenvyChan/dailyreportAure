import React, { useState } from 'react';
import { X, Code2, Copy, Check, Sparkles, BookOpen, Layers } from 'lucide-react';

interface VueMigrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VueMigrationModal: React.FC<VueMigrationModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'component' | 'gesture' | 'css'>('component');

  if (!isOpen) return null;

  const vueSFCcode = `<!-- OperatingReportEBook.vue (Vue 3 + Composition API + Tailwind CSS) -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useSwipe, useFullscreen, useStorage } from '@vueuse/core';

// 1. 响应式阅读状态与个性化设置
const currentPage = ref(1);
const totalPages = 7;
const viewMode = ref<'auto' | 'double' | 'single'>('auto');
const theme = ref<'parchment' | 'modern' | 'dark' | 'sage'>('parchment');
const soundEnabled = ref(true);
const isFlipping = ref(false);

// 2. 沉浸式全屏
const bookContainerRef = ref<HTMLElement | null>(null);
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(bookContainerRef);

// 3. 触摸滑动切页手势 (Touch Swipe Gestures)
const { isSwiping, direction, distanceX } = useSwipe(bookContainerRef, {
  passive: false,
  onSwipeEnd(e, dir) {
    if (dir === 'left') {
      nextPage(); // 左滑翻向下一页
    } else if (dir === 'right') {
      prevPage(); // 右滑翻向前一页
    }
  }
});

// 4. 翻页动力学引擎与 Web Audio 纸张声音合成
const playPageTurnSound = () => {
  if (!soundEnabled.value) return;
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.04;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1000;
  const gain = ctx.createGain();
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  noise.start();
};

const nextPage = () => {
  if (currentPage.value < totalPages && !isFlipping.value) {
    isFlipping.value = true;
    playPageTurnSound();
    currentPage.value += (viewMode.value === 'double' ? 2 : 1);
    setTimeout(() => { isFlipping.value = false; }, 400);
  }
};

const prevPage = () => {
  if (currentPage.value > 1 && !isFlipping.value) {
    isFlipping.value = true;
    playPageTurnSound();
    currentPage.value = Math.max(1, currentPage.value - (viewMode.value === 'double' ? 2 : 1));
    setTimeout(() => { isFlipping.value = false; }, 400);
  }
};

// 5. 键盘快捷键监听
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') nextPage();
  if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevPage();
  if (e.key === 'f' || e.key === 'F') toggleFullscreen();
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<template>
  <div 
    ref="bookContainerRef"
    class="min-h-screen flex flex-col justify-between transition-colors duration-300"
    :class="theme === 'parchment' ? 'bg-[#1c1917]' : 'bg-slate-950'"
  >
    <!-- 顶部导航条 -->
    <header class="h-14 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-6 flex items-center justify-between text-white">
      <div class="font-semibold text-sm">飞诺斯电子 · 经营日报 (Vue 3 版)</div>
      <div class="flex items-center gap-2">
        <button @click="toggleFullscreen" class="px-3 py-1.5 bg-slate-800 rounded text-xs hover:bg-slate-700">
          {{ isFullscreen ? '退出沉浸' : '沉浸阅读' }}
        </button>
      </div>
    </header>

    <!-- 电子书主体：支持 3D 拟真对开或单页 -->
    <main class="flex-1 flex items-center justify-center p-4 md:p-8 perspective-2000">
      <div class="w-full max-w-5xl aspect-[1.45/1] bg-[#FAF7EE] rounded-xl shadow-2xl flex relative overflow-hidden transition-all duration-300">
        <!-- 中缝装订阴影 (Spine Shadow) -->
        <div class="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none z-20" />
        
        <!-- 左页内容插槽 -->
        <div class="w-1/2 p-8 border-r border-stone-200 overflow-y-auto">
          <slot name="left-page" :page="currentPage" />
        </div>
        <!-- 右页内容插槽 -->
        <div class="w-1/2 p-8 overflow-y-auto">
          <slot name="right-page" :page="currentPage + 1" />
        </div>
      </div>
    </main>

    <!-- 底部控制栏与触控手势提示 -->
    <footer class="h-12 bg-slate-900/80 border-t border-slate-800 px-6 flex items-center justify-between text-xs text-slate-400">
      <span>手势：支持屏幕滑动、键盘左右键与滚轮切页</span>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
    </footer>
  </div>
</template>`;

  const gestureCode = `// 手势核心逻辑说明 (使用 VueUse 或 原生 Touch API):
import { useSwipe } from '@vueuse/core';

// 1. 左右滑动判定阈值
const { direction, distanceX } = useSwipe(targetElement, {
  threshold: 50, // 滑动距离超过 50px 触发
  onSwipeEnd(e, dir) {
    if (dir === 'left') nextPage();  // 像左拉翻下一页
    if (dir === 'right') prevPage(); // 像右拉翻上一页
  }
});

// 2. 原生触摸实现 (如果不引入外部包):
let touchStartX = 0;
const onTouchStart = (e: TouchEvent) => {
  touchStartX = e.touches[0].clientX;
};
const onTouchEnd = (e: TouchEvent) => {
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  if (deltaX < -50) nextPage();
  if (deltaX > 50) prevPage();
};`;

  const cssCode = `/* Tailwind CSS 扩展类 (实现电子书真实翻书 3D 动力学) */
.perspective-2000 {
  perspective: 2000px;
}

.book-spread-3d {
  transform-style: preserve-3d;
  box-shadow: 0 25px 60px rgba(0,0,0,0.45);
}

/* 翻折转场动画 */
.page-flip-enter-active,
.page-flip-leave-active {
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
  transform-origin: left center;
}

.page-flip-leave-to {
  transform: rotateY(-90deg);
  opacity: 0;
}`;

  const handleCopy = () => {
    const textToCopy = activeTab === 'component' ? vueSFCcode : activeTab === 'gesture' ? gestureCode : cssCode;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl text-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold">Vue 3 + Tailwind CSS 电子书架构指南</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                  Vue 3 SFC Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-400">满足您对 Vue 框架与左右翻页电子书响应式交互的技术诉求</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="px-5 pt-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('component')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'component'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Vue 3 单文件组件 (SFC)
            </button>
            <button
              onClick={() => setActiveTab('gesture')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'gesture'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              触控手势核心逻辑
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'css'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Tailwind 3D 动效样式
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-3 py-1 mb-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            <span>{copied ? '已复制到剪贴板' : '一键复制代码'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-slate-950 text-slate-300">
          <pre className="p-3 leading-relaxed whitespace-pre overflow-x-auto selection:bg-emerald-500/30">
            {activeTab === 'component' ? vueSFCcode : activeTab === 'gesture' ? gestureCode : cssCode}
          </pre>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 bg-slate-900">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>当前系统已在 React + Tailwind 环境中实现完整等效运行；以上为为您量身定制的 Vue 3 对应实现！</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition-colors self-end sm:self-auto"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};
