/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (!n) {
    	return array[0];
    }
   return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    }
    else if (n > array.length) {
    	return array;

    }
   return array.slice(Math.max(array.length - n));
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var i in collection) {
      iterator(collection[i], i, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i;
        }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test ('iterator' function argument)
  _.filter = function(collection, iterator) {
    var pass = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i]) === true && collection[i] !== 0) {
        pass.push(collection[i]);
      }
    }
    return pass;
  };

  // Return all elements of an array that don't pass a truth test (the 'iterator' function argument)
  _.reject = function(collection, iterator) {
    var pass = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i]) === false && collection[i] !== 0) {
        pass.push(collection[i]);
      }
    }
    return pass;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    array.sort();
    for (var i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        array.splice([i], 1);
        i--;
      }

    }
    return array;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
          var newArray = [];
          var x;
          for (var i = 0; i < array.length; i++) {
              array[i] = iterator(array[i]);
              // x = iterator(array[i]);
              // 	newArray.push(x);
          }
          return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
      return array.map(function(item) { return item[propertyName]; });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    for (var i = 0, item; i < list.length; i++) {
      item = list[i];
      if (typeof(methodName) === "string") {
        item[methodName](args);
      } else {
        methodName.call(item, args);
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue === undefined) {
    	initialValue = 0;
    }
  	for (var i in collection) {
  		initialValue = iterator(collection[i], initialValue);
  	}
  	return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var i in collection) {
      if (collection[i] === target) {
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (!iterator) {
  		iterator = Boolean;
  	}
  	for (var i = 0; i < collection.length; i++) {
  		if (!iterator(collection[i])) {
  			return false;
  		}
  	}
  	return true;
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (!iterator) {
  		iterator = Boolean;
  	}
  	for (var i = 0; i < collection.length; i++) {
  		if (iterator(collection[i])) {
  			return true;
  		}
  	}
  	return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
      var objectList = [];
      for (var i = 1; i < arguments.length; i++) {
        objectList.push(arguments[i]);
      }
      objectList.forEach(function(currentObj) {
        for (var k in currentObj) {
          obj[k] = currentObj[k];
        }
      });
      return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var objectList = [];
    for (var i = 1; i < arguments.length; i++) {
      objectList.push(arguments[i]);
    }
    objectList.forEach(function(currentObj) {
      for (var k in currentObj) {
        if (!obj.hasOwnProperty(k)){
          obj[k] = currentObj[k];
        }
      }
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var invoked = false;
    var value;
    return function() {
      if (invoked) {
        return value;
      }
      else {
        invoked = true;
        return value = func();
      }
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var result = {};
    return function(arg) {
      if (result[arg]) {
        return result[arg];
      }
      else {
        return result[arg] = func(arg);
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var argsList = [];
    for (var i = 2; i < arguments.length; i++) {
      argsList.push(arguments[i]);
      }
    return setTimeout(function() {
      func.apply(null, argsList);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var i = array.length, temp, rando, newArray = [];
    while (--i > 0) {
      rando = Math.floor(Math.random() * (i+10));
      temp = array[rando];
      array[rando] = array[i];
      array[i] = temp;
    }
    return newArray;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof(iterator) === 'string') {
      var tArg = iterator;
      iterator = function(obj) {
        return obj[tArg];
      };
    }
    //If iterator is a string, assign that string as an object that the new iterator
    //function will then look for in the collection

    var unSortable = [];

    function sorter() {
      var sortFlag = false;

      for (var i = 0; i < collection.length-1; i++) {

        if (iterator(collection[i]) === undefined) {
          unSortable.push(collection[i]);
          collection.splice(i, 1);
        }
        else if ((iterator(collection[i])) <= iterator(collection[i+1])) {
          continue;
        }
        else {
          sortFlag = true;
          var store = collection[i+1];
          collection[i+1] = collection[i];
          collection[i] = store;
        }
      }
      // For every time you have to make a swap, call the function one additional
      // time, pausing the current loop to call sort again. This is done because
      // the first loop through will not sort everything without the extra function call.
      //
      if(sortFlag) { return sorter(); }
    }

    sorter();
    unSortable.forEach(function(x) {
      collection.push(x);
    });
    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var newArr = [];
    function squish(array) {
      for (var i = 0; i < array.length; i++) {
        if (Array.isArray(array[i])) {
          squish(array[i]);
        }
        else {
          newArr.push(array[i]);
        }
      }
    }
    squish(nestedArray);
    return newArr;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

}).call(this);
