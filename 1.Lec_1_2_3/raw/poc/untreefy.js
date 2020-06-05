let fs = require("fs");
let path = require("path");
let uniqid = require("uniqid");


function untreefy(src, dest) {
    if(fs.lstatSync(src).isFile()) {
        let oldName = path.basename(src);
        let newName = uniqid();
        let destPath = path.join(dest, newName);
        fs.copyFileSync(src, destPath);
        console.log(`File ${oldName} from src copied to ${destPath}`);        
    }
    else {
        let childNames = fs.readdirSync(src);
        for(let i = 0; i < childNames.length; i++) {
            let childPath = path.join(src, childNames[i]);
            untreefy(childPath, dest);
        }
    }
}

let src = process.argv[2];
let dest = process.argv[3];
untreefy(src, dest);