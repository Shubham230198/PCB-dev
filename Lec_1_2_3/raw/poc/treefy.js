let fs = require("fs");
let path = require("path");

function treefy(src, dest, cElem) {
    if(cElem.isFile == true) {
        let srcPath = path.join(src, cElem.newName);
        let destPath = path.join(dest, cElem.oldName);
        fs.copyFileSync(srcPath, destPath);
    }
    else {
        let dirName = cElem.name;
        let dirPath = path.join(dest, dirName);
        fs.mkdirSync(dirPath);

        for(let i = 0; i < cElem.children.length; i++) {        
            treefy(src, dirPath, cElem.children[i]);
        }
    }
}

let src = process.argv[2];
let dest = process.argv[3];

let root = fs.readFileSync(path.join(src, "metaData.json"));
let cElem = JSON.parse(root);
treefy(src, dest, cElem);