class Stack {
    constructor(maxSize = 10) {
        if (!new.target) {
            return new Stack(maxSize = 10);
        } else {
            this.elements = new Array(maxSize);
            this.maxSize = maxSize;
            this.length = 0;
        }
    }
    isFull() {
        return this.length == this.maxSize;
    }
    isEmpty() {
        return this.length == 0;
    }
    push(element) {
        if ( this.isFull() ) {
            return false;
        }
        this.elements[this.length++] = element;
    }
    pop() {
        if ( this.isEmpty() ) {
            return false;
        }
        let temp = this.elements[this.length - 1];
        delete this.elements[this.length - 1];
        this.length--;
        return temp;
    }
    top() {
        if ( this.isEmpty() ) {
            return false;
        }
        return this.elements[this.length - 1];
    }
    clear() {
        this.elements.forEach( function (item, index, array) {
            delete array[index];
        });
        this.length = 0;
    }
    insertAtBottom(element) {
        if ( this.isEmpty() ) {
            this.push(element);
        }
        else {
            let temp = this.pop();
            this.insertAtBottom(element);
            this.push(temp);
        }
    }
    reverse() {
        if ( !this.isEmpty() ) {
            let temp = this.pop();
            this.reverse();
            this.insertAtBottom(temp);
        }
    }
    sortInsert(element) {
        if ( this.isEmpty() || element >= this.top() ) {
            this.push(element);
        } else {
            let temp = this.pop();
            this.sortInsert(element);
            this.push(temp);
        }
    }
    sort() {
        if ( !this.isEmpty() ) {
            let temp = this.pop();
            this.sort();
            this.sortInsert(temp);
        }
    }
}