/*view command function basis*/
let fs = require("fs");
let path = require("path");

function checkWhetherFile(src) {
    return fs.lstatSync(src).isFile();
}

function getContent(src){
    return fs.readdirSync(src);
}

function viewAsFlatFiles(src, toPrint) {
    if(checkWhetherFile(src)) {
        console.log(toPrint + "*");
    }
    else {
        console.log(toPrint);

        let childNames = getContent(src);
        for(let i = 0; i < childNames.length; i++) {
            let childPath = path.join(src, childNames[i]);
            let cToPrint = path.join(toPrint, childNames[i]);
            viewAsFlatFiles(childPath, cToPrint);
        }
    }
}


function viewAsTree(src, toPrint) {
    if(checkWhetherFile(src)) {
        console.log(toPrint + path.basename(src)+ " *");
    }
    else {
        console.log(toPrint + path.basename(src));

        let childNames = getContent(src);
        for(let i = 0; i < childNames.length; i++) {
            let childPath = path.join(src, childNames[i]);
            viewAsTree(childPath, toPrint + "|--");
        }
    }
}


module.exports.view = function view() {
    let src = arguments[0];
    let mode = arguments[1];
    if(mode == "-t") {
        viewAsTree(src, "");
    }
    else {
        viewAsFlatFiles(src, path.basename(src));
    }
}