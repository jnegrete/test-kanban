import { useReducer } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import { boardReducer, useBoardState } from './hooks/useBoardState'
import { defaultBoard } from './data/defaultBoard'
import Board from './components/Board'

export default function App() {
  const [board, setBoard] = useLocalStorage(defaultBoard)
  const [state, dispatch] = useReducer(boardReducer, board)

  const persistDispatch = (action) => {
    const nextState = boardReducer(state, action)
    dispatch(action)
    setBoard(nextState)
  }

  const actions = useBoardState(state, persistDispatch)

  return (
    <Board
      state={state}
      onAddCard={actions.addCard}
      onEditCard={actions.editCard}
      onDeleteCard={actions.deleteCard}
      onMoveCard={actions.moveCard}
      onAddColumn={actions.addColumn}
      onRenameColumn={actions.renameColumn}
      onDeleteColumn={actions.deleteColumn}
    />
  )
}
