const Queue = require('./Queue');

// getSize
function getSize (chuck) {
    return JSON.stringify(chuck).length;
}

class MemoryCache {
    constructor() {
        this.memory = {};
        this.queue = new Queue();
        // Max size
        this.max = 30;
    }

    size () {
        // Simulation of get size;
        return getSize(this.memory);
    }

    cleanup (cleanupSize) {
        const key = this.queue.pop();

        this.delete(key);
        
        if (this.size() > (this.max - cleanupSize)) {
            this.cleanup(cleanupSize);
        }
    }

    put(key, value) {
        const valueSize = getSize(value);
        if ((this.size() + valueSize) >= this.max) {
            this.cleanup(valueSize);
        }
        this.queue.push(key);
        this.memory[key] = value;
    }

    get(key) {
        this.queue.push(key);
        return this.memory[key];
    }

    delete(key) {
        delete this.memory[key];
    }
}

module.exports = MemoryCache;