import { useState, useEffect } from 'react'
import '../styles/style.css'

const Game = () => {
  const [game, setGame] = useState(new Array(9).fill(''))
  const [turn, setTurn] = useState(0)
  const [error, setError] = useState(false)
  const [outcome, setOutcome] = useState(false)

  useEffect(() => setOutcome(checkGame(game)))

  const checkGame = (game) => {
    const winningStates = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ]

    if (winningStates.some(state => state.every(piece => game[piece] === 'X'))) return 'X'
    if (winningStates.some(state => state.every(piece => game[piece] === 'O'))) return 'O'
    if (game.every(piece => piece !== '')) return 'Tie'

    return false
  }

  const onClick = e => {
    if (outcome === 'X' || outcome === 'O') return

    const type = turn === 0 ? 'X' : 'O'

    if (game[e.target.id[1]] !== '') {
      setError(true)
    } else {    
      setGame(game.map((piece, i) => e.target.id[1] == i ? type : piece))
      setTurn(turn === 0 ? 1 : 0)
      setError(false)
    } 
  }

  const onReset = () => {
    setGame(new Array(9).fill(''))
    setTurn(0)
    setError(false)
    setOutcome(false)
  }

  return (
    <div>

      It is currently {turn === 0 ? 'X' : 'O'}'s turn.
      <div id="error" style={{ visibility: error ? 'visible' : 'hidden' }}>You cannot select a piece that is already taken</div>
      <div id="winner" style={{ visibility: outcome === 'X' || outcome === 'O' ? 'visible' : 'hidden' }}>Winner is {outcome}</div>
      <div className="container">
        {
          game.map((piece, i) =>
            <div className="item" id={'a' + i} key={i} onClick={onClick}>
              {piece ? <div>{piece}</div> : <div style={{ height: 28 }} />}
            </div>)
        }
        
      </div>

      <div style={{ visibility: outcome === 'Tie' ? 'visible' : 'hidden' }}>The outcome is {outcome}</div>
      <button onClick={onReset}>Reset button</button>
    </div>
  )
}

export default Game