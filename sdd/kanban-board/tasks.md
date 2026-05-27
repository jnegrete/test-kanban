# Tasks: Kanban Board

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~450-550 |
| 400-line budget risk | High |
| Chained PRs recommended | Yes |
| Suggested split | PR 1: scaffolding + data layer → PR 2: components + drag-and-drop |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: Yes
Chain strategy: feature-branch-chain
400-line budget risk: High

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation: Vite setup, data model, hooks, localStorage, tests | PR 1 | Independent — no UI yet |
| 2 | UI: Board, Column, Card components, drag-and-drop, styling, integration tests | PR 2 | Depends on PR 1 hooks |

## Phase 1: Foundation

- [x] 1.1 Create `index.html` with root div and Vite script tag
- [x] 1.2 Create `vite.config.js` with React plugin
- [x] 1.3 Install deps: react, react-dom, @dnd-kit/core, @dnd-kit/sortable, vitest, @testing-library/react, jsdom
- [x] 1.4 Create `src/data/defaultBoard.js` with 3-column structure
- [x] 1.5 Create `src/hooks/useLocalStorage.js` — read/write with corruption handling
- [x] 1.6 Create `src/hooks/useBoardState.js` — reducer with addCard, editCard, deleteCard, moveCard
- [x] 1.7 Write `tests/useLocalStorage.test.js` — read, write, corrupted data
- [x] 1.8 Write `tests/useBoardState.test.js` — all reducer actions

## Phase 2: Components

- [x] 2.1 Create `src/main.jsx` — ReactDOM root render
- [x] 2.2 Create `src/App.jsx` — wire useBoardState + useLocalStorage, render Board
- [x] 2.3 Create `src/components/Board.jsx` — DndContext, SortableContext per column
- [x] 2.4 Create `src/components/Column.jsx` — card list, add-card button, droppable area
- [x] 2.5 Create `src/components/AddCardForm.jsx` — inline title input with validation
- [x] 2.6 Create `src/components/Card.jsx` — display, edit, delete with confirmation
- [x] 2.7 Create `src/components/EditCardForm.jsx` — inline edit form

## Phase 3: Styling

- [x] 3.1 Create `src/styles/board.css` — horizontal column layout
- [x] 3.2 Create `src/styles/column.css` — column card list, header, add button
- [x] 3.3 Create `src/styles/card.css` — card display, edit/delete actions, drag styles

## Phase 4: Drag-and-Drop

- [x] 4.1 Wire drag-and-drop in `Board.jsx` — handleDragEnd updates card column/position
- [x] 4.2 Add visual feedback in `Column.jsx` and `Card.jsx` — drag overlay, drop indicator

## Phase 5: Tests

- [x] 5.1 Create `tests/setup.js` — Vitest + RTL + jsdom config
- [x] 5.2 Write `tests/Board.test.jsx` — renders 3 columns, renders cards in correct column
- [x] 5.3 Write `tests/Card.test.jsx` — render, edit flow, delete with confirmation
- [x] 5.4 Write integration test — full CRUD flow: add → appears → edit → delete → gone
