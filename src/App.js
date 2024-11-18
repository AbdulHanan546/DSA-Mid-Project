import React, { useState, useEffect } from 'react';
import GameBoard from './Components/GameBoard';
import Deck from './data/Deck';
import Tablue from './data/Tablue';
import Foundation from './data/Foundation';
import Stockpile from './data/Stockpile';
import Modal from './Components/Modal'; // Import the Modal component
import './App.css';

function App() {
    const [deck, setDeck] = useState(null);
    const [stockpile, setStockpile] = useState(null);
    const [tablue, setTablue] = useState(null);
    const [foundation, setFoundation] = useState(null);
    const [draggedCard, setDraggedCard] = useState(null);
    const [renderKey, setRenderKey] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isGameComplete, setIsGameComplete] = useState(false);
    const [score, setScore] = useState(0);
    const [modalMessage, setModalMessage] = useState(null);
    const [modalType, setModalType] = useState("info");
   


    // Timer logic
    useEffect(() => {
        let timerInterval;
        if (!isGameComplete) {
            timerInterval = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds + 1);
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [isGameComplete]);

    // Automatically start the game and timer on page load
    useEffect(() => {
        initializeGame();
    }, []);

    const initializeGame = () => {
        const newDeck = new Deck();
        newDeck.shuffle();
        const newTablue = new Tablue();
        newTablue.initializeTablue(newDeck);
        const newFoundation = new Foundation();
        const newStockpile = new Stockpile(newDeck);

        setDeck(newDeck);
        setTablue(newTablue);
        setFoundation(newFoundation);
        setStockpile(newStockpile);

        setSeconds(0);
        setIsGameComplete(false);
        setScore(0);
        setModalMessage(null); 
    };

  

    const handleDrawOneCard = () => {
        if (stockpile) {
            if (stockpile.cards.length === 0 && stockpile.drawnCards.length > 0) {
                stockpile.recycleDrawnCards();
            }

            const newCard = stockpile.drawOneCard();

            if (newCard) {
                setRenderKey(renderKey + 1);
            } else if (stockpile.cards.length === 0 && stockpile.drawnCards.length === 0) {
                showModal("No more cards to draw!", "error");
            }
        }
    };

    const showModal = (message, type) => {
        setModalMessage(message);
        setModalType(type);

        setTimeout(() => {
            setModalMessage(null);
            setModalType("info");
        }, 3000);
    };

    const onDrop = (event, targetPileIndex, targetPileType) => {
        if (draggedCard) {
            const { pileType, pileIndex, cardIndex } = draggedCard;

            let isMoveValid = false;

            if (targetPileType === 'foundation') {
                const targetSuit = targetPileIndex;

                if (pileType === 'stockpile') {
                    isMoveValid = stockpile.moveCardToFoundation(foundation);
                } else if (pileType === 'tablue') {
                    isMoveValid = tablue.moveCardToFoundation(pileIndex, foundation);
                }

                if (isMoveValid) {
                    setScore(prevScore => prevScore + 10);
                }
            } else if (targetPileType === 'tablue') {
                if (pileType === 'stockpile') {
                    isMoveValid = stockpile.moveCardToTablue(tablue, targetPileIndex);
                } else if (pileType === 'tablue') {
                    isMoveValid = tablue.moveCards(pileIndex, targetPileIndex, cardIndex);
                }
            }

            if (!isMoveValid) {
                showModal("Invalid move! Please check the card rules.", "error");
            } else {
              

                setRenderKey(renderKey + 1);

                if (targetPileType === 'foundation' && foundation.isGameComplete()) {
                    setIsGameComplete(true);
                    showModal(`Congratulations! You've completed the game in ${formatTime(seconds)} with a score of ${score}.`, "info");
                }
            }

            setDraggedCard(null);
        }
    };

    
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);

    };

    return (
        <div className="App">
            <header className="header">
                <span className="timer">Time: {formatTime(seconds)}</span>
                <h1 className="title">Solitaire Game</h1>
                <span className="score">Score: {score}</span>
            </header>
            {modalMessage && <Modal message={modalMessage} onClose={() => setModalMessage(null)} type={modalType} />}
            <GameBoard
                stockpile={stockpile}
                foundation={foundation}
                tablue={tablue}
                onDragStart={(event, pileType, pileIndex, cardIndex) =>
                    setDraggedCard({ pileType, pileIndex, cardIndex })
                }
                onDrop={onDrop}
                onDrawCard={handleDrawOneCard}
                renderKey={renderKey}
            />
        </div>
    );
}

export default App;
