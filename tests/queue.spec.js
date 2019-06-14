const Queue = require('../Queue');
const assert = require('assert');

describe('Queue', function() {
  describe('#push("a") [a]', function() {
    const queue = new Queue();
    queue.push("a");
    
    it('first key should be equal "a"', function() {
        assert.equal(queue.getFirst(), "a");
    });
    it('last key should be equal "a"', function() {
        assert.equal(queue.getLast(), "a");
    });
  });
  
  describe('#push("b") [a -> b]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.push("b");

    it('first key should be equal "a"', function() {
        assert.equal(queue.getFirst(), "a");
    });
    it('last key should be equal "b"', function() {
        assert.equal(queue.getLast(), "b");
    });
  });
  
  describe('#push("c") [a -> b -> c]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.push("b");
    queue.push("c");
    const b = queue.get("b");

    it('first key should be equal "a"', function() {
        assert.equal(queue.getFirst(), "a");
    });
    it('"b" next key should be equal "c"', function() {
        assert.equal(b.next, "c");
    });
    it('"b" previous key should be equal "a"', function() {
        assert.equal(b.prev, "a");
    });
    it('last key should be equal "c"', function() {
        assert.equal(queue.getLast(), "c");
    });
  });
  
  describe('#remove("a") [a]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.remove("a");

    it('"a" should be undefined', function() {
        assert.equal(queue.get("a"), undefined);
    });
    it('first key should be equal undefined', function() {
        assert.equal(queue.getFirst(), undefined);
    });
    it('last key should be equal undefined', function() {
        assert.equal(queue.getLast(), undefined);
    });
  });
  
  describe('#remove("b") [a -> b]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.push("b");
    queue.remove("b");

    it('"b" should be undefined', function() {
        assert.equal(queue.get("b"), undefined);
    });
    it('first key should be equal "a"', function() {
        assert.equal(queue.getFirst(), "a");
    });
    it('last key should be equal "a"', function() {
        assert.equal(queue.getLast(), "a");
    });
  });
  
  describe('#remove("b") [a -> b -> c]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.push("b");
    queue.push("c");
    queue.remove("b");

    it('"b" should be undefined', function() {
        assert.equal(queue.get("b"), undefined);
    });
    it('first key should be equal "a"', function() {
        assert.equal(queue.getFirst(), "a");
    });
    it('"a" next key should be equal "c"', function() {
        assert.equal(queue.get("a").next, "c");
    });
    it('"c" previous key should be equal "a"', function() {
        assert.equal(queue.get("c").prev, "a");
    });
    it('"c" should be the last key', function() {
        assert.equal(queue.getLast(), "c");
    });
  });
  
  describe('#pop() [a -> b -> c]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.push("b");
    queue.push("c");
    const key = queue.pop();

    it('"a" should be undefined', function() {
        assert.equal(queue.get("a"), undefined);
    });
    it('first key should be equal "b"', function() {
        assert.equal(queue.getFirst(), "b");
    });
    it('pop key should be equal "a"', function() {
        assert.equal(key, "a");
    });
    it('"b" previous key should be undefined', function() {
        assert.equal(queue.get("b").prev, undefined);
    });
    it('"b" next key should be "c"', function() {
        assert.equal(queue.get("b").next, "c");
    });
    it('"c" previous key should be "b"', function() {
        assert.equal(queue.get("c").prev, "b");
    });
    it('"c" should be the last key', function() {
        assert.equal(queue.getLast(), "c");
    });
  });
  
  describe('#shift() [a -> b -> c]', function() {
    const queue = new Queue();
    queue.push("a");
    queue.push("b");
    queue.push("c");
    const key = queue.shift();

    it('"c" should be undefined', function() {
        assert.equal(queue.get("c"), undefined);
    });
    it('first key should be equal "a"', function() {
        assert.equal(queue.getFirst(), "a");
    });
    it('shift key should be equal "c"', function() {
        assert.equal(key, "c");
    });
    it('"b" next key should be undefined', function() {
        assert.equal(queue.get("b").next, undefined);
    });
    it('"a" next key should be "b"', function() {
        assert.equal(queue.get("a").next, "b");
    });
    it('"b" previous key should be "a"', function() {
        assert.equal(queue.get("b").prev, "a");
    });
    it('"b" should be the last key', function() {
        assert.equal(queue.getLast(), "b");
    });
  });
});