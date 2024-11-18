class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}
class Queue{
    constructor(){
        this.front = null;
        this.rear = null;
    }
    isEmpty(){
        return this.front === null;
    }
    enqueue(data){
        let newNode = new Node(data);
        if(this.isEmpty()){
            this.front = newNode;
            this.rear = newNode;
            }
        else{
            this.rear.next = newNode;
            this.rear = newNode;
        }    
    }
    dequeue(){
        if(this.isEmpty()){
            return null;
            }
            
                let temp = this.front;
                this.front = this.front.next;
                if(this.front === null){
                    this.rear = null;
                    }
                  return  temp.data;

             
    }
    top(){
        if (this.isEmpty()){
            return null;
            }

        return this.front.data;
    }
  
}

export default Queue