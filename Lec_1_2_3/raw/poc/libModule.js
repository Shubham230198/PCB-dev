/* This would be an example for an module to be exported, to user.js*/

//1.This would be our function to be exported.
let myFunction = function myFunction() {
    console.log("this is myfunction, from lib-modeule");
}

module.exports = {
    myFunction
}


//2.Another way to export function
module.exports.another = function another() {
    console.log("This is another function, from node module");
}


//3. Follwing function won't be exported, or say it is considered as private.
function private() {
    console.log("This is private function, won't be exported");
}