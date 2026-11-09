/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BotConfig } from '../types/bot.ts';

interface GrotBotSvgProps {
  config: BotConfig;
  size?: number | string;
  gaze?: { x: number; y: number }; // normalized -1 to 1
  isBlinking?: boolean;
  className?: string;
  animateFloat?: boolean;
  actionState?: string;
}

export const GrotBotSvg: React.FC<GrotBotSvgProps> = ({
  config,
  size = 320,
  gaze = { x: 0, y: 0 },
  isBlinking = false,
  className = '',
  animateFloat = true,
  actionState,
}) => {
  const {
    shape,
    bodyColor,
    bodyRotation,
    shadingStyle,
    eyeColor,
    eyeSlant,
    eyeSpacing,
    eyeWidth,
    eyeHeight,
    eyeRoundness,
    eyeTrackingSensitivity,
    expression,
    floatAmplitude,
    floatSpeed,
    speechBubble,
  } = config;

  // Clamped gaze vectors based on sensitivity
  const gazeX = Math.max(-1, Math.min(1, gaze.x * eyeTrackingSensitivity));
  const gazeY = Math.max(-1, Math.min(1, gaze.y * eyeTrackingSensitivity));

  // Max eye travel in px across the body surface
  const maxTravelX = 18;
  const maxTravelY = 14;
  const eyeOffsetX = gazeX * maxTravelX;
  const eyeOffsetY = gazeY * maxTravelY;

  // Subtle interactive body lean towards mouse
  const bodyLeanAngle = bodyRotation + gazeX * 5;
  const bodyLeanY = gazeY * 3;

  const idPrefix = `grot_${config.id || 'current'}_`;

  // Float animation style
  const floatStyle = animateFloat && floatAmplitude > 0 ? {
    animation: `grotFloat ${floatSpeed}s ease-in-out infinite alternate`,
  } : {};

  // Action classes for jiggle, bounce, etc.
  const getActionClass = () => {
    switch (actionState || config.currentAction) {
      case 'jiggle':
        return 'animate-jiggle';
      case 'bounce':
        return 'animate-bounce-jump';
      case 'nod':
        return 'animate-nod';
      case 'shiver':
        return 'animate-shiver';
      case 'spin':
        return 'animate-spin-flip';
      default:
        return '';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Dynamic Keyframes for Float & Squish Physics */}
      <style>{`
        @keyframes grotFloat {
          0% { transform: translateY(-${floatAmplitude}px) rotate(${bodyLeanAngle - 1.5}deg); }
          100% { transform: translateY(${floatAmplitude}px) rotate(${bodyLeanAngle + 1.5}deg); }
        }
        @keyframes jiggleAnim {
          0%, 100% { transform: scale(1, 1); }
          25% { transform: scale(1.12, 0.88); }
          50% { transform: scale(0.92, 1.08); }
          75% { transform: scale(1.05, 0.95); }
        }
        @keyframes bounceAnim {
          0%, 100% { transform: translateY(0) scale(1, 1); }
          40% { transform: translateY(-34px) scale(0.92, 1.1); }
          60% { transform: translateY(0) scale(1.15, 0.85); }
          80% { transform: translateY(-8px) scale(0.98, 1.02); }
        }
        @keyframes nodAnim {
          0%, 100% { transform: rotate(${bodyLeanAngle}deg); }
          50% { transform: rotate(${bodyLeanAngle + 14}deg) translateY(6px); }
        }
        @keyframes shiverAnim {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-4px); }
          40% { transform: translateX(4px); }
          60% { transform: translateX(-3px); }
          80% { transform: translateX(3px); }
        }
        @keyframes spinFlipAnim {
          0% { transform: rotate(${bodyLeanAngle}deg) scale(1); }
          50% { transform: rotate(${bodyLeanAngle + 180}deg) scale(0.85); }
          100% { transform: rotate(${bodyLeanAngle + 360}deg) scale(1); }
        }
        .animate-jiggle { animation: jiggleAnim 0.5s ease-out; }
        .animate-bounce-jump { animation: bounceAnim 0.7s cubic-bezier(0.18, 0.89, 0.32, 1.28); }
        .animate-nod { animation: nodAnim 0.45s ease-in-out; }
        .animate-shiver { animation: shiverAnim 0.35s linear; }
        .animate-spin-flip { animation: spinFlipAnim 0.65s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>

      {/* Floating Speech Bubble */}
      {speechBubble && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3.5 py-1.5 bg-slate-900/95 text-slate-100 text-xs font-mono rounded-xl border border-slate-700/80 shadow-2xl whitespace-nowrap z-20 pointer-events-none flex items-center gap-2 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{speechBubble}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700/80 rotate-45" />
        </div>
      )}

      <svg
        viewBox="0 0 320 320"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className={`overflow-visible ${getActionClass()}`}
        style={floatStyle}
      >
        <defs>
          {/* Subtle Ambient Body Drop Shadow */}
          <filter id={`${idPrefix}shadow`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.32" />
          </filter>

          {/* Soft Highlight Gradient */}
          <linearGradient id={`${idPrefix}softGrad`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>

          {/* Inner Glow / 3D Bevel Filter */}
          <linearGradient id={`${idPrefix}innerBevel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse
          cx="160"
          cy="284"
          rx={78 + gazeY * 4}
          ry="12"
          fill="#000000"
          fillOpacity="0.3"
        />

        {/* --- MAIN GROTBOT BODY SILHOUETTES --- */}
        <g
          id="body-mesh"
          transform={`translate(0, ${bodyLeanY})`}
          filter={`url(#${idPrefix}shadow)`}
        >
          {/* 1. TILTED SQUIRCLE (Orange Cuboid from ref) */}
          {shape === 'squircle' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <rect
                x="90"
                y="90"
                width="140"
                height="140"
                rx="34"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <rect
                  x="90"
                  y="90"
                  width="140"
                  height="140"
                  rx="34"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 2. MINT CLOUD PUFF (Green Cloud from ref) */}
          {shape === 'cloud' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 115,115 
                   C 95,115 76,132 76,155 
                   C 66,172 70,192 84,204 
                   C 96,218 116,222 136,221 
                   C 152,225 178,225 196,215 
                   C 216,220 236,208 244,188 
                   C 252,172 248,150 238,138 
                   C 238,118 220,102 198,105 
                   C 182,95 158,95 142,104 
                   C 130,98 120,105 115,115 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 115,115 C 95,115 76,132 76,155 C 66,172 70,192 84,204 C 96,218 116,222 136,221 C 152,225 178,225 196,215 C 216,220 236,208 244,188 C 252,172 248,150 238,138 C 238,118 220,102 198,105 C 182,95 158,95 142,104 C 130,98 120,105 115,115 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 3. PRISM HEXAGON (Tilted Green Hex from ref) */}
          {shape === 'hexagon' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 125,88 
                   L 195,88 
                   C 204,88 212,93 216,101 
                   L 246,153 
                   C 251,161 251,171 246,179 
                   L 216,231 
                   C 212,239 204,244 195,244 
                   L 125,244 
                   C 116,244 108,239 104,231 
                   L 74,179 
                   C 69,171 69,161 74,153 
                   L 104,101 
                   C 108,93 116,88 125,88 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 125,88 L 195,88 C 204,88 212,93 216,101 L 246,153 C 251,161 251,171 246,179 L 216,231 C 212,239 204,244 195,244 L 125,244 C 116,244 108,239 104,231 L 74,179 C 69,171 69,161 74,153 L 104,101 C 108,93 116,88 125,88 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 4. COCOA DROP (Brown Teardrop from ref) */}
          {shape === 'teardrop' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 154,82 
                   C 142,94 92,142 92,182 
                   C 92,222 122,246 160,246 
                   C 198,246 228,222 228,182 
                   C 228,142 178,94 166,82 
                   C 162,78 158,78 154,82 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 154,82 C 142,94 92,142 92,182 C 92,222 122,246 160,246 C 198,246 228,222 228,182 C 228,142 178,94 166,82 C 162,78 158,78 154,82 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 5. BERRY STARBURST (Pink Splat from ref) */}
          {shape === 'starburst' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 160,82 
                   C 168,82 173,99 184,98 
                   C 195,97 206,85 215,92 
                   C 224,99 217,112 225,121 
                   C 233,130 248,131 248,143 
                   C 248,155 233,160 227,171 
                   C 221,182 228,197 218,205 
                   C 208,213 197,204 186,211 
                   C 175,218 172,238 160,238 
                   C 148,238 145,218 134,211 
                   C 123,204 112,213 102,205 
                   C 92,197 99,182 93,171 
                   C 87,160 72,155 72,143 
                   C 72,131 87,130 95,121 
                   C 103,112 96,99 105,92 
                   C 114,85 125,97 136,98 
                   C 147,99 152,82 160,82 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,82 C 168,82 173,99 184,98 C 195,97 206,85 215,92 C 224,99 217,112 225,121 C 233,130 248,131 248,143 C 248,155 233,160 227,171 C 221,182 228,197 218,205 C 208,213 197,204 186,211 C 175,218 172,238 160,238 C 148,238 145,218 134,211 C 123,204 112,213 102,205 C 92,197 99,182 93,171 C 87,160 72,155 72,143 C 72,131 87,130 95,121 C 103,112 96,99 105,92 C 114,85 125,97 136,98 C 147,99 152,82 160,82 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 6. AQUA CLOVER (Blue 4-Bubble Cluster from ref) */}
          {shape === 'clover' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              {/* 4 overlapping smooth bubble lobes */}
              <path
                d="M 160,110 
                   C 138,82 92,98 94,136 
                   C 66,158 82,204 120,202 
                   C 142,230 188,214 186,176 
                   C 214,154 198,108 160,110 Z"
                fill={bodyColor}
              />
              <circle cx="128" cy="128" r="42" fill={bodyColor} />
              <circle cx="192" cy="132" r="42" fill={bodyColor} />
              <circle cx="132" cy="192" r="42" fill={bodyColor} />
              <circle cx="190" cy="190" r="42" fill={bodyColor} />
              <rect x="120" y="120" width="80" height="80" rx="20" fill={bodyColor} />
              {shadingStyle !== 'flat' && (
                <circle cx="160" cy="160" r="76" fill={`url(#${idPrefix}softGrad)`} pointerEvents="none" />
              )}
            </g>
          )}

          {/* 7. PEBBLE */}
          {shape === 'pebble' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 120,95 
                   C 170,82 225,105 235,145 
                   C 245,185 215,235 165,242 
                   C 115,249 78,215 75,175 
                   C 72,135 90,103 120,95 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 120,95 C 170,82 225,105 235,145 C 245,185 215,235 165,242 C 115,249 78,215 75,175 C 72,135 90,103 120,95 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 8. CAPSULE */}
          {shape === 'capsule' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <rect
                x="100"
                y="80"
                width="120"
                height="160"
                rx="60"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <rect
                  x="100"
                  y="80"
                  width="120"
                  height="160"
                  rx="60"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 9. STARFISH (Chubby 5-Arm Starfish) */}
          {shape === 'starfish' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 160,78 
                   C 168,78 176,116 188,124 
                   C 200,132 236,120 242,126 
                   C 248,132 222,160 220,174 
                   C 218,188 238,220 232,226 
                   C 226,232 194,212 182,216 
                   C 170,220 166,244 160,244 
                   C 154,244 150,220 138,216 
                   C 126,212 94,232 88,226 
                   C 82,220 102,188 100,174 
                   C 98,160 72,132 78,126 
                   C 84,120 120,132 132,124 
                   C 144,116 152,78 160,78 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,78 C 168,78 176,116 188,124 C 200,132 236,120 242,126 C 248,132 222,160 220,174 C 218,188 238,220 232,226 C 226,232 194,212 182,216 C 170,220 166,244 160,244 C 154,244 150,220 138,216 C 126,212 94,232 88,226 C 82,220 102,188 100,174 C 98,160 72,132 78,126 C 84,120 120,132 132,124 C 144,116 152,78 160,78 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 10. TRI_BREAD (Rounded Triangle Loaf / Onigiri) */}
          {shape === 'tri_bread' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 160,82 
                   C 174,82 188,104 228,186 
                   C 240,210 228,238 196,238 
                   L 124,238 
                   C 92,238 80,210 92,186 
                   C 132,104 146,82 160,82 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,82 C 174,82 188,104 228,186 C 240,210 228,238 196,238 L 124,238 C 92,238 80,210 92,186 C 132,104 146,82 160,82 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
              <path d="M 146,96 Q 160,92 174,96" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
            </g>
          )}

          {/* 11. ROCKET (Nose Cone & Stabilizer Fins) */}
          {shape === 'rocket' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path d="M 108,184 C 84,186 68,216 66,242 C 86,244 104,234 108,222 Z" fill={bodyColor} opacity="0.9" />
              <path d="M 212,184 C 236,186 252,216 254,242 C 234,244 216,234 212,222 Z" fill={bodyColor} opacity="0.9" />
              <path
                d="M 160,72 
                   C 178,72 214,124 214,204 
                   C 214,232 202,242 186,242 
                   L 134,242 
                   C 118,242 106,232 106,204 
                   C 106,124 142,72 160,72 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,72 C 178,72 214,124 214,204 C 214,232 202,242 186,242 L 134,242 C 118,242 106,232 106,204 C 106,124 142,72 160,72 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 12. HEART (Chubby Vector Heart) */}
          {shape === 'heart' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 160,116 
                   C 142,80 88,82 88,132 
                   C 88,172 134,208 160,240 
                   C 186,208 232,172 232,132 
                   C 232,82 178,80 160,116 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,116 C 142,80 88,82 88,132 C 88,172 134,208 160,240 C 186,208 232,172 232,132 C 232,82 178,80 160,116 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 13. STAR5 (Chubby 5-Pointed Star) */}
          {shape === 'star5' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              <path
                d="M 160,76 
                   C 166,76 174,106 184,112 
                   C 194,118 226,112 232,118 
                   C 238,124 216,148 214,160 
                   C 212,172 228,202 222,208 
                   C 216,214 188,198 178,202 
                   C 168,206 164,236 160,236 
                   C 156,236 152,206 142,202 
                   C 132,198 104,214 98,208 
                   C 92,202 108,172 106,160 
                   C 104,148 82,124 88,118 
                   C 94,112 126,118 136,112 
                   C 146,106 154,76 160,76 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,76 C 166,76 174,106 184,112 C 194,118 226,112 232,118 C 238,124 216,148 214,160 C 212,172 228,202 222,208 C 216,214 188,198 178,202 C 168,206 164,236 160,236 C 156,236 152,206 142,202 C 132,198 104,214 98,208 C 92,202 108,172 106,160 C 104,148 82,124 88,118 C 94,112 126,118 136,112 C 146,106 154,76 160,76 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}

          {/* 14. APPLE (Chubby Apple with Stem & Leaf) */}
          {shape === 'apple' && (
            <g transform={`rotate(${bodyRotation} 160 160)`}>
              {/* Apple Stem & Leaf */}
              <path d="M 160,108 C 160,92 166,78 174,70" fill="none" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />
              <path d="M 170,82 C 186,74 192,84 184,94 Z" fill="#22C55E" />
              {/* Apple Body */}
              <path
                d="M 160,110 
                   C 152,94 132,88 112,88 
                   C 82,88 70,116 70,162 
                   C 70,214 106,244 142,244 
                   C 154,244 158,238 160,238 
                   C 162,238 166,244 178,244 
                   C 214,244 250,214 250,162 
                   C 250,116 238,88 208,88 
                   C 188,88 168,94 160,110 Z"
                fill={bodyColor}
              />
              {shadingStyle !== 'flat' && (
                <path
                  d="M 160,110 C 152,94 132,88 112,88 C 82,88 70,116 70,162 C 70,214 106,244 142,244 C 154,244 158,238 160,238 C 162,238 166,244 178,244 C 214,244 250,214 250,162 C 250,116 238,88 208,88 C 188,88 168,94 160,110 Z"
                  fill={`url(#${idPrefix}softGrad)`}
                  pointerEvents="none"
                />
              )}
            </g>
          )}
        </g>

        {/* --- SIGNATURE SLANTED CAPSULE EYES & MICRO-EXPRESSIONS --- */}
        <g
          id="eyes-rig"
          transform={`translate(${eyeOffsetX}, ${eyeOffsetY + bodyLeanY})`}
        >
          {/* Eyes Group with blink scale animation */}
          <g
            style={{
              transform: isBlinking ? 'scale(1, 0.08)' : 'scale(1, 1)',
              transformOrigin: '160px 160px',
              transition: 'transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* 1. NORMAL: PARALLEL SLANTED SLITS // (Exact signature style) */}
            {expression === 'normal' && (
              <g>
                {/* Left Eye */}
                <g transform={`translate(${160 - eyeSpacing / 2}, 160) rotate(${eyeSlant})`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth}
                    height={eyeHeight}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
                {/* Right Eye */}
                <g transform={`translate(${160 + eyeSpacing / 2}, 160) rotate(${eyeSlant})`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth}
                    height={eyeHeight}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
              </g>
            )}

            {/* 2. HAPPY: ARCHED UPTURNED CURVES ^^ */}
            {expression === 'happy' && (
              <g>
                {/* Left Arched Eye */}
                <g transform={`translate(${160 - eyeSpacing / 2}, 158)`}>
                  <path
                    d={`M ${-eyeHeight / 2.2},${eyeWidth / 1.5} Q 0,${-eyeHeight / 2.2} ${eyeHeight / 2.2},${eyeWidth / 1.5}`}
                    fill="none"
                    stroke={eyeColor}
                    strokeWidth={eyeWidth}
                    strokeLinecap="round"
                  />
                </g>
                {/* Right Arched Eye */}
                <g transform={`translate(${160 + eyeSpacing / 2}, 158)`}>
                  <path
                    d={`M ${-eyeHeight / 2.2},${eyeWidth / 1.5} Q 0,${-eyeHeight / 2.2} ${eyeHeight / 2.2},${eyeWidth / 1.5}`}
                    fill="none"
                    stroke={eyeColor}
                    strokeWidth={eyeWidth}
                    strokeLinecap="round"
                  />
                </g>
              </g>
            )}

            {/* 3. WINK: ONE ARCHED WINK, ONE SLANTED SLIT ^/ */}
            {expression === 'wink' && (
              <g>
                {/* Left Winking Eye ^ */}
                <g transform={`translate(${160 - eyeSpacing / 2}, 158)`}>
                  <path
                    d={`M ${-eyeHeight / 2.2},${eyeWidth / 1.5} Q 0,${-eyeHeight / 2.2} ${eyeHeight / 2.2},${eyeWidth / 1.5}`}
                    fill="none"
                    stroke={eyeColor}
                    strokeWidth={eyeWidth}
                    strokeLinecap="round"
                  />
                </g>
                {/* Right Classic Slit / */}
                <g transform={`translate(${160 + eyeSpacing / 2}, 160) rotate(${eyeSlant})`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth}
                    height={eyeHeight}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
              </g>
            )}

            {/* 4. CURIOUS: ASYMMETRICAL TILT & RAISED OPTIC /' */}
            {expression === 'curious' && (
              <g>
                {/* Left Eye - slightly larger & tilted */}
                <g transform={`translate(${160 - eyeSpacing / 2}, 162) rotate(${eyeSlant - 6})`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth * 1.15}
                    height={eyeHeight * 1.1}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
                {/* Right Eye - raised higher */}
                <g transform={`translate(${160 + eyeSpacing / 2}, 152) rotate(${eyeSlant + 10})`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth * 0.9}
                    height={eyeHeight * 0.9}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
              </g>
            )}

            {/* 5. SHOCKED: DILATED ROUNDED CAPSULES OO */}
            {expression === 'shocked' && (
              <g>
                {/* Left Eye - Wide */}
                <g transform={`translate(${160 - eyeSpacing / 2}, 160) rotate(${eyeSlant * 0.3})`}>
                  <rect
                    x={-eyeWidth * 1.0}
                    y={-eyeHeight * 0.65}
                    width={eyeWidth * 2.0}
                    height={eyeHeight * 1.3}
                    rx={eyeWidth}
                    fill={eyeColor}
                  />
                  <circle cx="3" cy="-4" r="3" fill="#ffffff" opacity="0.9" />
                </g>
                {/* Right Eye - Wide */}
                <g transform={`translate(${160 + eyeSpacing / 2}, 160) rotate(${eyeSlant * 0.3})`}>
                  <rect
                    x={-eyeWidth * 1.0}
                    y={-eyeHeight * 0.65}
                    width={eyeWidth * 2.0}
                    height={eyeHeight * 1.3}
                    rx={eyeWidth}
                    fill={eyeColor}
                  />
                  <circle cx="3" cy="-4" r="3" fill="#ffffff" opacity="0.9" />
                </g>
              </g>
            )}

            {/* 6. SLEEPY: DROOPING HORIZONTAL SLITS -- */}
            {expression === 'sleepy' && (
              <g>
                {/* Left Drooping Slit */}
                <g transform={`translate(${160 - eyeSpacing / 2}, 166) rotate(6)`}>
                  <rect
                    x={-eyeHeight / 2.2}
                    y={-eyeWidth / 3}
                    width={eyeHeight}
                    height={eyeWidth * 0.8}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
                {/* Right Drooping Slit */}
                <g transform={`translate(${160 + eyeSpacing / 2}, 166) rotate(6)`}>
                  <rect
                    x={-eyeHeight / 2.2}
                    y={-eyeWidth / 3}
                    width={eyeHeight}
                    height={eyeWidth * 0.8}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
              </g>
            )}

            {/* 7. SUSPICIOUS: FLAT NARROW SLITS */}
            {expression === 'suspicious' && (
              <g>
                <g transform={`translate(${160 - eyeSpacing / 2}, 160) rotate(2)`}>
                  <rect
                    x={-eyeHeight / 2.5}
                    y={-eyeWidth / 4}
                    width={eyeHeight * 0.9}
                    height={eyeWidth * 0.65}
                    rx={3}
                    fill={eyeColor}
                  />
                </g>
                <g transform={`translate(${160 + eyeSpacing / 2}, 160) rotate(2)`}>
                  <rect
                    x={-eyeHeight / 2.5}
                    y={-eyeWidth / 4}
                    width={eyeHeight * 0.9}
                    height={eyeWidth * 0.65}
                    rx={3}
                    fill={eyeColor}
                  />
                </g>
              </g>
            )}

            {/* 8. HEARTS: SWEET HEART EYES ♥♥ */}
            {expression === 'hearts' && (
              <g fill="#FF2D85">
                <g transform={`translate(${160 - eyeSpacing / 2}, 158) scale(1.1)`}>
                  <path d="M 0,4 C -6,-6 -14,2 -6,10 L 0,16 L 6,10 C 14,2 6,-6 0,4 Z" />
                </g>
                <g transform={`translate(${160 + eyeSpacing / 2}, 158) scale(1.1)`}>
                  <path d="M 0,4 C -6,-6 -14,2 -6,10 L 0,16 L 6,10 C 14,2 6,-6 0,4 Z" />
                </g>
              </g>
            )}

            {/* 9. DIZZY: CROSS-SLANTED / \\ */}
            {expression === 'dizzy' && (
              <g>
                <g transform={`translate(${160 - eyeSpacing / 2}, 160) rotate(-28)`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth}
                    height={eyeHeight}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
                <g transform={`translate(${160 + eyeSpacing / 2}, 160) rotate(28)`}>
                  <rect
                    x={-eyeWidth / 2}
                    y={-eyeHeight / 2}
                    width={eyeWidth}
                    height={eyeHeight}
                    rx={eyeRoundness}
                    fill={eyeColor}
                  />
                </g>
              </g>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
};
