module.exports.help = function () {
    let a = 4;
    console.log(`Total number of commands are ${a}
            1.node tpp.js view -t: give all files in this directory, in tree format
            2.node tpp.js view -f: give all files in this directory, in flat file format
            3.node tpp.js untreefy src dst: untreefy the current src to dest folder(just like linux)
            4.node tpp.js treefy src dst: reverse of untreefy command
            5.node tpp.js help: list all the commands, with their syntax to use
            `);
}