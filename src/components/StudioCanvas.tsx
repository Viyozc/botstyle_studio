/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { BotConfig, MicroExpression } from '../types/bot.ts';
import { GrotBotSvg } from './GrotBotSvg.tsx';
import { 
  Smile, 
  HelpCircle, 
  AlertCircle, 
  Moon, 
  CircleDot, 
  Grid3X3, 
  Maximize2,
  ZoomIn,
  ZoomOut,
  Send,
  MessageSquare,
  Heart,
  Eye,
  Activity,
  Zap,
  Crosshair
} from 'lucide-react';

interface StudioCanvasProps {
  config: BotConfig;
  onUpdateConfig: (partial: Partial<BotConfig>) => void;
}

export const StudioCanvas: React.FC<StudioCanvasProps> = ({ config, onUpdateConfig }) => {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [background, setBackground] = useState<'tech_grid' | 'hud_radar' | 'dot_matrix' | 'oled_black'>('tech_grid');
  const [zoom, setZoom] = useState(1.0);
  const [sayInput, setSayInput] = useState('');
  const [currentAction, setCurrentAction] = useState<string | undefined>(undefined);
  
  const stageRef = useRef<HTMLDivElement>(null);

  // Mouse pupil tracking calculation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stageRef.current) return;
      const rect = stageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const maxDistance = Math.min(rect.width, rect.height) * 0.75;
      const dx = (e.clientX - centerX) / (maxDistance || 300);
      const dy = (e.clientY - centerY) / (maxDistance || 300);
      
      setGaze({
        x: Math.max(-1, Math.min(1, dx)),
        y: Math.max(-1, Math.min(1, dy)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Organic blink timer
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const triggerOrganicBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 120);
      
      const nextDelay = (config.blinkCadence * 1000) * (0.8 + Math.random() * 0.4);
      blinkTimeout = setTimeout(triggerOrganicBlink, nextDelay);
    };

    blinkTimeout = setTimeout(triggerOrganicBlink, 2000);
    return () => clearTimeout(blinkTimeout);
  }, [config.blinkCadence]);

  // Handle clicking / petting the bot with jiggle action
  const handlePetBot = () => {
    triggerAction('jiggle');
    const prevExpr = config.expression;
    onUpdateConfig({ 
      expression: 'happy',
      speechBubble: '♥ SQUISH_ACK',
    });
    
    setTimeout(() => {
      onUpdateConfig({ 
        expression: prevExpr,
        speechBubble: undefined,
      });
    }, 1600);
  };

  // Trigger temporary micro-animation
  const triggerAction = (action: string) => {
    setCurrentAction(action);
    setTimeout(() => {
      setCurrentAction(undefined);
    }, 700);
  };

  // Handle speech simulator
  const handleSpeak = (text: string) => {
    if (!text.trim()) return;
    onUpdateConfig({
      speechBubble: text,
    });

    setTimeout(() => {
      onUpdateConfig({
        speechBubble: undefined,
      });
    }, 3800);
  };

  const quickQuips = [
    'OPTIC_LINK_ESTABLISHED',
    'BODY_ROTATION_ZERO',
    'TRACKING_TARGET_XYZ',
    'SYSTEM_STATUS: NOMINAL',
    'GROTBOT_VECTOR_MATRIX',
  ];

  // All 9 Micro-Expressions in Monochrome Dark Style
  const expressionList: { id: MicroExpression; label: string; glyph: string; icon: React.ReactNode }[] = [
    { id: 'normal', label: 'Classic', glyph: '//', icon: <CircleDot className="w-3.5 h-3.5" /> },
    { id: 'happy', label: 'Happy', glyph: '^^', icon: <Smile className="w-3.5 h-3.5" /> },
    { id: 'wink', label: 'Wink', glyph: '^/', icon: <Eye className="w-3.5 h-3.5" /> },
    { id: 'curious', label: 'Curious', glyph: "/'", icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'shocked', label: 'Shocked', glyph: 'OO', icon: <AlertCircle className="w-3.5 h-3.5" /> },
    { id: 'sleepy', label: 'Sleepy', glyph: '--', icon: <Moon className="w-3.5 h-3.5" /> },
    { id: 'suspicious', label: 'Squint', glyph: '=_=', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'hearts', label: 'Hearts', glyph: '♥♥', icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'dizzy', label: 'Dizzy', glyph: '/\\', icon: <Zap className="w-3.5 h-3.5" /> },
  ];

  // Pure Neutral Black Background Styles (Zero Blue)
  const getBgClass = () => {
    switch (background) {
      case 'tech_grid':
        return 'bg-[#000000] bg-tech-grid border-[#262626]';
      case 'hud_radar':
        return 'bg-[#000000] bg-hud-radar border-[#262626]';
      case 'dot_matrix':
        return 'bg-[#000000] bg-dot-pattern border-[#262626]';
      case 'oled_black':
        return 'bg-[#000000] border-[#222222]';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0a0a0a] p-3 lg:p-5 gap-3 overflow-hidden relative font-mono">
      {/* Top Workspace Pure Neutral Toolbar */}
      <div className="flex items-center justify-between gap-4 z-10 shrink-0">
        {/* Environment Background Selectors */}
        <div className="flex items-center gap-1 p-1 bg-[#141414] rounded-lg border border-[#262626]">
          <span className="text-[10px] text-neutral-500 px-2 tracking-wider">CANVAS:</span>
          <button
            onClick={() => setBackground('tech_grid')}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1.5 ${
              background === 'tech_grid' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setBackground('hud_radar')}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1.5 ${
              background === 'hud_radar' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Radar</span>
          </button>
          <button
            onClick={() => setBackground('dot_matrix')}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1.5 ${
              background === 'dot_matrix' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dots</span>
          </button>
          <button
            onClick={() => setBackground('oled_black')}
            className={`px-2.5 py-1 text-xs rounded transition-colors flex items-center gap-1.5 ${
              background === 'oled_black' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Solid</span>
          </button>
        </div>

        {/* Zoom & Viewport Scale Controls */}
        <div className="flex items-center gap-1 p-1 bg-[#141414] rounded-lg border border-[#262626]">
          <button
            onClick={() => setZoom((z) => Math.max(0.7, Number((z - 0.15).toFixed(2))))}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#222222] rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-white px-1.5 tabular-nums font-semibold">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.15).toFixed(2))))}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#222222] rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1.0)}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#222222] rounded transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Interactive Stage with Pure Neutral HUD Brackets */}
      <div
        ref={stageRef}
        className={`flex-1 rounded-xl border transition-all duration-300 relative flex items-center justify-center overflow-hidden cursor-crosshair shadow-2xl ${getBgClass()}`}
      >
        {/* Floating Centered HUD Motion Actions (Always visible, never clipped) */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-[#141414]/95 backdrop-blur-md rounded-lg border border-[#2e2e2e] z-20 shadow-xl">
          <span className="text-[10px] text-neutral-500 px-1.5 tracking-wider uppercase font-semibold">MOTION:</span>
          {(['jiggle', 'bounce', 'nod', 'spin'] as const).map((act) => (
            <button
              key={act}
              onClick={(e) => {
                e.stopPropagation();
                triggerAction(act);
              }}
              className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white hover:bg-[#242424] rounded border border-transparent hover:border-[#383838] transition-all active:scale-95 uppercase"
            >
              {act}
            </button>
          ))}
        </div>

        {/* HUD Corner Reticles (Pure Neutral White & Gray) */}
        <div className="absolute top-3.5 left-3.5 text-neutral-400 font-mono text-[10px] tracking-wider select-none pointer-events-none flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>┌ TELEMETRY.ONLINE</span>
        </div>
        <div className="absolute top-3.5 right-3.5 text-neutral-500 font-mono text-[10px] tracking-wider select-none pointer-events-none">
          <span>ANGLE: {config.bodyRotation}° ┐</span>
        </div>
        <div className="absolute bottom-3.5 left-3.5 text-neutral-500 font-mono text-[10px] tracking-wider select-none pointer-events-none">
          <span>└ GAZE: X {gaze.x.toFixed(2)} / Y {gaze.y.toFixed(2)}</span>
        </div>
        <div className="absolute bottom-3.5 right-3.5 text-neutral-500 font-mono text-[10px] tracking-wider select-none pointer-events-none">
          <span>SHAPE: {config.shape.toUpperCase()} ┘</span>
        </div>

        {/* Central Subtle Crosshair */}
        <div className="absolute w-12 h-12 border border-white/5 rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
        </div>

        {/* The Scaled SVG Bot */}
        <div
          onClick={handlePetBot}
          className="cursor-pointer transition-transform duration-200 active:scale-95 z-10"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          title="Click to squish bot!"
        >
          <GrotBotSvg
            config={config}
            size={340}
            gaze={gaze}
            isBlinking={isBlinking}
            animateFloat={true}
            actionState={currentAction}
          />
        </div>
      </div>

      {/* Bottom Interactive Toolbar: 9 Micro-Expressions Bar & Speech Simulator */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-2.5 bg-[#141414] rounded-xl border border-[#262626] z-10 shrink-0">
        {/* Micro-Expressions Switcher (All 9) */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[10px] text-neutral-500 px-2 uppercase tracking-wider shrink-0">MOOD:</span>
          {expressionList.map((expr) => {
            const isActive = config.expression === expr.id;
            return (
              <button
                key={expr.id}
                onClick={() => onUpdateConfig({ expression: expr.id })}
                className={`px-3 py-1.5 text-xs font-mono rounded transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-[#202020] border border-transparent'
                }`}
                title={`${expr.label} (${expr.glyph})`}
              >
                <span className={isActive ? 'text-black font-bold' : 'text-neutral-300 font-bold'}>
                  {expr.glyph}
                </span>
                <span>{expr.label}</span>
              </button>
            );
          })}
        </div>

        {/* Speech Simulator Input */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              value={sayInput}
              onChange={(e) => setSayInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSpeak(sayInput);
                  setSayInput('');
                }
              }}
              placeholder="Inject speech payload..."
              className="w-full bg-[#1c1c1c] text-xs font-mono text-white placeholder-neutral-500 rounded pl-8 pr-3 py-1.5 border border-[#333333] focus:outline-none focus:border-white transition-colors"
            />
            <MessageSquare className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2" />
          </div>

          <button
            onClick={() => {
              handleSpeak(sayInput || quickQuips[Math.floor(Math.random() * quickQuips.length)]);
              setSayInput('');
            }}
            className="px-3.5 py-1.5 bg-[#222222] hover:bg-[#2a2a2a] text-white text-xs font-mono font-medium rounded border border-[#383838] transition-colors flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            title="Make bot speak"
          >
            <Send className="w-3 h-3" />
            <span>TRANSMIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
