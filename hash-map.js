function HashMap() {
  const _loadFactor = 0.75;
  let _buckets = [];
  let _keys = [];
  let _size = 16;
  // convert a key and return a number between 0 and _size (for index), O(n) based on key
  function _hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % _size;
    }
    return hashCode;
  }

  // an array of undefined
  function _getBucket(key, buckets = _buckets) {
    return buckets[_hash(key)];
  }

  function get(key) {
    const bucket = _buckets[_hash(key)];
    const index = bucket?.findIndex((element) => element.key === key);
    if (bucket === undefined || index < 0) return null;
    return bucket[index].value;
  }

  function set(key, value) {
    const load = _size * _loadFactor;
    if (length() === load) {
      _size *= 2;
      const keyValuePairs = entries();
      const newBuckets = [];
      for (let i = 0; i < keyValuePairs.length; i++) {
        const [k, v] = keyValuePairs[i];
        const hashCode = _hash(k);
        const bucket = newBuckets[hashCode];
        if (bucket === undefined) newBuckets[hashCode] = [{ key: k, value: v }];
        else newBuckets[hashCode].push({ key: k, value: v });
      }
      _buckets = newBuckets;
      // update _buckets but keep _key the same
    }

    const bucket = _getBucket(key);
    const index = bucket?.findIndex((element) => element.key === key);
    // bucket is an array, key existed, overwrite
    if (bucket !== undefined && index > -1) {
      bucket[index].value = value;
      return false; // for overwrite
    }

    // bucket is undefined, create array, add key-value
    if (bucket === undefined) {
      _buckets[_hash(key)] = [{ key, value }];
    }

    // bucket is array, key not existed, add key-value
    else {
      bucket.push({ key, value });
    }
    // store key
    _keys.push(key);
    return true; // for add new
  }
  function has(key) {
    return _keys.indexOf(key) > -1;
  }
  function remove(key) {
    if (!has(key)) return false; // fail
    _buckets[_hash(key)] = _getBucket(key).filter((element) => element.key !== key);
    _keys = _keys.filter((k) => k !== key);
    return true; // success
  }
  function length() {
    return _keys.length;
  }

  function clear() {
    _keys = [];
    _buckets = [];
  }
  function keys() {
    return _keys;
  }
  function values() {
    let results = [];
    for (let i = 0; i < _size; i++) {
      const currentBucket = _buckets[i];
      if (!currentBucket) continue;
      results = [...results, ...currentBucket.reduce((total, current) => [...total, current.value], [])];
    }
    return results;
  }
  function entries() {
    // [[firstKey, firstValue], [secondKey, secondValue]]
    let results = [];
    for (let i = 0; i < _size; i++) {
      const currentBucket = _buckets[i];
      if (!currentBucket) continue;
      results = [...results, ...currentBucket.reduce((total, current) => [...total, [current.key, current.value]], [])];
    }
    return results;
  }
  return { get, set, has, remove, length, clear, keys, values, entries };
}

const hash = HashMap();
hash.set('a', 'this is a');
hash.set('b', 'this is b');
hash.set('c', 'this is c');
hash.set('d', 'this is d');
hash.set('e', 'this is e');
hash.set('f', 'this is f');
hash.set('g', 'this is g');
hash.set('h', 'this is h');
hash.set('i', 'this is i');
hash.set('l', 'this is l');
hash.set('m', 'this is m');

hash.length();
hash.values();
hash.entries();
