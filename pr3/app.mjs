import Square from './square.mjs'; // es module

const mySq = new Square(3);

console.log(`Area = ${mySq.area()}`);

console.log(await mySq.someMethod());