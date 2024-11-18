import Queue from "./Queue";

class Stockpile {
    constructor(deck) {
        this.cards = new Queue();
        deck.cards.forEach(card => this.cards.enqueue(card));
        this.drawnCards = [];
        this.currentDrawIndex = 0; 
    }

    drawOneCard() {
        if (this.cards.isEmpty() && this.drawnCards.length > 0) {
            this.recycleDrawnCards();
        }

        if (!this.cards.isEmpty()) {
            const drawnCard = this.cards.dequeue();
            drawnCard.faceUp=true;
            this.drawnCards.push(drawnCard);
            this.currentDrawIndex = this.drawnCards.length - 1; 
            return drawnCard;
        } else if (this.drawnCards.length > 0) {
            this.currentDrawIndex = (this.currentDrawIndex + 1) % this.drawnCards.length;
            const currentCard = this.drawnCards[this.currentDrawIndex];
            return currentCard;
        } else {
            return null;
        }
    }

    recycleDrawnCards() {
        this.drawnCards.forEach(card => {
            card.faceUp = true; 
            this.cards.enqueue(card);
        });
        this.drawnCards = [];
        this.currentDrawIndex = 0; 
    }
    

    moveCardToTablue(tablue, pileIndex) {
        if (this.drawnCards.length === 0) return false;
    
        const cardToMove = this.drawnCards[this.currentDrawIndex]; 

    
        if (tablue.canAddCard(pileIndex, cardToMove)) { 
            this.drawnCards.splice(this.currentDrawIndex, 1);
    
            const pile = tablue.piles.get(pileIndex);
            if (pile) {
                pile.push(cardToMove);
            }
    
            if (this.currentDrawIndex >= this.drawnCards.length) {
                this.currentDrawIndex = this.drawnCards.length - 1;
            }
    
            return true;
        }
        return false;
    }

    moveCardToFoundation(foundation) {
        if (this.drawnCards.length === 0) 
            return false;
    
        const cardToMove = this.drawnCards[this.currentDrawIndex];
        if (foundation.addCard(cardToMove)) {
            this.drawnCards.splice(this.currentDrawIndex, 1);
    
            if (this.currentDrawIndex >= this.drawnCards.length) {
                this.currentDrawIndex = this.drawnCards.length - 1;
            }
    
            return true;
        }
        return false;
    }
    
}

export default Stockpile;
