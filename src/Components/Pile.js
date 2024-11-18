import React from 'react';
import Card from './Card';
//This a pile component that is used to show the pile to the user in the gameboard 7 piles are used
function Pile({ cards, pileIndex, pileType, onCardMove, onDragStart }) {
    const renderedCards = [];
    let current = cards.head;

    while (current) {
        renderedCards.push(current.data);
        current = current.next;
    }

    const reversedCards = renderedCards.reverse();

    const emptyPileStyle = {
        width: "80px", 
        height: "120px", 
        border: "2px dashed #ccc",
        borderRadius: "4px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        
    };

    return (
        <div
            className="pile"
            onDrop={(e) => onCardMove(e, pileIndex, "tablue")}
            onDragOver={(e) => e.preventDefault()}
        >
            {reversedCards.length > 0 ? (
                reversedCards.map((card, index) => {
                    const adjustedIndex = reversedCards.length - 1 - index;

                    return (
                        <Card
                            key={adjustedIndex}
                            card={card}
                            faceUp={card.faceUp}
                            pileType={pileType}
                            onDragStart={(event) =>
                                onDragStart(event, pileType, pileIndex, adjustedIndex)
                            }
                        />
                    );
                })
            ) : (
                <div style={emptyPileStyle}>
                </div>
            )}
        </div>
    );
}

export default Pile;
