// console.log('Hello, pr2');

const Square = require('./square'); // common js

const mySq = new Square(3);

console.log(`Area = ${mySq.area()}`);


(async function(){
    console.log(await mySq.someMethod());
})();

