'use strict';

var MathUtils = {};

/* Range */
MathUtils.range = function(begin, step, end) {
    if ( !(typeof begin === "number" &&
           typeof step  === "number"  &&
           typeof end   === "number") ) {
        throw "Not all three inputs are numbers"
    }


    var N = Math.floor((end - begin) / step + 1.0);


    var r = new Array(N);
    var c = begin;
    for (var i = 0; i < N; ++i) {
        r[i] = c;
        c += step;
    }

    return r;
};

/* Input: an array of arrays */
MathUtils.crossArrays = function(arrays) {
    var nArrays = arrays.length;

    var N = 1; /* Total number of elements in the crossing result */
    arrays.forEach(function(elem) {
        N *= elem.length;
    });

    var cumProdLen = new Array(nArrays - 1);
    for (var i = 0; i < nArrays - 1; ++i) {
        if (i == 0) {
            cumProdLen[i] = arrays[i].length;
        } else {
            cumProdLen[i] = cumProdLen[i - 1] *  arrays[i].length;
        }
    }

    var cr = new Array(N); /* Crossing result */
    for (var k = 0; k < N; ++k) {
        var t = k;
        var indices = new Array(nArrays);

        for (var n = nArrays - 1; n >=0; --n) {
            if (n > 0) {
                indices[n] = Math.floor(t / cumProdLen[n - 1]);
            } else {
                indices[n] = t;
            }
            t = t % cumProdLen[n - 1];
        }

        var ce = new Array(nArrays); /* Crossed element */
        for (var m = 0; m < indices.length; ++m) {
            ce[m] = arrays[m][indices[m]];
        }
        cr[k] = ce;
    }

    return cr;
};

/* Randomly permute an array */
MathUtils.randomlyPermute = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


module.exports = MathUtils;
