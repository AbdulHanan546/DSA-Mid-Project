import Stack from "./Stack";
import LinkList from "./LinkList";  

class Tablue {
    constructor() {
        this.piles = new LinkList();
        this.cardTracker = {}
        for (let i = 0; i < 7; i++) {
            this.piles.add(new Stack());  
        }
    }

    initializeTablue(deck) {
        for (let i = 0; i < 7; i++) {
            const pile = this.piles.get(i);
            for (let j = 0; j <= i; j++) {
                const card = deck.deal();
                if (j === i) {
                    card.flip(); 
                }
                pile.push(card);  
                this.cardTracker[card.rank + " of " + card.suit] = {location: "Pile "  + i,
                    faceUp: card.faceUp
                }
            }
        }
        console.log(this.cardTracker)
    }
    updateCardTracker(card, newLocation) {
        const cardKey = card.rank + " of " + card.suit;
        if (this.cardTracker[cardKey]) {
            this.cardTracker[cardKey].location = newLocation;
            this.cardTracker[cardKey].faceUp = card.faceUp;
        }
    }
    

    canAddCard(toPileIndex, cardToAdd) {
        const toPile = this.piles.get(toPileIndex);
        const destinationCard = toPile.top();

        if (!destinationCard) {
            return cardToAdd.rank === "King";
        }

        const difference = this.rankDifference(destinationCard, cardToAdd);
        return destinationCard.color !== cardToAdd.color && difference === 1;
    }
    rankDifference(card1,card2){
        const rankOrder = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"]
        const rank1 = rankOrder.indexOf(card1.rank)
        const rank2 = rankOrder.indexOf(card2.rank)
        return rank1 - rank2
    }

  
    moveCards(fromPileIndex, toPileIndex, cardIndex) {
        const fromPile = this.piles.get(fromPileIndex);
        const toPile = this.piles.get(toPileIndex);
    
        
        const cardsToMove = fromPile.getCardsFromIndex(cardIndex);
        if (cardsToMove.length === 0) {
           
            return false;
        }
    
        const topCard = cardsToMove[0];
        if (!this.canAddCard(toPileIndex, topCard)) {
           
            return false;
        }
    
        if (cardsToMove.length === 1) {

            const singleCard = fromPile.pop();
            toPile.push(singleCard);
            this.updateCardTracker(singleCard, "Pile "+toPileIndex);
          
        } else {
            const removedCards = fromPile.popMultiple(cardsToMove.length).reverse();
            removedCards.forEach(card => {
                toPile.push(card);
                this.updateCardTracker(card,"Pile "+toPileIndex);
            });
        }
    
        const newTopCard = fromPile.top();
        if (newTopCard && !newTopCard.faceUp) {
            newTopCard.flip();
           
        }
    
       
        return true;
    }
    

    

   
    moveCardToFoundation(fromPileIndex, foundation) {
        const fromPile = this.piles.get(fromPileIndex);
        const cardToMove = fromPile.top();
    
        // Check if a card is available to move and if the foundation allows adding it
        if (cardToMove && foundation.addCard(cardToMove)) {
            fromPile.pop();
    
            // Flip the next card in the pile if it's face-down
            const newTopCard = fromPile.top();
            if (newTopCard && !newTopCard.faceUp) {
                newTopCard.flip();
            }
    
            
            return true;
        } else {
          
            return false;
        }
    }
    
}

export default Tablue;
