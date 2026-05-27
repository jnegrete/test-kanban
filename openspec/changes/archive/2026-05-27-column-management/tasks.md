# Tasks: Column Management

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | pending |

Decision needed before apply: Yes
Chained PRs recommended: No
Chain strategy: pending
400-line budget risk: Medium

## Phase 1: Reducer + Hook

- [x] 1.1 Add `ADD_COLUMN` case in `src/hooks/useBoardState.js` — guard empty title, generate ID, create column with `cardIds: []`, append to `columnOrder`
- [x] 1.2 Add `RENAME_COLUMN` case — guard missing `columnId` and empty title, update `columns[id].title`, return state unchanged on reject
- [x] 1.3 Add `DELETE_COLUMN` case — guard missing `columnId` and non-empty `cardIds`, delete from `columns` and filter from `columnOrder`
- [x] 1.4 Add `addColumn(title)`, `renameColumn(id, title)`, `deleteColumn(id)` callbacks in `useBoardState` via `useCallback`

## Phase 2: Components

- [x] 2.1 Create `src/components/ColumnHeader.jsx` — view mode (title + count), click-to-edit rename form (enter/blur confirm, escape cancel), delete button with confirmation prompt ("Move cards first" if non-empty)
- [x] 2.2 Update `src/components/Column.jsx` — replace inline `.column-header` with `<ColumnHeader>`, pass `onRename={onRenameColumn}`, `onDelete={onDeleteColumn}`, `cardCount={cards.length}`
- [x] 2.3 Update `src/components/Board.jsx` — render "Add Column" button after last column, inline form with title input + submit/cancel, pass `onAddColumn`/`onRenameColumn`/`onDeleteColumn` to Column
- [x] 2.4 Update `src/App.jsx` — pass `addColumn`, `renameColumn`, `deleteColumn` from `useBoardState` to `<Board>`

## Phase 3: Styling

- [x] 3.1 Add to `src/styles/column.css` — ColumnHeader layout, rename input (inline, same height as title), delete button with hover state, confirmation prompt styling
- [x] 3.2 Add to `src/styles/board.css` — Add Column button (outline style, matches column width), inline form with input + action buttons

## Phase 4: Tests

- [x] 4.1 Add reducer tests in `tests/useBoardState.test.js` — `ADD_COLUMN` valid (creates column, appends to order), `ADD_COLUMN` empty title rejected, `ADD_COLUMN` whitespace-only rejected
- [x] 4.2 Add reducer tests for `RENAME_COLUMN` — valid rename updates title, empty title returns unchanged state, missing columnId returns unchanged state
- [x] 4.3 Add reducer tests for `DELETE_COLUMN` — empty column removed, non-empty column unchanged, non-existent ID returns state unchanged, last empty column allowed
- [x] 4.4 Create `tests/ColumnHeader.test.jsx` — renders title, click enters edit mode, enter/blur saves rename, escape cancels, delete shows confirmation
- [x] 4.5 Update `tests/Board.test.jsx` — "Add Column" button renders, form submits valid title creates column, empty title rejected, add-column form cancels on escape/blur
