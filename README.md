# Test Kanban

A kanban board app built with React and @dnd-kit for drag-and-drop. Create, edit, reorder, and delete cards across columns — all persisted to localStorage.

Built as a learning project for SDD (Spec-driven Development) workflow.

## Tech Stack

- **React 19** + **Vite 8**
- **@dnd-kit** — drag-and-drop (sortable)
- **Vitest** + **Testing Library** — tests
- **localStorage** — data persistence

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview production build
npm test           # Run tests (vitest run)
npm run test:watch # Run tests in watch mode
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production to `dist/` |
| `npm run preview` | Preview production build locally |
| `npm test` | Run all tests once via Vitest |
| `npm run test:watch` | Run tests in watch mode |

## Project Structure

```
src/
├── components/     # Board, Column, Card, AddCardForm, EditCardForm
├── hooks/          # useBoardState, useLocalStorage
├── data/           # Default board data
├── styles/         # CSS files (board, column, card)
├── App.jsx         # App shell
└── main.jsx        # Entry point
tests/              # Component and hook tests
sdd/                # SDD documentation (spec, design, tasks)
```
