const querystring = require('querystring');
const {a, b} = {a: 10, b: 20};
console.log(a)
console.log(b);
console.log(querystring.stringify({a: {a1: 1, a2: 2}, b: 'a string'}));
