/*                                  ACTIVITY - 1
This will be an activity, from making terminal commands:
    1. to view as tree.
    2. to view as flat files.
    3. for treefying a directory to destination directory (creating well organised metadata).
    4. for untreefying a directory (using metadata) from src to dest folder.
*/


let input  = process.argv.slice(2);
let viewFile = require("./commands/view");
let untreefyFile = require("./commands/untreefy");
let helpFile = require("./commands/help");
let treefyFile = require("./commands/treefy");
let cmd = input[0];

switch (cmd) {
    case "view":
        viewFile.view(process.argv[3], process.argv[4]);
        break;
    case "treefy":
        treefyFile.treefyFn(process.argv[3], process.argv[4]);
        break;
    case "untreefy":
        untreefyFile.untreefyFn(process.argv[3], process.argv[4]);
        break;
    case "help":
        helpFile.help();
        break;
    default:
        console.log("Wrong command");
}