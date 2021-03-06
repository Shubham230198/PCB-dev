let fs = require("fs");
let path = require("path");


module.exports.treefyFn = function () {
    let src = arguments[0];
    let dest = arguments[1];

    let root = fs.readFileSync(path.join(src, "metaData.json"));
    let cElem = JSON.parse(root);
    treefy(src, dest, cElem);
}


function treefy(src, dest, cElem) {
    if(cElem.isFile == true) {
        let srcPath = path.join(src, cElem.newName);
        let destPath = path.join(dest, cElem.oldName);
        fs.copyFileSync(srcPath, destPath);
        console.log(`${cElem.oldName} copied to dest`);
    }
    else {
        let dirName = cElem.name;
        let dirPath = path.join(dest, dirName);
        fs.mkdirSync(dirPath);
        console.log(`Directory ${cElem.name} created inside ${dest}`);

        for(let i = 0; i < cElem.children.length; i++) {        
            treefy(src, dirPath, cElem.children[i]);
        }
    }
}
