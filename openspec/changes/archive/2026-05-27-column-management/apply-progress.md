# Apply Progress: Column Management

**Change**: column-management
**Mode**: Strict TDD
**Date**: 2026-05-27
**Delivery**: single-pr (resolved from ask-on-risk, ~350 lines, under budget)

---

## Completed Tasks

### Phase 1: Reducer + Hook
- [x] 1.1 Add `ADD_COLUMN` case in `useBoardState.js`
- [x] 1.2 Add `RENAME_COLUMN` case
- [x] 1.3 Add `DELETE_COLUMN` case
- [x] 1.4 Add `addColumn`, `renameColumn`, `deleteColumn` callbacks

### Phase 2: Components
- [x] 2.1 Create `ColumnHeader.jsx`
- [x] 2.2 Update `Column.jsx` — use `<ColumnHeader>`
- [x] 2.3 Update `Board.jsx` — add "Add Column" button + form
- [x] 2.4 Update `App.jsx` — wire callbacks

### Phase 3: Styling
- [x] 3.1 Add ColumnHeader styles to `column.css`
- [x] 3.2 Add Add Column styles to `board.css`

### Phase 4: Tests
- [x] 4.1 ADD_COLUMN reducer tests
- [x] 4.2 RENAME_COLUMN reducer tests
- [x] 4.3 DELETE_COLUMN reducer tests
- [x] 4.4 ColumnHeader.test.jsx
- [x] 4.5 Board.test.jsx updates

---

## TDD Cycle Evidence

| Task | Test File | Layer | Safety Net | RED | GREEN | TRIANGULATE | REFACTOR |
|------|-----------|-------|------------|-----|-------|-------------|----------|
| 1.1/4.1 (ADD_COLUMN) | `tests/useBoardState.test.js` | Unit | ✅ 29/29 | ✅ Written | ✅ Passed | ✅ 3 cases (valid, empty, whitespace) | ➖ None needed |
| 1.2/4.2 (RENAME_COLUMN) | `tests/useBoardState.test.js` | Unit | ✅ 29/29 | ✅ Written | ✅ Passed | ✅ 4 cases (valid, empty, whitespace, missing ID) | ➖ None needed |
| 1.3/4.3 (DELETE_COLUMN) | `tests/useBoardState.test.js` | Unit | ✅ 29/29 | ✅ Written | ✅ Passed | ✅ 4 cases (empty, non-empty, missing ID, last col) | ➖ None needed |
| 1.4 (Callbacks) | N/A (structural) | N/A | ✅ 29/29 | ➖ Structural | ➖ Structural | ➖ Structural | ➖ None needed |
| 2.1/4.4 (ColumnHeader) | `tests/ColumnHeader.test.jsx` | Integration | N/A (new) | ✅ Written | ✅ Passed | ✅ 8 cases (render, click, submit, cancel, delete confirm, delete yes, delete no, non-empty) | ➖ None needed |
| 2.2 (Column update) | Existing Board tests | Integration | ✅ 29/29 | ➖ Approval tests | ✅ Passed | ➖ Approval tests preserved | ➖ None needed |
| 2.3/4.5 (Board + App) | `tests/Board.test.jsx` | Integration | ✅ 44/44 | ✅ Written | ✅ Passed | ✅ 4 cases (button render, submit, empty reject, cancel) | ➖ None needed |
| 2.4 (App wiring) | Existing suite | Integration | ✅ 48/48 | ➖ Structural | ✅ Passed | ➖ Structural | ➖ None needed |
| 3.1/3.2 (Styling) | N/A (CSS only) | N/A | ✅ 52/52 | ➖ No logic | ✅ Passed | ➖ No logic | ➖ None needed |

### Test Summary
- **Total tests written**: 23 (11 reducer + 8 ColumnHeader + 4 Board)
- **Total tests passing**: 52 (29 original + 11 reducer + 8 ColumnHeader + 4 Board)
- **Layers used**: Unit (11), Integration (12)
- **Approval tests**: Existing Board and Column tests preserved
- **Pure functions created**: 3 (ADD_COLUMN, RENAME_COLUMN, DELETE_COLUMN reducer cases)

---

## Files Changed

| File | Action | What Was Done |
|------|--------|---------------|
| `src/hooks/useBoardState.js` | Modified | Added `ADD_COLUMN`, `RENAME_COLUMN`, `DELETE_COLUMN` reducer cases + `addColumn`, `renameColumn`, `deleteColumn` callbacks |
| `src/components/ColumnHeader.jsx` | Created | View mode (title + card count), click-to-edit rename form with Save/Cancel, delete with "Delete?" confirmation, "Move cards first" for non-empty columns |
| `src/components/Column.jsx` | Modified | Replaced inline `.column-header` div with `<ColumnHeader>` component; receives `onRenameColumn`, `onDeleteColumn`, `cardCount` props |
| `src/components/Board.jsx` | Modified | Added "Add Column" button, inline form with title input + Add/Cancel, passes column callbacks to Column |
| `src/App.jsx` | Modified | Wires `addColumn`, `renameColumn`, `deleteColumn` from useBoardState to Board |
| `src/styles/column.css` | Modified | Added `.column-rename-input`, `.column-rename-form`, `.column-actions` styles |
| `src/styles/board.css` | Modified | Added `.add-column-btn`, `.add-column-form` styles |
| `tests/useBoardState.test.js` | Modified | Added ADD_COLUMN (3 tests), RENAME_COLUMN (4 tests), DELETE_COLUMN (4 tests) |
| `tests/ColumnHeader.test.jsx` | Created | 8 tests covering all states: view, rename, submit, cancel, delete confirm, confirm delete, cancel delete, non-empty blocked |
| `tests/Board.test.jsx` | Modified | Added 4 tests: Add Column button render, form submit, empty title reject, form cancel |

---

## Deviations from Design

None — implementation matches design exactly.

### Minor Notes
- **ColumnHeader rename UX**: The design spec says "click title enters rename mode" which differs slightly from Card's explicit "Edit" button. This is intentional per the spec requirement. However, the delete confirmation UI follows Card's "Delete?" + Yes/No pattern exactly.
- **onBlur behavior on rename input**: `onBlur` triggers `handleSubmitRename` (submits on focus loss), matching expected inline-edit behavior. If the title is empty on blur, it reverts without calling `onRename` (guarded by `if (newTitle.trim())`).
- **"Add Column" button position**: Rendered outside the `<DndContext>` wrapper (after columns in the `.board` flex container), so it doesn't interfere with drag-and-drop context.

---

## Issues Found

None.

---

## Remaining Tasks

None — all 19 tasks are complete.

---

## Workload / PR Boundary

- **Mode**: single PR
- **Current work unit**: column-management (full)
- **Boundary**: All 19 tasks from Phase 1–4
- **Estimated review budget impact**: ~350 lines (under 400-line budget)

---

## Status

✅ 19/19 tasks complete. **Ready for verify.**

## Final Verification

```bash
$ npm test
> test-kanban@1.0.0 test
> vitest run

 Test Files  5 passed (5)
      Tests  52 passed (52)
```

All 52 tests pass (29 original + 23 new).
