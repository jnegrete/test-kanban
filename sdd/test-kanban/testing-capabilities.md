## Testing Capabilities

**Strict TDD Mode**: enabled
**Detected**: 2026-05-27

### Test Runner

- Command: `npm test` (vitest run)
- Framework: Vitest 4

### Test Layers

| Layer       | Available | Tool                        |
| ----------- | --------- | --------------------------- |
| Unit        | ✅        | vitest (native describe/it) |
| Integration | ✅        | @testing-library/react 16   |
| E2E         | ❌        | —                           |

### Coverage

- Available: ❌
- Command: `npx vitest --coverage` (requires @vitest/coverage-v8)

### Quality Tools

| Tool         | Available | Command          |
| ------------ | --------- | ---------------- |
| Linter       | ❌        | —                |
| Type checker | ❌        | —                |
| Formatter    | ❌        | —                |

### Setup

- Environment: jsdom via vite.config.js `test.environment`
- Globals: enabled via vite.config.js `test.globals`
- Setup file: `tests/setup.js` (imports @testing-library/jest-dom)

### Test Patterns Found

- Pure function tests with vitest describe/it/expect
- Reducer tests (addCard, editCard, deleteCard, moveCard)
- Component render tests using @testing-library/react
- localStorage mock tests
- No snapshot testing detected
