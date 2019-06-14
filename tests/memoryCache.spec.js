const MemoryCache = require('../MemoryCache');
const assert = require('assert');

describe('MemoryCache', function() {
  describe('#put(...) sequence [a,b,c,d,e,f,g]', function() {
    const memoryCache = new MemoryCache();
    memoryCache.max = 43;
    
    memoryCache.put('a', 1);
    memoryCache.put('b', 2);
    memoryCache.put('c', 3);
    memoryCache.put('d', 4);
    memoryCache.put('e', 5);
    memoryCache.put('f', 6);
    memoryCache.put('g', 7);

    it('MemoryCache should contains all data ', function() {
        assert.equal(JSON.stringify(memoryCache.memory), '{"a":1,"b":2,"c":3,"d":4,"e":5,"f":6,"g":7}');
    });
  });
  
  describe('#put(...), #get("a"), #put("h") sequence [a,b,c,d,e,f,g,h]', function() {
    const memoryCache = new MemoryCache();
    memoryCache.max = 43;
    
    memoryCache.put('a', 1);
    memoryCache.put('b', 2);
    memoryCache.put('c', 3);
    memoryCache.put('d', 4);
    memoryCache.put('e', 5);
    memoryCache.put('f', 6);
    memoryCache.put('g', 7);
    memoryCache.get('a');
    memoryCache.put('h', 8);

    it('MemoryCache should remove "b" data as the least recently used', function() {
        assert.equal(JSON.stringify(memoryCache.memory), '{"a":1,"c":3,"d":4,"e":5,"f":6,"g":7,"h":8}');
    });
  });
});