class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  
  class Stack {
    constructor() {
      this.head = null;
    }
  
    isEmpty() {
      return this.head === null;
    }
  
    push(data) {
      let newNode = new Node(data);
      newNode.next = this.head;
      this.head = newNode;
    }
  
    pop() {
      if (this.isEmpty()) {
        return null;
      }
      let temp = this.head;
      this.head = this.head.next;
      return temp.data;
    }
  
    top() {
      if (this.isEmpty()) {
        return null;
      }
      return this.head.data;
    }
  
    displayStack() {
      let current = this.head;
      while (current !== null) {
        console.log(current.data);
        current = current.next;
      }
    }
  
    getSize() {
      if (this.head == null) return 0;
      let current = this.head;
      let count = 0;
      while (current != null) {
        current = current.next;
        count++;
      }
      return count;
    }
  
    getCardsFromIndex(index) {
        let current = this.head;
        const cards = [];              
        let currentIndex = 0;    
        while (current !== null && currentIndex <= index) {
            cards.push(current.data);
            current = current.next;
            currentIndex++;
        }    
        return cards.slice(0, index + 1).reverse();
    }
    popMultiple(count) {
        const removedCards = [];
        while (count > 0 && !this.isEmpty()) {
          removedCards.push(this.pop());
          count--;
        }
        return removedCards;
      }
    
  }
  
  export default Stack;
  