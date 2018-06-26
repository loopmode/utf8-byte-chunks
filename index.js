var truncate = require("truncate-utf8-bytes");

/**
 * Takes a string and a max size in bytes, then splits the string into chunks smaller than the given size.
 * The last array element may be smaller than the max given size.
 *
 * @param {string} value - The string in question
 * @param {number} maxBytes - Max size in bytes per chunk
 * @return {array} - An array containing chunks smaller than `maxBytes`
 */
function getBytesizedChunks(value, maxBytes) {
    value = value || "";
    maxBytes = maxBytes || 1;

    var result = [];
    var part;

    while (value) {
        part = truncate(value, maxBytes);
        result.push(part);
        value = value.replace(part, "");
    }

    return result;
}

module.exports = getBytesizedChunks;
