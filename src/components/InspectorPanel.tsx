/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  BotConfig, 
  BlobShape, 
  MicroExpression 
} from '../types/bot.ts';
import { 
  Shapes, 
  Palette, 
  Sliders, 
  Eye, 
  RotateCw,
  Check,
  RotateCcw
} from 'lucide-react';

interface InspectorPanelProps {
  config: BotConfig;
  onUpdateConfig: (partial: Partial<BotConfig>) => void;
}

export const InspectorPanel: React.FC<InspectorPanelProps> = ({ config, onUpdateConfig }) => {
  const [activeTab, setActiveTab] = useState<'shape' | 'eyes' | 'colors' | 'physics'>('shape');

  // Shapes matching the reference image + new requested types
  const shapes: { id: BlobShape; label: string; badge: string }[] = [
    { id: 'squircle', label: 'Tilted Squircle', badge: 'Orange' },
    { id: 'cloud', label: 'Puffy Cloud (云朵)', badge: 'Mint' },
    { id: 'hexagon', label: 'Prism Hexagon', badge: 'Green' },
    { id: 'teardrop', label: 'Organic Teardrop', badge: 'Brown' },
    { id: 'starburst', label: 'Berry Splat', badge: 'Pink' },
    { id: 'clover', label: '4-Bubble Clover', badge: 'Blue' },
    { id: 'starfish', label: 'Starfish (海星)', badge: 'Coral' },
    { id: 'tri_bread', label: 'Tri Bread (三角面包)', badge: 'Gold' },
    { id: 'rocket', label: 'Rocket (火箭头)', badge: 'Crimson' },
    { id: 'heart', label: 'Chubby Heart (心形)', badge: 'Rose' },
    { id: 'star5', label: 'Star (五角星)', badge: 'Amber' },
    { id: 'apple', label: 'Apple (苹果)', badge: 'Red' },
    { id: 'pebble', label: 'Smooth Pebble', badge: 'Dark' },
    { id: 'capsule', label: 'Rounded Jelly', badge: 'Amber' },
  ];

  // Authentic Color Presets from the reference image (strictly neutral blacks & vibrant solids, no navy/dark blues)
  const referencePalette = [
    { name: 'Flame Orange', hex: '#FF6417', eye: '#18181B' },
    { name: 'Mint Cloud', hex: '#00C978', eye: '#18181B' },
    { name: 'Prism Green', hex: '#00BA6C', eye: '#18181B' },
    { name: 'Cocoa Brown', hex: '#9E6534', eye: '#18181B' },
    { name: 'Berry Splat', hex: '#FF2A85', eye: '#18181B' },
    { name: 'Aqua Blue', hex: '#1E88E5', eye: '#18181B' },
    { name: 'Golden Amber', hex: '#F59E0B', eye: '#18181B' },
    { name: 'Cyber Violet', hex: '#8B5CF6', eye: '#18181B' },
    { name: 'Coral Red', hex: '#FF6F59', eye: '#18181B' },
    { name: 'Pure Onyx', hex: '#141414', eye: '#FFFFFF' },
  ];

  // Micro-Expressions
  const microExpressions: { id: MicroExpression; label: string; glyph: string }[] = [
    { id: 'normal', label: 'Classic Slits', glyph: '//' },
    { id: 'happy', label: 'Happy Arcs', glyph: '^^' },
    { id: 'wink', label: 'Playful Wink', glyph: '^/' },
    { id: 'curious', label: 'Curious Tilt', glyph: "/'" },
    { id: 'shocked', label: 'Shocked Ovals', glyph: 'OO' },
    { id: 'sleepy', label: 'Sleepy Slits', glyph: '--' },
    { id: 'suspicious', label: 'Narrowed Squint', glyph: '=_=' },
    { id: 'hearts', label: 'Loving Hearts', glyph: '♥♥' },
    { id: 'dizzy', label: 'Cross Slanted', glyph: '/\\' },
  ];

  return (
    <div className="w-full lg:w-96 bg-[#0a0a0a] border-l border-[#222222] flex flex-col h-full shrink-0 select-none overflow-hidden font-mono">
      {/* Tab Header with Pure Neutral Monochrome styling */}
      <div className="flex items-center border-b border-[#222222] bg-[#0d0d0d] p-1.5 gap-1 shrink-0">
        <button
          onClick={() => setActiveTab('shape')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'shape'
              ? 'bg-[#222222] text-white border border-neutral-600 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Shapes className="w-3.5 h-3.5" />
          <span>SHAPE</span>
        </button>

        <button
          onClick={() => setActiveTab('eyes')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'eyes'
              ? 'bg-[#222222] text-white border border-neutral-600 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>OPTICS</span>
        </button>

        <button
          onClick={() => setActiveTab('colors')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'colors'
              ? 'bg-[#222222] text-white border border-neutral-600 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>COLOR</span>
        </button>

        <button
          onClick={() => setActiveTab('physics')}
          className={`flex-1 py-2 px-2 text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'physics'
              ? 'bg-[#222222] text-white border border-neutral-600 shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>RIG</span>
        </button>
      </div>

      {/* Tab Body Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-neutral-300">
        {/* ================= 1. SHAPE & SILHOUETTE TAB ================= */}
        {activeTab === 'shape' && (
          <div className="space-y-4">
            {/* Archetype Selector */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-white mb-2">
                <span className="flex items-center gap-1.5">
                  <Shapes className="w-3.5 h-3.5 text-neutral-400" />
                  <span>GEOMETRY_TYPE</span>
                </span>
                <span className="text-[10px] text-neutral-500 uppercase">{config.shape}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onUpdateConfig({ shape: s.id })}
                    className={`p-2 rounded border text-left transition-colors flex items-center justify-between ${
                      config.shape === s.id
                        ? 'bg-[#222222] border-white text-white'
                        : 'bg-[#141414] border-[#262626] text-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-medium block">{s.label}</span>
                      <span className="text-[9px] text-neutral-500">{s.badge} Archetype</span>
                    </div>
                    {config.shape === s.id && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Tilt Angle (Default 0° as requested) */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white flex items-center gap-1.5">
                  <RotateCw className="w-3.5 h-3.5 text-neutral-400" />
                  <span>BODY_ROTATION_ANGLE</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white tabular-nums font-bold">{config.bodyRotation}°</span>
                  {config.bodyRotation !== 0 && (
                    <button
                      onClick={() => onUpdateConfig({ bodyRotation: 0 })}
                      className="px-1.5 py-0.5 text-[9px] bg-[#222222] hover:bg-[#303030] text-white rounded border border-[#383838] flex items-center gap-1"
                      title="Reset angle to 0°"
                    >
                      <RotateCcw className="w-2.5 h-2.5" />
                      <span>0°</span>
                    </button>
                  )}
                </div>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={config.bodyRotation}
                onChange={(e) => onUpdateConfig({ bodyRotation: parseInt(e.target.value) })}
                className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
              />
              <span className="text-[10px] text-neutral-500 block">Default is 0° (upright stance). Slider allows custom tilt.</span>
            </div>

            {/* Surface Shading */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <span className="text-xs font-medium text-white block">SURFACE_FINISH</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['flat', 'subtle_bevel', 'soft_gradient'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => onUpdateConfig({ shadingStyle: mode })}
                    className={`py-1.5 px-2 text-[11px] rounded border text-center capitalize ${
                      config.shadingStyle === mode
                        ? 'bg-[#222222] border-white text-white'
                        : 'bg-[#181818] border-[#2e2e2e] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {mode.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. EYES & SLANTED SLITS TAB ================= */}
        {activeTab === 'eyes' && (
          <div className="space-y-4">
            <div className="p-2.5 bg-[#141414] border border-[#2e2e2e] rounded text-[11px] text-neutral-300">
              DUAL_CAPSULE_OPTICS // Parallel slanted pill tracking array
            </div>

            {/* Slit Slant Angle */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">SLIT_SLANT_ANGLE</span>
                <span className="text-white tabular-nums font-bold">{config.eyeSlant}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                step="1"
                value={config.eyeSlant}
                onChange={(e) => onUpdateConfig({ eyeSlant: parseInt(e.target.value) })}
                className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
              />
              <span className="text-[10px] text-neutral-500 block">Angle of parallel capsule slits (default 24°)</span>
            </div>

            {/* Eye Spacing */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">INTER_PUPIL_DISTANCE</span>
                <span className="text-white tabular-nums font-bold">{config.eyeSpacing}px</span>
              </div>
              <input
                type="range"
                min="24"
                max="54"
                step="2"
                value={config.eyeSpacing}
                onChange={(e) => onUpdateConfig({ eyeSpacing: parseInt(e.target.value) })}
                className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
              />
            </div>

            {/* Eye Dimensions */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">THICKNESS</span>
                  <span className="text-white tabular-nums font-bold">{config.eyeWidth}px</span>
                </div>
                <input
                  type="range"
                  min="6"
                  max="18"
                  step="1"
                  value={config.eyeWidth}
                  onChange={(e) => onUpdateConfig({ eyeWidth: parseInt(e.target.value) })}
                  className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white">LENGTH</span>
                  <span className="text-white tabular-nums font-bold">{config.eyeHeight}px</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="46"
                  step="2"
                  value={config.eyeHeight}
                  onChange={(e) => onUpdateConfig({ eyeHeight: parseInt(e.target.value) })}
                  className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Eye Color */}
            <div className="flex items-center justify-between p-3 bg-[#141414] rounded border border-[#262626]">
              <div>
                <span className="text-xs font-medium text-white block">OPTIC_PILL_HEX</span>
                <span className="text-[10px] text-neutral-500 uppercase">{config.eyeColor}</span>
              </div>
              <input
                type="color"
                value={config.eyeColor}
                onChange={(e) => onUpdateConfig({ eyeColor: e.target.value })}
                className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
              />
            </div>
          </div>
        )}

        {/* ================= 3. COLOR PALETTES TAB ================= */}
        {activeTab === 'colors' && (
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-white block mb-2">PALETTE_PRESETS</span>
              <div className="grid grid-cols-2 gap-2">
                {referencePalette.map((item) => (
                  <button
                    key={item.name}
                    onClick={() =>
                      onUpdateConfig({
                        bodyColor: item.hex,
                        eyeColor: item.eye,
                      })
                    }
                    className="p-2 bg-[#141414] border border-[#262626] hover:border-neutral-500 rounded text-left transition-colors group flex items-center gap-2"
                  >
                    <span
                      className="w-5 h-5 rounded border border-black/40 shrink-0"
                      style={{ backgroundColor: item.hex }}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-neutral-200 group-hover:text-white truncate block">
                        {item.name}
                      </span>
                      <span className="text-[9px] text-neutral-500 uppercase">
                        {item.hex}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color */}
            <div className="pt-2 border-t border-[#222222] space-y-2">
              <span className="text-xs font-semibold text-white block">CUSTOM_HEX_SPEC</span>
              <div className="flex items-center justify-between p-3 bg-[#141414] rounded border border-[#262626]">
                <div>
                  <span className="text-xs font-medium text-white block">BODY_FILL_COLOR</span>
                  <span className="text-[10px] text-neutral-500 uppercase">{config.bodyColor}</span>
                </div>
                <input
                  type="color"
                  value={config.bodyColor}
                  onChange={(e) => onUpdateConfig({ bodyColor: e.target.value })}
                  className="w-8 h-8 rounded cursor-pointer bg-transparent border-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. DYNAMICS & PHYSICS TAB ================= */}
        {activeTab === 'physics' && (
          <div className="space-y-4">
            {/* Quick Micro-Expressions Pad */}
            <div>
              <span className="text-xs font-semibold text-white block mb-2">MICRO_EXPRESSIONS</span>
              <div className="grid grid-cols-3 gap-1.5">
                {microExpressions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onUpdateConfig({ expression: m.id })}
                    className={`py-2 px-1.5 rounded border text-center transition-colors ${
                      config.expression === m.id
                        ? 'bg-[#222222] border-white text-white font-bold'
                        : 'bg-[#141414] border-[#262626] text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xs block font-bold text-white">{m.glyph}</span>
                    <span className="text-[9px] block mt-0.5">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Pointer Gaze Sensitivity */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">POINTER_SENSITIVITY</span>
                <span className="text-white tabular-nums font-bold">{config.eyeTrackingSensitivity.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.0"
                step="0.1"
                value={config.eyeTrackingSensitivity}
                onChange={(e) => onUpdateConfig({ eyeTrackingSensitivity: parseFloat(e.target.value) })}
                className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
              />
            </div>

            {/* Float Amplitude */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">HOVER_FLOAT_AMP</span>
                <span className="text-white tabular-nums font-bold">{config.floatAmplitude}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="14"
                step="1"
                value={config.floatAmplitude}
                onChange={(e) => onUpdateConfig({ floatAmplitude: parseInt(e.target.value) })}
                className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
              />
            </div>

            {/* Float Speed */}
            <div className="p-3 bg-[#141414] rounded border border-[#262626] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-white">CYCLE_DURATION</span>
                <span className="text-white tabular-nums font-bold">{config.floatSpeed.toFixed(1)}s</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="5.0"
                step="0.2"
                value={config.floatSpeed}
                onChange={(e) => onUpdateConfig({ floatSpeed: parseFloat(e.target.value) })}
                className="w-full accent-white h-1.5 bg-[#262626] rounded cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
