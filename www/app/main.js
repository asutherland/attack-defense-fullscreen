define(function (require) {
var mdast = require('mdast');
var docText = require('text!docs/universal-spoofing.md');

var parsed = mdast.parse(docText);
console.log('parsed', parsed);
});
