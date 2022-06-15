import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardProps{
    board:Board;
    setBoard:(board:Board)=>void
    currentPlayer:Player|null
    swapPlayer:()=>void
}

const BoardComponent:FC<BoardProps>=({board,setBoard,swapPlayer,currentPlayer})=>{
    const [selectedCell,setSeclectedCell]=useState<Cell|null>(null)

    const click=(cell:Cell)=>{
        if(selectedCell && selectedCell!==cell && selectedCell.figure?.canMove(cell)){
            selectedCell.moveFigure(cell)
            setSeclectedCell(null)
            swapPlayer()
        }else{
            if(cell.figure?.color==currentPlayer?.color){
                setSeclectedCell(cell)
            } 
        }
    }
    const highlightCells=()=>{
        board.highlightCells(selectedCell)
        updateBoard()
    }
    useEffect(()=>{
        highlightCells() 
    },[selectedCell])



    const updateBoard=()=>{
      const newBoard=board.getCopyBoard()
      setBoard(newBoard)  
    }

    return(
        <div>
            <h2>Current player: {currentPlayer?.color}</h2>
            <div className="board">
                {board.cells.map((row,index)=>
                    <React.Fragment key={index}>
                        {row.map(cell=>
                            <CellComponent 
                                key={cell.id}
                                cell={cell}
                                click={click}
                                selected={selectedCell===cell}/>    
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>

    )
}

export default BoardComponent;