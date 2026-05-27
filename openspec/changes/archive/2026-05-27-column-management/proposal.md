# Proposal: Column Management

## Intent

Columns are hardcoded — users can't adapt the board to their workflow. They need to add, rename, and delete columns to match their process stages.

## Scope

### In Scope
- Add column via "Add Column" button at end of board
- Inline rename column title (click → edit → confirm/blur)
- Delete empty column with confirmation
- Block deletion of non-empty column ("Move cards first")
- Extract ColumnHeader component from Column

### Out of Scope
- Reorder columns via drag-and-drop
- Column color/label customization
- Archive/hide columns without deleting
- Undo column operations

## Capabilities

### New Capabilities
- `column-management`: Create, rename, delete board columns with validation guards

### Modified Capabilities
- None

## Approach

Extend `boardReducer` with `ADD_COLUMN`, `RENAME_COLUMN`, `DELETE_COLUMN`. Extract `ColumnHeader.jsx` from `Column.jsx` for rename inline form + delete button. Wire new callbacks through `useBoardState` → `App.jsx` → `Board.jsx`. Board renders "Add Column" after last column. Persistence via existing `persistDispatch`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/hooks/useBoardState.js` | Modified | 3 new reducer cases + memoized callbacks |
| `src/App.jsx` | Modified | Pass new callbacks to Board |
| `src/components/Board.jsx` | Modified | "Add Column" UI, props plumbing |
| `src/components/Column.jsx` | Modified | Delegate header to ColumnHeader |
| `src/components/ColumnHeader.jsx` | **New** | Rename inline form, delete with guard |
| `src/styles/board.css` | Modified | Add-column button styles |
| `src/styles/column.css` | Modified | Rename input, delete confirmation |
| `tests/useBoardState.test.js` | Modified | 3 new reducer action tests |
| `tests/Board.test.jsx` | Modified | Column management UI integration tests |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Delete last column breaks board | Low | Allowed if empty; guard handles empty columnOrder |
| Rename to empty title breaks layout | Low | Reject empty/whitespace (same pattern as card title) |

## Rollback Plan

Revert all column-management commits. No existing specs changed — baseline restores cleanly.

## Dependencies

- None

## Success Criteria

- [ ] `npm test` passes with all existing + new tests green
- [ ] Add column → appears at end of columnOrder with generateId()
- [ ] Click title → inline edit → blur/enter saves rename
- [ ] Delete empty column → removed from state and DOM
- [ ] Delete non-empty column → shows "Move cards first", no state change
- [ ] Empty title rename rejected (no mutation)
