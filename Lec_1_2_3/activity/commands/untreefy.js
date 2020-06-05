let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");

module.exports.untreefyFn = function() {
    let src = arguments[0];
    let dest = arguments[1];
    let root = {};

    untreefy(src, dest, root);
    fs.writeFileSync(path.join(dest, "metaData.json"), JSON.stringify(root));
}


function untreefy(src, dest, root) {
    if(fs.lstatSync(src).isFile()) {
        let oldName = path.basename(src);
        let newName = uniqid();
        root.isFile = true;
        root.oldName = oldName;
        root.newName = newName;

        let destPath = path.join(dest, newName);
        fs.copyFileSync(src, destPath);
        console.log(`File ${oldName} from src copied to ${destPath}`);        
    } 
    else {
        root.isFile = false;
        root.name = path.basename(src);
        root.children = [];
        let childNames = fs.readdirSync(src);
        for(let i = 0; i < childNames.length; i++) {
            let childPath = path.join(src, childNames[i]);
            
            let childObj = {};
            untreefy(childPath, dest, childObj);
            root.children.push(childObj);
        }
    }
}
