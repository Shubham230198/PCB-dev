 /* There are four types of functions in js*/

//1. function statement
function sayHello() {
    console.log("Hello Everyone :) ");
}

//2. fn are variables
// function expression
let fnVar = function () {
    console.log("I am fn expression")
};

//3. IIFEE=> immediately invoked fn expression
(function anotherFn() {
    console.log("I was called immediately after  i was created");
})();


//4. Arrow function
let arrowFn = () => {
    console.log("I am an arow");
}


sayHello();
fnVar();
arrowFn();