class Card{
    constructor(suit,rank,faceUp=false){
        this.rank = rank;
        this.suit = suit;
        this.faceUp = faceUp;
        this.color =  this.suit === 'Heart' || this.suit === 'Diamond' ? 'red': 'black'
    }
    flip() {
        this.faceUp = !this.faceUp;
    }
   
}
export default Card;