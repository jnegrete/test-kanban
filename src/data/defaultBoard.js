export const defaultBoard = {
  columns: {
    'todo': { id: 'todo', title: 'To Do', cardIds: [] },
    'in-progress': { id: 'in-progress', title: 'In Progress', cardIds: [] },
    'done': { id: 'done', title: 'Done', cardIds: [] },
  },
  cards: {},
  columnOrder: ['todo', 'in-progress', 'done'],
}
