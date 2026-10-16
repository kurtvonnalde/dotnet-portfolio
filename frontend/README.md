# React + TypeScript + Vite

## Workspace layout

The desktop workspace has separate activity bar, file explorer, editor, and chat panes with aligned headers and independently scrolling content. A full-width status bar below all panes contains the profile name and social links, remaining visible when the explorer or chat is closed. On smaller screens the explorer and editor stack, chat opens as a floating panel, and the status bar sticks to the bottom of the viewport.

Page layouts use the named `editor` container for responsive breakpoints, rather than the browser width. This keeps headings and cards readable when the explorer and chat leave a narrow editor pane; wider layouts return automatically as space becomes available.

The home hero returns to side-by-side columns at 48rem of editor content width, and the dashboard returns to its multi-column layout at 56rem. Browser zoom is not overridden; zooming out naturally restores these layouts as the available CSS width increases.

On desktop, side panes automatically collapse to reserve at least 720px for the editor (including padding). The most recently selected pane takes priority when both cannot fit, and chat floats if it cannot dock without squeezing the editor. Pane preferences are retained when resizing.

Search beside the active filename matches page names, filenames, and portfolio content. Use the arrow keys and Enter to navigate results, Escape to dismiss, or click a result. Page metadata and search content are maintained in `src/data/workspacePages.ts`.

## Portfolio content

Portfolio content lives in `src/data/`, split by section so each area is quick to find:

- `profile.ts`: name, initials, role, and handle
- `home.ts`: hero copy
- `projects.ts`: project list
- `about.ts`: biography
- `education.ts`: education timeline entries
- `employment.ts`: employment history entries
- `certifications.ts`: certifications
- `services.ts`: service list
- `tools.ts`: technologies
- `caseStudies.ts`: case studies
- `contact.ts`: contact copy and social links

Edit the matching file when updating that section; the pages and home dashboard read from these modules.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
