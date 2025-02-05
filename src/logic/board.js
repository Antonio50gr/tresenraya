import { WINNER_COMBOS } from "../components/constants.js";
export const checkWinner = (boardToCheck) =>{
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

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}