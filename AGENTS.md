# Test Kanban — Agent Guide

React + Vite kanban board app with drag-and-drop, built following SDD (Spec-driven Development).

When working on this project, load the relevant skill(s) BEFORE writing any code.

## How to Use Skills

1. Check the trigger column in the [Skill Registry](.atl/skill-registry.md) to find skills that match your current task
2. Load the skill by reading the SKILL.md file at the listed path
3. Follow ALL patterns and rules from the loaded skill
4. Multiple skills can apply simultaneously

## Project

Kanban board with drag-and-drop cards persisted to localStorage.

- **Framework**: React 19 + Vite 8
- **Language**: JavaScript (JSX)
- **Drag-and-drop**: @dnd-kit (sortable)
- **Testing**: Vitest + Testing Library
- **Persistence**: localStorage

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm test` | Run all tests (vitest run) |
| `npm run test:watch` | Tests in watch mode |

## Project Structure

```
src/
├── components/     # Board, Column, Card, AddCardForm, EditCardForm
├── hooks/          # useBoardState, useLocalStorage
├── data/           # Default board data
├── styles/         # CSS files per component
├── App.jsx         # App shell
└── main.jsx        # Entry point
tests/              # Component and hook tests
sdd/                # SDD documentation (specs, designs, tasks)
```

## Code Style

- Functional components with hooks
- Colocate tests with source files
- CSS in separate files per component (not CSS-in-JS)
- No TypeScript — plain JSX

## SDD Workflow

SDD artifacts live under `sdd/<feature>/`:
- `proposal.md` — intent and scope
- `spec.md` — requirements and scenarios
- `design.md` — architecture decisions
- `tasks.md` — implementation plan

## GGA (Gentle Guardian Angel)

Code review rules are defined in this file. `.gga` configures the AI provider and file patterns for pre-commit review.

## Review Rules

- Write tests alongside implementation
- Follow existing component patterns before creating new ones
- Keep functions small and focused
- Maintain accessibility (keyboard navigation, ARIA labels on interactive elements)
