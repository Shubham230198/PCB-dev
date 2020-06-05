/*This is example of sync functions provided by js, sync functions are always slower than async functions.*/

// synchronous code 
let fs = require("fs");

console.log("Before");
// synchronous
let content = fs.readFileSync("f1.txt");
console.log("Content: " + content)
console.log("After")