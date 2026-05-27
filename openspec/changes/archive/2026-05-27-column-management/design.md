# Design: Column Management

## Technical Approach

Extend `boardReducer` with three new action types (`ADD_COLUMN`, `RENAME_COLUMN`, `DELETE_COLUMN`) following the existing reducer pattern. Extract `ColumnHeader` from `Column.jsx` to own rename/delete UX (mirrors Card's inline-edit + confirmation pattern). Wire new callbacks through `useBoardState` → `App.jsx` → `Board.jsx`. "Add Column" UI lives in `Board.jsx` after the last column. Persistence uses the existing `persistDispatch` — no new store layer.

## Architecture Decisions

### Decision: Mutate state in reducer vs. guard in component
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Guard in component before dispatch | Keeps reducer pure-simple, but duplicates guard logic across callers | **Reducer guards** — consistent with existing `ADD_CARD` empty-title guard |
| Reject in reducer, let component handle error feedback | Single authority for invariants, component just dispatches | Chosen — reducer returns state unchanged, component compares refs for feedback |

### Decision: ColumnHeader as separate component vs. inline in Column
| Option | Tradeoff | Decision |
|--------|----------|----------|
| Inline rename/delete in Column.jsx | Fewer files, but Column grows past its SRP | **Extract ColumnHeader** — matches Card/EditCardForm separation and spec requirement |
| Derive cardCount in Column vs. pass as prop | Column has access to `cards.length` | Pass as prop for explicit contract and easier testing |

## Data Flow

```
App.jsx  (state, persistDispatch)
  │  useBoardState() returns { addColumn, renameColumn, deleteColumn }
  ▼
Board.jsx  (receives callbacks + state)
  │  renders "Add Column" form after last column
  ├─ Column (per columnOrder)
  │    └─ ColumnHeader
  │         ├─ onClick title → inline rename form
  │         ├─ onClick delete → confirmation prompt
  │         └─ onConfirm → dispatch RENAME_COLUMN / DELETE_COLUMN
  │
  └─ persistDispatch(action)
       └─ boardReducer(state, action) → new state + localStorage
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/components/ColumnHeader.jsx` | Create | Inline rename (click→edit→blur/enter confirm), delete with confirmation prompt, card count badge |
| `src/hooks/useBoardState.js` | Modify | 3 reducer cases + `addColumn`/`renameColumn`/`deleteColumn` callbacks |
| `src/components/Column.jsx` | Modify | Replace inline `.column-header` with `<ColumnHeader>`, pass `onRename`/`onDelete`/`cardCount` |
| `src/components/Board.jsx` | Modify | Add "Add Column" button + inline form, pass column-management callbacks down |
| `src/App.jsx` | Modify | Pass `addColumn`, `renameColumn`, `deleteColumn` to Board |
| `src/styles/column.css` | Modify | Add rename input, delete confirmation, ColumnHeader layout styles |
| `src/styles/board.css` | Modify | Add "Add Column" button and form styles |
| `tests/useBoardState.test.js` | Modify | Test all 3 new actions + guard scenarios |
| `tests/Board.test.jsx` | Modify | Add-column UI integration tests |
| `tests/ColumnHeader.test.jsx` | Create | Render modes (view/edit/confirm), user interactions |

## Interfaces / Contracts

```js
// Reducer actions
{ type: 'ADD_COLUMN',    payload: { title: string } }
{ type: 'RENAME_COLUMN', payload: { columnId: string, title: string } }
{ type: 'DELETE_COLUMN', payload: { columnId: string } }

// ColumnHeader props
ColumnHeader {
  column:       { id, title, cardIds }
  onRename:     (columnId, newTitle) => void
  onDelete:     (columnId) => void
  cardCount:    number
}

// deriveCardCount doesn't exist — Column passes cards.length
```

## Reducer Logic

```
ADD_COLUMN:
  guard: title.trim() === "" → return state
  id = generateId()
  columns[id] = { id, title: title.trim(), cardIds: [] }
  columnOrder = [...columnOrder, id]

RENAME_COLUMN:
  guard: !columns[columnId] → return state
  guard: title.trim() === "" → return state
  columns[columnId].title = title.trim()

DELETE_COLUMN:
  guard: !columns[columnId] → return state
  guard: columns[columnId].cardIds.length > 0 → return state
  delete columns[columnId]
  columnOrder = columnOrder.filter(id => id !== columnId)
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit (reducer) | ADD_COLUMN valid/empty, RENAME_COLUMN valid/empty/nonexistent, DELETE_COLUMN empty/non-empty/nonexistent/last-column | Pure function assertions on `boardReducer` — same pattern as existing tests |
| Integration (component) | ColumnHeader renders title, click enters edit, confirm/enter saves, escape cancels, delete confirms then removes | Vitest + Testing Library, render with mock callbacks |
| Integration (Board) | "Add Column" button renders, form submits valid title, empty title rejected | Vitest + Testing Library, render Board with state |
| E2E | Full flow: add column → rename it → add card → delete blocked → move card → delete succeeds | Manual (no e2e infra in project) |

## Migration / Rollout

No migration required. Existing board data (columns with `id`, `title`, `cardIds`) is compatible — the three new actions are additive. The `columnOrder` array is the single source of truth for column rendering order.

## Open Questions

- None — all decisions are covered by the spec and existing patterns.
