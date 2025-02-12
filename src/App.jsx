import { useState } from "react";
import confetti from 'canvas-confetti';  // Importo la librería
import { Square } from "./components/Square.jsx";
import { TURNS } from "./components/constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js";


function App() {
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage) 
      return (Array(9).fill(null))
  })

  const [turn, setTurn] = useState(() => {
    const turnFormStorage = window.localStorage.getItem('turn')
    return turnFormStorage ?? TURNS.X
  })
  
  const [winner, setWinner] = useState(null) //null no hay ganador, false un empate

  const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)

  resetGameStorage()
  }

  const updateBoard = (index) => {
    if(board[index]|| winner)return        // No actualizo posicion si ya tiene algo
    const newBoard = [...board];  // Hago copia del tablero actual
    newBoard[index] = turn;       // Establecimiento del turno actual en la posición del tablero 
    setBoard(newBoard);           // Actualizo el estado del tablero con la nueva copia
    //cambio turno
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; //cambiar el turno
    setTurn(newTurn);
    //guardar la partida
    saveGameToStorage({
      board:newBoard,
      turn: newTurn})
    //reviso si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) { //revisamos tablero y no vemos ganador
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tres en raya</h1>
      <button onClick={resetGame}>Reinicio del juego </button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  );
}

export default App;
