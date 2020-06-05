#!/usr/bin/env node

let fs = require("fs");
let path = require("path");
let utility = require("./utility");

function sendFile(dest, category, src) {
    let categoryPath = path.join(dest, category);
    
    if(fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(src);
    let cPath = path.join(categoryPath, fileName);
    fs.copyFileSync(src, cPath);
}

function getCategory(ext) {
    let types = utility.types;
    for(let cate in types) {
        for(let i = 0; i < types[cate].length; i++) {
            if(ext == types[cate][i])
                return cate;
        }
    }

    return null;
}

function getExtension(src) {
    let ext = src.split(".").pop();
    return ext;
}

function organise(src, dest) {
    if(fs.lstatSync(src).isFile() == true) {
        let extension = getExtension(src);        
        let category = getCategory(extension);
        
        if(category == null) {
            category = "others";
        }
        sendFile(dest, category, src);        
    }
    else {
        let childs = fs.readdirSync(src);
        for(let i = 0; i < childs.length; i++) {
                if(childs[i] == "organized_files")
                    continue;

                let cSrc = path.join(src, childs[i]);
                organise(cSrc, dest);
        } 
    }
}

let src = process.argv[2];
let dest = path.join(src, "organized_files");
if(fs.existsSync(dest) == false) {
    fs.mkdirSync(dest);
}

organise(src, dest);