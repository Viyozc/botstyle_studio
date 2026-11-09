/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, Code2, MousePointer, Cpu } from 'lucide-react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none font-mono">
      <div className="bg-[#0f0f0f] border border-[#262626] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222] bg-[#080808]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-white" />
            <h2 className="text-sm font-semibold text-white">About GrotBot & Charcoal Design</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1f1f1f] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-neutral-300 leading-relaxed">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <span>Vector Mechanics & Philosophy</span>
            </h3>
            <p className="text-neutral-400">
              Inspired by the iconic character designs of <strong>Charcoal UI</strong> and <strong>Grotbot</strong>, every bot in this studio is rendered entirely in scalable vector graphics (SVG). Unlike pre-rendered 3D models or heavy video loops, SVG bots load in under 10KB, scale flawlessly to any screen resolution, and can be customized with CSS variables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#141414] border border-[#262626] rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <MousePointer className="w-4 h-4 text-neutral-400" />
                <span>Pupil Pointer Tracking</span>
              </div>
              <p className="text-neutral-400">
                Pupils dynamically follow your mouse pointer across the screen using normalized vector math:
                <code className="block mt-1 text-[11px] text-white bg-[#000000] p-1.5 rounded border border-[#222222]">
                  θ = atan2(Δy, Δx) · clamp(r, 0, R_max)
                </code>
                Natural eye saccades and randomized blink timers bring the character to life without CPU overhead.
              </p>
            </div>

            <div className="p-4 bg-[#141414] border border-[#262626] rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Code2 className="w-4 h-4 text-neutral-400" />
                <span>Zero-Dependency React Code</span>
              </div>
              <p className="text-neutral-400">
                Export directly to your React, Next.js, or Vite applications. The exported code uses pure React state and DOM event listeners — no Three.js, Canvas, or external gif libraries required.
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#222222]">
            <h4 className="font-semibold text-white">Interactive Studio Shortcuts</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
              <div className="p-2 bg-[#141414] rounded border border-[#262626] flex items-center justify-between">
                <span className="text-neutral-400">Emotions:</span>
                <span className="text-white font-bold">Keys 1 - 9</span>
              </div>
              <div className="p-2 bg-[#141414] rounded border border-[#262626] flex items-center justify-between">
                <span className="text-neutral-400">Squish Bot:</span>
                <span className="text-white font-bold">Click Canvas</span>
              </div>
              <div className="p-2 bg-[#141414] rounded border border-[#262626] flex items-center justify-between">
                <span className="text-neutral-400">Export:</span>
                <span className="text-white font-bold">Top Button</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#080808] border-t border-[#222222] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white text-black font-semibold text-xs rounded transition-colors hover:bg-neutral-200"
          >
            CONFIRM & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
