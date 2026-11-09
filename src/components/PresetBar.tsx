/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BotConfig, BlobShape } from '../types/bot.ts';
import { BOT_PRESETS } from '../constants/presets.ts';
import { GrotBotSvg } from './GrotBotSvg.tsx';
import { Dices, RotateCcw, Cpu } from 'lucide-react';

interface PresetBarProps {
  currentConfig: BotConfig;
  onSelectPreset: (preset: BotConfig) => void;
  onRandomize: () => void;
  onReset: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PresetBar: React.FC<PresetBarProps> = ({
  currentConfig,
  onSelectPreset,
  onRandomize,
  onReset,
  isOpen,
  onClose,
}) => {
  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-[#0a0a0a] border-r border-[#222222] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Top Header of Sidebar */}
      <div className="p-4 border-b border-[#222222] flex items-center justify-between shrink-0 bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-white" />
          <h2 className="text-xs font-mono font-semibold text-white tracking-wider uppercase">
            ARCHETYPE_CORE
          </h2>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 text-neutral-400 hover:text-white rounded font-mono"
        >
          [ESC]
        </button>
      </div>

      {/* Action Buttons: Randomize & Reset */}
      <div className="p-3 border-b border-[#222222] grid grid-cols-2 gap-2 shrink-0 bg-[#0a0a0a]">
        <button
          onClick={onRandomize}
          className="py-2 px-3 bg-[#181818] hover:bg-[#222222] text-white text-xs font-mono font-medium rounded border border-[#303030] transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
          title="Generate random bot archetype"
        >
          <Dices className="w-3.5 h-3.5" />
          <span>RANDOM</span>
        </button>

        <button
          onClick={onReset}
          className="py-2 px-3 bg-[#181818] hover:bg-[#222222] text-neutral-400 hover:text-white text-xs font-mono font-medium rounded border border-[#303030] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          title="Reset to default Flame Squircle"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>

      {/* Presets List in Pure Charcoal / Black Style */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {BOT_PRESETS.map((preset) => {
          const isSelected = currentConfig.id === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                if (window.innerWidth < 1024) onClose();
              }}
              className={`w-full p-2.5 rounded-lg border text-left transition-all flex items-center gap-3 group cursor-pointer ${
                isSelected
                  ? 'bg-[#222222] border-white text-white shadow-md'
                  : 'bg-[#141414] border-[#262626] text-neutral-300 hover:border-[#383838] hover:bg-[#1a1a1a]'
              }`}
            >
              {/* Mini SVG Preview */}
              <div className="w-12 h-12 rounded bg-[#000000] border border-[#2a2a2a] flex items-center justify-center shrink-0 overflow-hidden p-0.5">
                <GrotBotSvg config={preset} size={44} animateFloat={false} />
              </div>

              {/* Bot Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-neutral-200 group-hover:text-white transition-colors truncate">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0 animate-ping" />
                  )}
                </div>
                <p className="text-[10px] font-mono text-neutral-500 line-clamp-1 mt-0.5">
                  ANGLE: {preset.bodyRotation}° · {preset.shape}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#222222] text-[10px] font-mono text-neutral-500 shrink-0 flex items-center justify-between bg-[#0d0d0d]">
        <span>UNIT_DB // 8 PRESETS</span>
        <span className="text-neutral-400">ROT_INIT = 0°</span>
      </div>
    </aside>
  );
};

// Helper smart randomizer (default bodyRotation = 0)
export function generateRandomBot(): BotConfig {
  const shapes: BlobShape[] = [
    'squircle',
    'cloud',
    'hexagon',
    'teardrop',
    'starburst',
    'clover',
    'starfish',
    'tri_bread',
    'rocket',
    'heart',
    'star5',
    'apple',
    'pebble',
    'capsule',
  ];
  const expressions = ['normal', 'happy', 'wink', 'curious', 'shocked', 'sleepy', 'suspicious', 'hearts', 'dizzy'] as const;

  const palettes = [
    { hex: '#FF6417', eye: '#18181B' }, // Flame Orange
    { hex: '#00C978', eye: '#18181B' }, // Mint
    { hex: '#00BA6C', eye: '#18181B' }, // Green
    { hex: '#9E6534', eye: '#18181B' }, // Cocoa
    { hex: '#FF2A85', eye: '#18181B' }, // Berry Hot Pink
    { hex: '#1E88E5', eye: '#18181B' }, // Aqua
    { hex: '#F59E0B', eye: '#18181B' }, // Golden Amber
    { hex: '#8B5CF6', eye: '#18181B' }, // Cyber Violet
    { hex: '#FF6F59', eye: '#18181B' }, // Coral
    { hex: '#E11D48', eye: '#18181B' }, // Crimson
    { hex: '#EF4444', eye: '#18181B' }, // Apple Red
    { hex: '#141414', eye: '#FFFFFF' }, // Pure Onyx Black
  ];

  const names = [
    'BLIP-01', 'PUFF-02', 'HEX-03', 'DROP-04', 'SPLAT-05', 
    'CLOVER-06', 'STARFISH-07', 'ONIGIRI-08', 'ROCKET-09', 
    'HEART-10', 'STAR-11', 'APPLE-12', 'PEBBLE-13'
  ];
  const taglines = [
    'Procedural vector unit',
    'Tactile responsive bot matrix',
    'Slanted capsule optical module',
    'Minimalist interactive character',
  ];

  const pal = palettes[Math.floor(Math.random() * palettes.length)];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];

  return {
    id: `grot-${Date.now()}`,
    name: names[Math.floor(Math.random() * names.length)],
    tagline: taglines[Math.floor(Math.random() * taglines.length)],
    shape: shape,
    bodyColor: pal.hex,
    bodyRotation: 0,
    shadingStyle: 'flat',
    eyeColor: pal.eye,
    eyeSlant: Math.floor(20 + Math.random() * 10),
    eyeSpacing: Math.floor(32 + Math.random() * 8),
    eyeWidth: 12,
    eyeHeight: Math.floor(28 + Math.random() * 8),
    eyeRoundness: 6,
    eyeTrackingSensitivity: Number((0.9 + Math.random() * 0.4).toFixed(1)),
    expression: expressions[Math.floor(Math.random() * expressions.length)],
    squashFactor: 0.18,
    floatAmplitude: Math.floor(5 + Math.random() * 5),
    floatSpeed: Number((2.4 + Math.random() * 1.2).toFixed(1)),
    blinkCadence: Number((2.8 + Math.random() * 1.5).toFixed(1)),
  };
}
