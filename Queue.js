class Queue {
    constructor () {
        this.queue = {};
    }
    
    getLast () {
        return this.last;
    }

    getFirst () {
        return this.first;
    }

    get (key) {
        return this.queue[key];
    }

    push (key) {
        const record = {};

        if (this.queue[key]) {
            this.remove(key);
            this.push(key);
        }
        
        if (!this.first) {
            this.first = key;
        }

        if (!this.last) {
            this.last = key;
        } else {
            record.prev = this.last;
            this.queue[this.last].next = key;
            this.last = key; 
        }

        this.queue[key] = record;
    }

    remove (key) {
        if (key === this.last && key === this.first) {
            this.shift();
            delete this.first;
            delete this.last;
            return key;
        }

        if (key === this.last) {
            return this.shift();
        }

        if (key === this.first) {
            return this.pop();
        }

        const record = this.queue[key];
        if (!record) return;

        this.queue[record.prev].next = record.next;
        this.queue[record.next].prev = record.prev;
        delete this.queue[key];
    }

    pop () {
        const key = this.first;
        const record = this.queue[key];
        if (!record) return;

        delete this.queue[key];

        this.first = record.next;
        if (this.first) {
            delete this.queue[this.first].prev;
        }

        return key;
    }

    shift () {
        const key = this.last;
        const record = this.queue[key];
        if (!record) return;

        delete this.queue[key];

        this.last = record.prev;
        if (this.last) {
            delete this.queue[this.last].next;
        }

        return key;
    }
}

module.exports = Queue;