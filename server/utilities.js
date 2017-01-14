var removeSplChars = function(source) {
    var lower = source.toLowerCase();
    var upper = source.toUpperCase();
    var result = "";
    for(var i=0; i<source.length; ++i) {
        if(lower[i] != upper[i] || source[i].trim() === '')
            result +=source[i];
    }
    return result;
}

module.exports = {
    removeSplChars: removeSplChars
}