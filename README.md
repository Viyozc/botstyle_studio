# BotStyle Studio (GrotBot Studio)

[![Live Demo](https://img.shields.io/badge/demo-GitHub%20Pages-FF6417?style=for-the-badge)](https://viyozc.github.io/botstyle_studio/)

Interactive procedural SVG bot character studio. Design organic blob-shaped mascots with pointer-driven eye tracking, nine micro-expressions, preset archetypes, and one-click export as SVG, React, PNG, or JSON.

Inspired by Charcoal / Grotbot aesthetics. The project began in [Google AI Studio](https://aistudio.google.com/); the open-source studio runs entirely in the browser with no backend required.

![GrotBot Studio preview](public/assets/aistudio/image_de9353ff.png)

## Features

- **`GrotBotSvg`** — Procedural SVG renderer with 14 body shapes (squircle, cloud, hexagon, rocket, heart, and more), shading styles, idle float, blink cadence, and action states (jiggle, bounce, nod, shiver, spin).
- **Live studio canvas** — Mouse-driven pupil tracking with configurable sensitivity, canvas backgrounds (tech grid, HUD radar, dot matrix, OLED black), zoom, speech bubbles, and quick expression picker.
- **Preset bar** — Curated `BOT_PRESETS` archetypes, randomize, and reset; collapsible sidebar on smaller viewports.
- **Inspector panel** — Tabbed controls for shape, eyes (“optics”), colors, and physics (float, squash, blink timing).
- **Keyboard shortcuts** — Keys `1`–`9` map to micro-expressions while focus is outside inputs.
- **Export modal** — Copy or download standalone SVG; generated React + TypeScript component snippet; PNG at configurable size; JSON config import/export.
- **Guide modal** — In-app design philosophy and usage reference.

## Tech stack

| Layer | Tools |
| --- | --- |
| Build | [Vite](https://vitejs.dev/) 8 |
| UI | [React](https://react.dev/) 19, [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 4 (`@tailwindcss/vite`) |
| Icons | [lucide-react](https://lucide.dev/) |
| Animation | [Motion](https://motion.dev/) (dependency; core bot motion uses CSS/SVG) |

Legacy AI Studio dependencies (`@google/genai`, `express`, `dotenv`) remain in `package.json` for compatibility with the original template but are **not used** by the studio UI.

## Quick start

```bash
git clone https://github.com/Viyozc/botstyle_studio.git
cd botstyle_studio
npm install
npm run dev
```

Open the URL Vite prints (default port `3000`). No environment variables are required for the SVG studio.

### Environment variables

The repository includes `.env.example` with `GEMINI_API_KEY` and `APP_URL` for **Google AI Studio** hosting only. The local demo and GitHub Pages build do not read these values; you can ignore them unless you redeploy the original AI Studio server stack.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Typecheck via `tsc --noEmit` |
| `npm run clean` | Remove `dist/` and any local `server.js` |

## Project structure

```text
src/
  App.tsx                 # Studio shell and keyboard shortcuts
  components/
    GrotBotSvg.tsx        # Procedural SVG bot renderer
    StudioCanvas.tsx      # Preview stage, gaze, backgrounds
    PresetBar.tsx         # Presets and randomize
    InspectorPanel.tsx    # Shape / eye / color / physics controls
    ExportModal.tsx       # SVG, React, PNG, JSON export
    GuideModal.tsx        # In-app guide
  constants/presets.ts    # Named bot archetypes
  types/bot.ts            # BotConfig and shape/expression types
  utils/
    svgGenerator.ts       # Standalone SVG export
    reactComponentGenerator.ts
public/assets/            # Static images for docs / OG
```

## GitHub Pages

The live demo is published at **[https://viyozc.github.io/botstyle_studio/](https://viyozc.github.io/botstyle_studio/)**.

- Vite `base` is set to `/botstyle_studio/` so assets resolve under the project Pages URL.
- Pushes to `main` (or manual **workflow_dispatch**) run [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which builds with Node 22 and deploys `dist` via `actions/deploy-pages`.

**First-time setup (repo maintainer):**

1. Merge the workflow into `main`.
2. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Wait for the “Deploy GitHub Pages” workflow to finish successfully.

There is no client-side router; a `404.html` copy is not required.

**Local preview of the Pages build:**

```bash
npm run build
npm run preview -- --base /botstyle_studio/
```

## Contributing

Issues and pull requests are welcome. Please run `npm run lint` and `npm run build` before submitting a PR.

## License

[MIT](LICENSE)
