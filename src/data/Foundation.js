import Stack from "./Stack"
class Foundation{
    constructor(){
        this.piles={
            Heart: new Stack(),
            Diamond: new Stack(),
            Clubs: new Stack(),  
            Spades : new Stack()
        }       
        this.cardTracker = {}
    }
    addCard(Card){
        const pile = this.piles[Card.suit]
        if (this.isValidMove(Card)){
            pile.push(Card)
            
            this.cardTracker[Card.rank + " of "+ Card.suit]= {location: "foundation " + Card.suit,
                faceUp : Card.faceUp
            }
            return true
        }
        return false
    }
    isValidMove(Card) {
        const pile = this.piles[Card.suit];
        if (pile.getSize() === 0) {
            return Card.rank === 'Ace';
        }
        const topCard = pile.top();  
        return this.isNextInSequence(topCard, Card);
    }
    
    isNextInSequence(topCard,Card){
        const rankOrder = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
        const topCardIndex = rankOrder.indexOf(topCard.rank)
        const cardIndex = rankOrder.indexOf(Card.rank)
        return cardIndex === topCardIndex + 1
    

    }

    isGameComplete(){
        for (let suit in this.piles) {
           const pile = this.piles[suit]
           if (pile.getSize() !== 13) {
            return false
           }
                }
                return true
    }
    
    }

export default Foundation