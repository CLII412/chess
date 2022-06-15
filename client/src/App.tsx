import { useEffect, useState } from 'react';
import './App.css';
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Player } from './models/Player';

function App() {
  const [board,setBoard]=useState(new Board())
  const [blackPlayer,setBlackPlayer]=useState(new Player(Colors.BLACK))
  const [whitePlayer,setWhitePlayer]=useState(new Player(Colors.WHITE))
  const [currentPlayer,setCurrentPlayer]=useState<Player|null>(null)

  useEffect(()=>{
    restart()
    setCurrentPlayer(whitePlayer)
  },[])

  const swapPlayer=()=>{
    setCurrentPlayer(currentPlayer?.color===Colors.WHITE?blackPlayer:whitePlayer)
  }


  const restart=()=>{
    const newBoard=new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  return (
    <div className="App">
      <LostFigures title={"Lost White Figures:"} figures={board.listLostWhiteFigure}/>
      <BoardComponent 
      board={board}
      setBoard={setBoard}
      currentPlayer={currentPlayer}
      swapPlayer={swapPlayer}
      />
      <LostFigures title={"Lost Black Figures:"} figures={board.listLostBlackFigure}/>
    </div>
  );
}

export default App;
