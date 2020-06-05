/*view command function basis*/
let fs = require("fs");
let path = require("path");

function checkWhetherFile(src) {
    return fs.lstatSync(src).isFile();
}

function getContent(src){
    return fs.readdirSync(src);
}


function view(src, toPrint) {
    if(checkWhetherFile(src)) {
        console.log(toPrint + " *");
    }
    else {
        console.log(toPrint);
        
        let childNames = getContent(src);
        for(let i = 0; i < childNames.length; i++) {
            let childPath = path.join(src, childNames[i]);
            let cToPrint = path.join(toPrint, childNames[i]);
            view(childPath, cToPrint);
        }
    }
}

var toPrint = path.basename(process.argv[2]);
view(process.argv[2], toPrint);
