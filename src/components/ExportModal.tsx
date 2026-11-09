/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BotConfig } from '../types/bot.ts';
import { generateStandaloneSvg } from '../utils/svgGenerator.ts';
import { generateReactComponentCode } from '../utils/reactComponentGenerator.ts';
import { GrotBotSvg } from './GrotBotSvg.tsx';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Code, 
  FileCode, 
  Image as ImageIcon, 
  FileJson,
  Upload
} from 'lucide-react';

interface ExportModalProps {
  config: BotConfig;
  isOpen: boolean;
  onClose: () => void;
  onImportConfig: (config: BotConfig) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  config,
  isOpen,
  onClose,
  onImportConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'svg' | 'react' | 'png' | 'json'>('svg');
  const [copied, setCopied] = useState(false);
  const [pngSize, setPngSize] = useState<number>(640);
  const [pngTransparent, setPngTransparent] = useState<boolean>(true);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);

  if (!isOpen) return null;

  const svgCode = generateStandaloneSvg(config);
  const reactCode = generateReactComponentCode(config);
  const jsonCode = JSON.stringify(config, null, 2);

  // Copy to clipboard helper
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download standalone SVG file
  const handleDownloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.id || 'grotbot'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download high-resolution PNG file using HTML Canvas
  const handleDownloadPng = () => {
    const canvas = document.createElement('canvas');
    canvas.width = pngSize;
    canvas.height = pngSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!pngTransparent) {
      ctx.fillStyle = '#0D1117';
      ctx.fillRect(0, 0, pngSize, pngSize);
    }

    const img = new Image();
    const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, pngSize, pngSize);
      URL.revokeObjectURL(url);
      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = `${config.id || 'grotbot'}-${pngSize}px.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    img.src = url;
  };

  // Handle JSON Import
  const handleApplyJson = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.shape || !parsed.bodyColor) {
        throw new Error('Invalid bot configuration schema.');
      }
      onImportConfig(parsed);
      onClose();
    } catch {
      setImportError('Invalid JSON format. Please verify configuration.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md select-none font-mono">
      <div className="bg-[#05070B] border border-[#161F2E] w-full max-w-3xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden tech-border-glow">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#141A26] bg-[#030508]">
          <div>
            <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
              <span>EXPORT_MATRIX // PRODUCTION_READY</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              TARGET: {config.name} (ROT: {config.bodyRotation}°)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-[#00f2fe] hover:bg-[#0E1420] rounded border border-transparent hover:border-[#1E2B3E] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Export Formats Tab Strip */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#141A26] bg-[#06080E]">
          <button
            onClick={() => setActiveTab('svg')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'svg'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>STANDALONE.SVG</span>
          </button>

          <button
            onClick={() => setActiveTab('react')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'react'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>REACT.TSX</span>
          </button>

          <button
            onClick={() => setActiveTab('png')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'png'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>RASTER.PNG</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'json'
                ? 'border-[#00f2fe] text-[#00f2fe]'
                : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>CONFIG.JSON</span>
          </button>
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: STANDALONE SVG */}
          {activeTab === 'svg' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Self-contained vector SVG with embedded breathing & blinking CSS keyframes.</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(svgCode)}
                    className="px-3 py-1.5 bg-[#171D29] hover:bg-[#222B3D] text-cyan-400 text-xs font-medium rounded-lg border border-[#273247] transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={handleDownloadSvg}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .svg</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl border border-[#222938] bg-[#07090E] p-4 overflow-hidden">
                <pre className="text-xs font-mono text-cyan-200/90 overflow-x-auto max-h-72 select-text leading-relaxed">
                  <code>{svgCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: REACT TSX COMPONENT */}
          {activeTab === 'react' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Drop-in React TypeScript component with pointer pupil tracking & emotion props.</span>
                <button
                  onClick={() => handleCopy(reactCode)}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Code!' : 'Copy React Component'}</span>
                </button>
              </div>

              <div className="relative rounded-xl border border-[#222938] bg-[#07090E] p-4 overflow-hidden">
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto max-h-72 select-text leading-relaxed">
                  <code>{reactCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: PNG RASTER EXPORT */}
          {activeTab === 'png' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                {/* Preview Box */}
                <div className="rounded-xl border border-[#222938] bg-[#0A0D13] p-6 flex flex-col items-center justify-center">
                  <div className={`p-4 rounded-xl ${pngTransparent ? 'bg-dot-pattern' : 'bg-[#0D1117]'}`}>
                    <GrotBotSvg config={config} size={200} animateFloat={false} />
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 mt-3">
                    Preview ({pngSize} × {pngSize} px)
                  </span>
                </div>

                {/* Configuration Options */}
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-2">Resolution</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[320, 640, 1024].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setPngSize(sz)}
                          className={`py-2 px-3 rounded-lg border text-center font-mono ${
                            pngSize === sz
                              ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                              : 'bg-[#131722] border-[#222938] text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          {sz}px
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-2">Background Fill</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPngTransparent(true)}
                        className={`py-2 px-3 rounded-lg border text-center ${
                          pngTransparent
                            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                            : 'bg-[#131722] border-[#222938] text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        Transparent
                      </button>
                      <button
                        onClick={() => setPngTransparent(false)}
                        className={`py-2 px-3 rounded-lg border text-center ${
                          !pngTransparent
                            ? 'bg-cyan-500/15 border-cyan-500/50 text-cyan-300'
                            : 'bg-[#131722] border-[#222938] text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        Studio Dark
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleDownloadPng}
                    className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg mt-4"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PNG Snapshot</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: JSON PRESET CONFIG */}
          {activeTab === 'json' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Save, share or import custom bot parameter setups.</span>
                <button
                  onClick={() => handleCopy(jsonCode)}
                  className="px-3 py-1.5 bg-[#171D29] hover:bg-[#222B3D] text-cyan-400 text-xs font-medium rounded-lg border border-[#273247] transition-all flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied JSON!' : 'Copy Config JSON'}</span>
                </button>
              </div>

              <div className="relative rounded-xl border border-[#222938] bg-[#07090E] p-4 overflow-hidden">
                <pre className="text-xs font-mono text-emerald-300/90 overflow-x-auto max-h-48 select-text leading-relaxed">
                  <code>{jsonCode}</code>
                </pre>
              </div>

              {/* Import Section */}
              <div className="pt-4 border-t border-[#1E2330] space-y-2">
                <span className="text-xs font-semibold text-slate-200 block">Import Bot JSON Config</span>
                <textarea
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Paste bot JSON configuration here to load..."
                  className="w-full h-20 bg-[#131722] border border-[#222938] rounded-xl p-3 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                {importError && (
                  <p className="text-xs text-rose-400">{importError}</p>
                )}
                <button
                  onClick={handleApplyJson}
                  className="py-2 px-4 bg-[#1E2536] hover:bg-[#2A344A] text-cyan-400 text-xs font-medium rounded-lg border border-[#2B354C] transition-colors flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Load Preset into Studio</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
