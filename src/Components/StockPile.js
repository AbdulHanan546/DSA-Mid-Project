import React from 'react';
import Card from './Card';
//This is to show the stockpile to the user so that he can draw cards according to the sockpile and only the first card is shown
function Stockpile({ stockpile, onDragStart, onDrawOneCard }) {
    const topCardIndex = stockpile.drawnCards.length - 1;

    return (
        <div className="stockpile">
            <button onClick={onDrawOneCard}>Draw Card</button>
            <div className="drawn-cards">
                {topCardIndex >= 0 && (
                    <Card
                        key={topCardIndex}
                        card={stockpile.drawnCards[topCardIndex]}
                        faceUp={true}
                        onDragStart={(event) => onDragStart(event, 'stockpile', topCardIndex)}
                        pileType="stockpile"
                        className="drawn-card drawn-card-top"
                    />
                )}
            </div>
        </div>
    );
}

export default Stockpile;
