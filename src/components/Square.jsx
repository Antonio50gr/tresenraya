export const Square = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`;
  
    const handleClick = () => { //la funcion handleClick ejecuta la funcion updateBoard
      updateBoard(index) // Llamamos a updateBoard pasando el índice
    }
  
    return(//clic en div ejecuta la funcion handleClick
      <div onClick={handleClick} className={className}> 
        {children}
      </div>
    )
  }