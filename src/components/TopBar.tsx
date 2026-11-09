/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download, Menu, Cpu } from 'lucide-react';

interface TopBarProps {
  botName: string;
  onOpenExport: () => void;
  onTogglePresets: () => void;
  onOpenGuide: () => void;
  onRandomize: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  botName,
  onOpenExport,
  onTogglePresets,
  onOpenGuide,
  onRandomize,
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3 bg-[#0a0a0a] border-b border-[#222222] z-20 shrink-0">
      {/* Zone 1: Pure Black & White Brand Wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onTogglePresets}
          className="lg:hidden p-1.5 text-neutral-400 hover:text-white hover:bg-[#1c1c1c] rounded-lg transition-colors border border-[#2c2c2c]"
          title="Toggle Presets"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-white">
            <Cpu className="w-4 h-4" />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wider uppercase text-white font-mono">
              GROTBOT<span className="text-neutral-400">.STUDIO</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-[#161616] text-neutral-400 border border-[#2c2c2c]">
              {botName}
            </span>
          </div>
        </div>
      </div>

      {/* Zone 2: Navigation Links in Neutral Monochrome */}
      <nav className="hidden md:flex items-center gap-7 text-xs font-mono text-neutral-400">
        <button
          onClick={onTogglePresets}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          [ ARCHETYPES ]
        </button>
        <button
          onClick={onRandomize}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          [ RANDOMIZE ]
        </button>
        <button
          onClick={onOpenGuide}
          className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          [ SPECS ]
        </button>
      </nav>

      {/* Zone 3: Primary Action - High-contrast Pure White Button */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded bg-[#161616] border border-[#2c2c2c] text-[10px] font-mono text-neutral-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYSTEM_READY</span>
        </div>

        <button
          onClick={onOpenExport}
          className="px-4 py-2 text-xs font-mono font-bold text-black bg-white hover:bg-neutral-200 rounded-lg transition-all shadow-md flex items-center gap-2 whitespace-nowrap shrink-0 active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-black stroke-[2.5]" />
          <span>EXPORT.SVG</span>
        </button>
      </div>
    </header>
  );
};
