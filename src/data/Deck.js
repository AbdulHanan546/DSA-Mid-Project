import Card from "./Card";
import { SUITS,RANKS } from "./constants";
class Deck{
     constructor(){
        this.cards = [];
        this.initializeDeck();
     }
     initializeDeck(){
        for (let suit of SUITS){
            for(let rank of RANKS){
                this.cards.push(new Card(suit,rank));
            }
        }

     }

     shuffle(){
        for (let i = this.cards.length-1;i>0;i--){
            const j = Math.floor(Math.random()* (i+1));
            [this.cards[i],this.cards[j]] = [this.cards[j],this.cards[i]];
        }
     }
     deal(){
        return this.cards.pop();
     }
    
}

export default Deck;