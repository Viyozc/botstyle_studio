/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { BotConfig, MicroExpression } from './types/bot.ts';
import { DEFAULT_BOT } from './constants/presets.ts';
import { TopBar } from './components/TopBar.tsx';
import { PresetBar, generateRandomBot } from './components/PresetBar.tsx';
import { StudioCanvas } from './components/StudioCanvas.tsx';
import { InspectorPanel } from './components/InspectorPanel.tsx';
import { ExportModal } from './components/ExportModal.tsx';
import { GuideModal } from './components/GuideModal.tsx';

export default function App() {
  const [config, setConfig] = useState<BotConfig>(DEFAULT_BOT);
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Update partial config
  const handleUpdateConfig = useCallback((partial: Partial<BotConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  }, []);

  // Preset selection
  const handleSelectPreset = useCallback((preset: BotConfig) => {
    setConfig({ ...preset });
  }, []);

  // Randomize
  const handleRandomize = useCallback(() => {
    const randomized = generateRandomBot();
    setConfig(randomized);
  }, []);

  // Reset
  const handleReset = useCallback(() => {
    setConfig({ ...DEFAULT_BOT, id: `grot-${Date.now()}` });
  }, []);

  // Keyboard Shortcuts (1-9 for micro-expressions)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      const exprMap: Record<string, MicroExpression> = {
        '1': 'normal',
        '2': 'happy',
        '3': 'wink',
        '4': 'curious',
        '5': 'shocked',
        '6': 'sleepy',
        '7': 'suspicious',
        '8': 'hearts',
        '9': 'dizzy',
      };

      if (exprMap[e.key]) {
        handleUpdateConfig({ expression: exprMap[e.key] });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUpdateConfig]);

  return (
    <div className="flex flex-col h-screen w-screen bg-[#000000] text-neutral-100 overflow-hidden font-mono">
      {/* 1. Header Top Bar */}
      <TopBar
        botName={config.name}
        onOpenExport={() => setIsExportOpen(true)}
        onTogglePresets={() => setIsPresetsOpen((prev) => !prev)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onRandomize={handleRandomize}
      />

      {/* 2. Main Studio Canvas Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left: Archetypes / Preset Bar */}
        <PresetBar
          currentConfig={config}
          onSelectPreset={handleSelectPreset}
          onRandomize={handleRandomize}
          onReset={handleReset}
          isOpen={isPresetsOpen}
          onClose={() => setIsPresetsOpen(false)}
        />

        {/* Center: Interactive Live Bot Canvas */}
        <StudioCanvas
          config={config}
          onUpdateConfig={handleUpdateConfig}
        />

        {/* Right: Deep Inspector & Customizer */}
        <InspectorPanel
          config={config}
          onUpdateConfig={handleUpdateConfig}
        />
      </div>

      {/* 3. Export Modal */}
      <ExportModal
        config={config}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        onImportConfig={(imported) => setConfig(imported)}
      />

      {/* 4. Design Philosophy & Specs Guide Modal */}
      <GuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
    </div>
  );
}
