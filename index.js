var truncate = require('truncate-utf8-bytes');
var getLength = require('utf8-byte-length');

/**
 * Takes a string and a max size in bytes, then splits the string into chunks smaller than the given size.
 * Pass `true` as third argument to avoid breaking words and instead split the value on spaces first. 
 *
 * @param {string} value - The string in question
 * @param {number} maxBytes - Max size in bytes per chunk
 * @param {bool} splitOnSpace - If true, words will not be cut off in the middle
 * @return {array} - An array containing chunks smaller than `maxBytes`
 */
function utf8ByteChunks(value, maxBytes, splitOnSpace) {
    if (splitOnSpace) {
        return splitSpaces(value, maxBytes);
    } else {
        return splitRegular(value, maxBytes);
    }
}

function splitSpaces(value, maxBytes) {
    value = value || '';
    maxBytes = maxBytes || 1;

    var result = [];

    let currentIndex = 0;

    value.split(' ').forEach(function(word) {
        var currentChunk = result[currentIndex] || '';
        var updatedChunk = currentChunk + (currentChunk ? ' ' : '') + word;
        if (getLength(updatedChunk) <= maxBytes) {
            result[currentIndex] = updatedChunk;
        } else {
            currentIndex += 1;
            result.push(word);
        }
    });

    return result;
}
function splitRegular(value, maxBytes) {
    value = value || '';
    maxBytes = maxBytes || 1;

    var result = [];
    var part;

    while (value) {
        part = truncate(value, maxBytes);
        result.push(part);
        value = value.replace(part, '');
    }

    return result;
}

module.exports = utf8ByteChunks;
