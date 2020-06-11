//TO get the maxwickets taken by a bowler, in a match by scraping a website's scoreboard.

let cheerio = require('cheerio');
let request = require('request');

console.log("Sending Request");
let url = "https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";
request(url, cb);

function cb(err, response, body) {
    console.log("Recieved");
    if(err != null) {
        console.log(err);
    }
    let $ = cheerio.load(body);

    let bowlerTable = $('.table.bowler tbody tr');

    let maxWickets = 0;
    let maxWicketBowler = "";

    for(let i = 0; i < bowlerTable.length; i++) {
        let columnsOfPlayer = $(bowlerTable[i]).find("td");
        
        let playerName = $(columnsOfPlayer[0]).text();
        let wickets = $(columnsOfPlayer[4]).text();

        if(wickets > maxWickets) {
            maxWickets = wickets;
            maxWicketBowler = playerName;
        }
    }
    
    console.log(maxWicketBowler + " -> " + maxWickets);
   
}