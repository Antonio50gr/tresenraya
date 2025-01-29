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

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  );

  const [turn, setTurn] = useState(TURNS.X);
  
  const [winner, setWinner] = useState(null) //null no hay ganador, false un empate

  const updateBoard = (index) => {
    if(board[index])return        // No actualizo posicion si ya tiene algo
    const newBoard = [...board];  // Hago copia del tablero actual
    newBoard[index] = turn;       // Establecimiento del turno actual en la posición del tablero 
    setBoard(newBoard);           // Actualizo el estado del tablero con la nueva copia

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X; //cambiar el turno
    setTurn(newTurn);
  };

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
    </main>
  );
}

export default App;
