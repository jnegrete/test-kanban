# Design: Kanban Board

## Technical Approach

Single-page React app bootstrapped with Vite. State managed via custom hooks with localStorage as persistence layer. Drag-and-drop via @dnd-kit. No router needed — single view. Plain CSS for styling (no framework).

## Architecture Decisions

### Decision: @dnd-kit over react-beautiful-dnd

**Choice**: @dnd-kit/core + @dnd-kit/sortable
**Alternatives considered**: react-beautiful-dnd, vanilla HTML5 Drag and Drop API
**Rationale**: react-beautiful-dnd is unmaintained (archived by Atlassian). @dnd-kit is actively maintained, tree-shakeable, and has a cleaner API for both vertical sorting (within column) and cross-container sorting (between columns).

### Decision: Custom hooks over state management library

**Choice**: useBoardState + useLocalStorage custom hooks
**Alternatives considered**: Redux, Zustand, useContext
**Rationale**: App has a single data domain (board state). Custom hooks avoid dependency overhead while keeping state logic testable and isolated. Scales well for this scope.

### Decision: localStorage for persistence

**Choice**: localStorage with JSON serialization
**Alternatives considered**: IndexedDB, no persistence
**Rationale**: Simplest persistence layer for a toy project. No async API. ~5MB limit is sufficient for kanban-scale data. IndexedDB adds complexity with marginal benefit here.

### Decision: Plain CSS over CSS-in-JS or frameworks

**Choice**: Single CSS files per component
**Alternatives considered**: Tailwind, styled-components, CSS Modules
**Rationale**: Zero config, zero deps. CSS Modules would conflict with Vite's defaults. Tailwind adds a build step. For <5 components, plain CSS is the fastest path.

## Data Model

```js
// localStorage schema
{
  columns: {
    "todo":       { id: "todo",       title: "To Do",       cardIds: ["c1", "c2"] },
    "in-progress": { id: "in-progress", title: "In Progress", cardIds: ["c3"] },
    "done":       { id: "done",       title: "Done",         cardIds: [] }
  },
  cards: {
    "c1": { id: "c1", title: "Task 1", description: "" },
    "c2": { id: "c2", title: "Task 2", description: "Details" },
    "c3": { id: "c3", title: "Task 3", description: "" }
  },
  columnOrder: ["todo", "in-progress", "done"]
}
```

## Component Tree

```
App
├── Board
│   ├── Column (To Do)
│   │   ├── Card
│   │   └── Card
│   ├── Column (In Progress)
│   │   └── Card
│   └── Column (Done)
│       └── (empty state)
```

## Data Flow

```
User action (add/edit/delete/move card)
  → useBoardState dispatch
    → state update (immutable)
      → useLocalStorage effect (write)
        → re-render affected components
```

On load:
```
App mount
  → useLocalStorage.read()
    → valid data? → hydrate useBoardState
    → corrupted?  → initialize defaultBoard
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Create | Vite HTML entry point |
| `vite.config.js` | Create | Vite + React plugin config |
| `src/main.jsx` | Create | ReactDOM.createRoot entry |
| `src/App.jsx` | Create | Root component, orchestrates Board + hooks |
| `src/components/Board.jsx` | Create | Columns layout, DndContext provider |
| `src/components/Column.jsx` | Create | Column with sortable context, add-card form |
| `src/components/Card.jsx` | Create | Card display, edit/delete actions |
| `src/components/AddCardForm.jsx` | Create | Inline form for new card title |
| `src/components/EditCardForm.jsx` | Create | Inline form for editing card |
| `src/hooks/useBoardState.js` | Create | Board state CRUD reducer |
| `src/hooks/useLocalStorage.js` | Create | localStorage read/write with corruption handling |
| `src/data/defaultBoard.js` | Create | Default 3-column board structure |
| `src/styles/board.css` | Create | Board layout styles |
| `src/styles/column.css` | Create | Column styles |
| `src/styles/card.css` | Create | Card styles |
| `tests/setup.js` | Create | Vitest + RTL setup |
| `tests/Board.test.jsx` | Create | Board render, column display |
| `tests/Card.test.jsx` | Create | Card CRUD, drag-and-drop |
| `tests/useBoardState.test.js` | Create | Hook unit tests |
| `tests/useLocalStorage.test.js` | Create | Hook unit tests |

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | useBoardState reducer | Pure function tests: add, edit, delete, moveCard |
| Unit | useLocalStorage | Mock localStorage: read, write, corrupted data |
| Component | Card | Render, edit, delete, validation |
| Component | Board + Column | Render columns, render cards in correct column |
| Integration | Full CRUD flow | Add card → appears in column → edit → delete → gone |

## Migration / Rollout

No migration required — greenfield project.

## Open Questions

None.
