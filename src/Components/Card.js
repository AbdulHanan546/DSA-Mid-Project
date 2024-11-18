import React from 'react';
//This is a frontend Component for the Card represented by image
function Card({ card, faceUp, onDragStart, pileType }) {
  const cardImage = faceUp && card
  ? "/images/" + card.rank + "_of_" + card.suit + ".png"
  : "/images/back.png";

    return (
        <div
            draggable={faceUp && card} 
            onDragStart={(event) => onDragStart(event, pileType)}
            className="card"
        >
            <img src={cardImage} alt={card ? `${card.rank} of ${card.suit}` : 'Empty Foundation'} className={`card-image ${faceUp ? 'face-up' : 'face-down'}`} style={{ width: 60, height: 60 }} />
        </div>
    );
}

export default Card;
