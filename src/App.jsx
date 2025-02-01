import { useState } from "react";

const TURNS = { //turnos
  X: 'x',
  O: 'o'
}

const Square = ({children, isSelected, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => { //la funcion handleClick ejecuta la funcion updateBoard
    updateBoard(index) // Llamamos a updateBoard pasando el índice
  }

  return(//clic en div ejecuta la funcion handleClick
    <div onClick={handleClick} className={className}> 
      {children}
    </div>
  );
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6], 
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]


function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );

  const [turn, setTurn] = useState(TURNS.X);
  
  const [winner, setWinner] = useState(null) //null no hay ganador, false un empate

const checkWinner = (boardToCheck) =>{
  //revision de combinaciones ganadoras 
  //para comprobar si x u o gano
  for (const combo of WINNER_COMBOS) {
    const [a,b,c] = combo
    if (
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[a] === boardToCheck[c] 
    ) {
      return boardToCheck[a]
    }
  }
    return null //si no hay ganador
}

  const updateBoard = (index) => {
    if(board[index]|| winner)return        // No actualizo posicion si ya tiene algo
    const newBoard = [...board];  // Hago copia del tablero actual
    newBoard[index] = turn;       // Establecimiento del turno actual en la posición del tablero 
    setBoard(newBoard);           // Actualizo el estado del tablero con la nueva copia
    //cambio turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; //cambiar el turno
    setTurn(newTurn);
    //reviso si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } //revisar si hay ganador
  }

  return (
    <main className="board">
      <h1>Tres en raya</h1>
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
      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Ganó' 
                }
              </h2>
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              <footer>
                
              </footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
