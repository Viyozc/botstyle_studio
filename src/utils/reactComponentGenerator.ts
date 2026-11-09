/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BotConfig } from '../types/bot.ts';

export function generateReactComponentCode(config: BotConfig): string {
  const compName = (config.name || 'GrotBot')
    .replace(/[^a-zA-Z0-9]/g, '')
    .replace(/^[0-9]/, 'Bot$&');

  return `import React, { useState, useEffect, useRef } from 'react';

export interface ${compName}Props {
  size?: number | string;
  expression?: 'normal' | 'happy' | 'wink' | 'curious' | 'shocked' | 'sleepy' | 'suspicious' | 'hearts' | 'dizzy';
  interactive?: boolean;
  className?: string;
  bodyColor?: string;
  eyeColor?: string;
}

/**
 * ${config.name} — Grotbot & Charcoal UI Procedural SVG Mascot
 * Features real-time pointer gaze tracking, organic idle float, and micro-expressions.
 */
export const ${compName}: React.FC<${compName}Props> = ({
  size = 280,
  expression = '${config.expression}',
  interactive = true,
  className = '',
  bodyColor = '${config.bodyColor}',
  eyeColor = '${config.eyeColor}',
}) => {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pointer gaze tracking
  useEffect(() => {
    if (!interactive) return;

    const handlePointerMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      setGaze({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      });
    };

    window.addEventListener('mousemove', handlePointerMove);
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [interactive]);

  // Organic blink timer
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
      timeout = setTimeout(triggerBlink, 2800 + Math.random() * 2000);
    };
    timeout = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const eyeOffsetX = gaze.x * 16 * ${config.eyeTrackingSensitivity};
  const eyeOffsetY = gaze.y * 12 * ${config.eyeTrackingSensitivity};
  const bodyLean = ${config.bodyRotation} + gaze.x * 4;

  return (
    <div
      ref={containerRef}
      className={\`inline-flex items-center justify-center select-none cursor-pointer \${className}\`}
      style={{ width: size, height: size }}
    >
      <style>{\`
        @keyframes grotFloatCycle {
          0% { transform: translateY(-${config.floatAmplitude}px) rotate(\${bodyLean - 1.5}deg); }
          100% { transform: translateY(${config.floatAmplitude}px) rotate(\${bodyLean + 1.5}deg); }
        }
      \`}</style>
      <svg
        viewBox="0 0 320 320"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: 'grotFloatCycle ${config.floatSpeed}s ease-in-out infinite alternate' }}
      >
        <defs>
          <filter id="${compName}_shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Ambient Ground Shadow */}
        <ellipse cx="160" cy="284" rx="78" ry="12" fill="#000000" fillOpacity="0.3" />

        {/* Body Shape */}
        <g filter="url(#${compName}_shadow)">
          ${
            config.shape === 'squircle'
              ? `<rect x="90" y="90" width="140" height="140" rx="34" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'cloud'
              ? `<path d="M 115,115 C 95,115 76,132 76,155 C 66,172 70,192 84,204 C 96,218 116,222 136,221 C 152,225 178,225 196,215 C 216,220 236,208 244,188 C 252,172 248,150 238,138 C 238,118 220,102 198,105 C 182,95 158,95 142,104 C 130,98 120,105 115,115 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'hexagon'
              ? `<path d="M 125,88 L 195,88 C 204,88 212,93 216,101 L 246,153 C 251,161 251,171 246,179 L 216,231 C 212,239 204,244 195,244 L 125,244 C 116,244 108,239 104,231 L 74,179 C 69,171 69,161 74,153 L 104,101 C 108,93 116,88 125,88 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'teardrop'
              ? `<path d="M 154,82 C 142,94 92,142 92,182 C 92,222 122,246 160,246 C 198,246 228,222 228,182 C 228,142 178,94 166,82 C 162,78 158,78 154,82 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'starburst'
              ? `<path d="M 160,82 C 168,82 173,99 184,98 C 195,97 206,85 215,92 C 224,99 217,112 225,121 C 233,130 248,131 248,143 C 248,155 233,160 227,171 C 221,182 228,197 218,205 C 208,213 197,204 186,211 C 175,218 172,238 160,238 C 148,238 145,218 134,211 C 123,204 112,213 102,205 C 92,197 99,182 93,171 C 87,160 72,155 72,143 C 72,131 87,130 95,121 C 103,112 96,99 105,92 C 114,85 125,97 136,98 C 147,99 152,82 160,82 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'clover'
              ? `<g transform="rotate(${config.bodyRotation} 160 160)">
            <circle cx="128" cy="128" r="42" fill={bodyColor} />
            <circle cx="192" cy="132" r="42" fill={bodyColor} />
            <circle cx="132" cy="192" r="42" fill={bodyColor} />
            <circle cx="190" cy="190" r="42" fill={bodyColor} />
            <rect x="120" y="120" width="80" height="80" rx="20" fill={bodyColor} />
          </g>`
              : config.shape === 'starfish'
              ? `<path d="M 160,78 C 168,78 176,116 188,124 C 200,132 236,120 242,126 C 248,132 222,160 220,174 C 218,188 238,220 232,226 C 226,232 194,212 182,216 C 170,220 166,244 160,244 C 154,244 150,220 138,216 C 126,212 94,232 88,226 C 82,220 102,188 100,174 C 98,160 72,132 78,126 C 84,120 120,132 132,124 C 144,116 152,78 160,78 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'tri_bread'
              ? `<g transform="rotate(${config.bodyRotation} 160 160)">
            <path d="M 160,82 C 174,82 188,104 228,186 C 240,210 228,238 196,238 L 124,238 C 92,238 80,210 92,186 C 132,104 146,82 160,82 Z" fill={bodyColor} />
            <path d="M 146,96 Q 160,92 174,96" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
          </g>`
              : config.shape === 'rocket'
              ? `<g transform="rotate(${config.bodyRotation} 160 160)">
            <path d="M 108,184 C 84,186 68,216 66,242 C 86,244 104,234 108,222 Z" fill={bodyColor} opacity="0.9" />
            <path d="M 212,184 C 236,186 252,216 254,242 C 234,244 216,234 212,222 Z" fill={bodyColor} opacity="0.9" />
            <path d="M 160,72 C 178,72 214,124 214,204 C 214,232 202,242 186,242 L 134,242 C 118,242 106,232 106,204 C 106,124 142,72 160,72 Z" fill={bodyColor} />
          </g>`
              : config.shape === 'heart'
              ? `<path d="M 160,116 C 142,80 88,82 88,132 C 88,172 134,208 160,240 C 186,208 232,172 232,132 C 232,82 178,80 160,116 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'star5'
              ? `<path d="M 160,76 C 166,76 174,106 184,112 C 194,118 226,112 232,118 C 238,124 216,148 214,160 C 212,172 228,202 222,208 C 216,214 188,198 178,202 C 168,206 164,236 160,236 C 156,236 152,206 142,202 C 132,198 104,214 98,208 C 92,202 108,172 106,160 C 104,148 82,124 88,118 C 94,112 126,118 136,112 C 146,106 154,76 160,76 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : config.shape === 'apple'
              ? `<g transform="rotate(${config.bodyRotation} 160 160)">
            <path d="M 160,108 C 160,92 166,78 174,70" fill="none" stroke="#8B5A2B" strokeWidth="4" strokeLinecap="round" />
            <path d="M 170,82 C 186,74 192,84 184,94 Z" fill="#22C55E" />
            <path d="M 160,110 C 152,94 132,88 112,88 C 82,88 70,116 70,162 C 70,214 106,244 142,244 C 154,244 158,238 160,238 C 162,238 166,244 178,244 C 214,244 250,214 250,162 C 250,116 238,88 208,88 C 188,88 168,94 160,110 Z" fill={bodyColor} />
          </g>`
              : config.shape === 'capsule'
              ? `<rect x="100" y="80" width="120" height="160" rx="60" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
              : `<path d="M 120,95 C 170,82 225,105 235,145 C 245,185 215,235 165,242 C 115,249 78,215 75,175 C 72,135 90,103 120,95 Z" fill={bodyColor} transform="rotate(${config.bodyRotation} 160 160)" />`
          }
        </g>

        {/* Slanted Eyes with Pointer Follow */}
        <g
          transform={\`translate(\${eyeOffsetX}, \${eyeOffsetY})\`}
          style={{
            transform: isBlinking ? 'scale(1, 0.08)' : 'scale(1, 1)',
            transformOrigin: '160px 160px',
            transition: 'transform 0.12s ease-out',
          }}
        >
          {expression === 'happy' ? (
            <g fill="none" stroke={eyeColor} strokeWidth="${config.eyeWidth}" strokeLinecap="round">
              <path d="M 128,162 Q 142,148 156,162" />
              <path d="M 166,162 Q 180,148 194,162" />
            </g>
          ) : (
            <g fill={eyeColor}>
              <g transform={\`translate(\${160 - ${config.eyeSpacing} / 2}, 160) rotate(${config.eyeSlant})\`}>
                <rect x={-${config.eyeWidth} / 2} y={-${config.eyeHeight} / 2} width="${config.eyeWidth}" height="${config.eyeHeight}" rx="${config.eyeRoundness}" />
              </g>
              <g transform={\`translate(\${160 + ${config.eyeSpacing} / 2}, 160) rotate(${config.eyeSlant})\`}>
                <rect x={-${config.eyeWidth} / 2} y={-${config.eyeHeight} / 2} width="${config.eyeWidth}" height="${config.eyeHeight}" rx="${config.eyeRoundness}" />
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

export default ${compName};
`;
}
