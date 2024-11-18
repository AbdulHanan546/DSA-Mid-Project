import React from 'react';
import Stockpile from './StockPile';
import Foundation from './Foundation';
import Pile from './Pile';
import "./Gameboard.css"
//This a gameBoard in which the tablue foundation and stockpiles are used
function GameBoard({ stockpile, foundation, tablue, onDrop ,onDragStart ,onDrawCard }) {
  if (!tablue) {
      return <div>Loading...</div>; 
  }

  return (
      <div className="game-board">
          <div className="top-row">
              <Stockpile stockpile={stockpile} onDragStart={onDragStart}  onDrawOneCard={onDrawCard}/>
              <Foundation foundation={foundation}  onDragStart={onDragStart} onDrop={onDrop}/>
          </div>
          <div className="tableau">
              {tablue.piles.toArray().map((pile, index) => (
                  <Pile 
                      key={index} 
                      cards={pile} 
                      pileIndex={index} 
                      pileType={"tablue"}
                      onCardMove={onDrop} 
                      onDragStart={onDragStart}
                  />  
              ))}
          </div>
      </div>
  );
}
export default GameBoard