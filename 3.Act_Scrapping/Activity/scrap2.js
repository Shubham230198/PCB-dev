/*To scrap the give cricket series's page, then select the ODI and T20I series, and scraping all those matches page,  
    to create a leaderboard of all batsman, and their respective total run, (in ODI and T20i differently)
*/

let request = require("request");
let cheerio = require("cheerio");

var leaderBoard = [];
var countOfMatches = 0;


console.log("Sending Request");
let url = "https://www.espncricinfo.com/scores/series/19322/india-in-new-zealand-2019-20?view=results";

// cb will be called when request recieves the data
request(url, cb);
function cb(err, response, html) {
    console.log("Recieved Response");
    if (err) {
        console.log(reponse.statusCode);
        console.log(err);
    } else if (response.statusCode == 404) {
        console.log("Page not found");
    } else {
        parseSeriesPage(html);
    }
}


function parseSeriesPage(html) {
    console.log("Parsing Html");
    let $ = cheerio.load(html);
    console.log("````````````````````````````````````````");
    
    let allMatchCards = $(".match-score-block");
    
    for(let i = 0; i < allMatchCards.length; i++) {
        let mType = $(allMatchCards[i]).find(".small").text();
        
        if(mType.includes("ODI") || mType.includes("T20I")) {
            let scoreCardLink = $(allMatchCards[i]).find('a[data-hover="Scorecard"]').attr("href");
            let matchLink = `https://www.espncricinfo.com${scoreCardLink}`;
            
            console.log("Sending request for Match of " + mType);
            handleMatch(matchLink);
        }
    }
}

// let matchLink = "https://www.espncricinfo.com/series/19322/scorecard/1187684/new-zealand-vs-india-3rd-odi-india-in-new-zealand-2019-20";

function handleMatch(matchLink) {
    countOfMatches++;
    request(matchLink, cb);

    function cb (err,response, html) {
        if(err != null) {
            console.log("Error occured");
            console.log(err);
        }
        else if(response.statusCode == 404) {
            console.log("Page not found");
        }
        else {
            parseMatch(html);
            countOfMatches--;
            if(countOfMatches == 0) {
                displayLeaderBoard();
            }
        }    
    }
}


function parseMatch(html) {
    let $ = cheerio.load(html);

    let mType = $(".desc.text-truncate").text();
    if(mType.includes("ODI")) {
        mType = "ODI";
    }
    else if(mType.includes("T20I")) {
        mType = "T20I";
    }
    
    // console.log(mType);

    let teams = $('.Collapsible .col');

    let tables = $('.table.batsman');
    for(let i = 0; i < tables.length; i++) {
        teamName = $(teams[i]).text().split("Innings")[0];
        // console.log(teamName);

        let allRows = $(tables[i]).find('tbody tr');
        for(let j = 0; j < allRows.length; j++) {
            let cols = $(allRows[j]).find("td");
            isBatsman = $(cols[0]).hasClass("batsman-cell");
            if(isBatsman) {
                let playerName = $(allRows[j]).find('td.batsman-cell').text().split('(')[0];
                let playerRun = Number($(allRows[j]).find('td.font-weight-bold').text());
                    
                // console.log(playerName + " -> " + playerRun);
                toLeaderBoard(playerName, playerRun, teamName, mType);
            }
        }
    }
}


function toLeaderBoard(playerName, playerRun, teamName, mType) {

    for(let i = 0; i < leaderBoard.length; i++) {
        let cPlayer = leaderBoard[i];
        if(cPlayer.name == playerName && cPlayer.team == teamName && cPlayer.match == mType) {
            cPlayer.totalRun += playerRun;
            return;
        }
    }

    let cPlayer = {};
    cPlayer.name = playerName;
    cPlayer.team = teamName;
    cPlayer.totalRun = playerRun;
    cPlayer.match = mType;
    leaderBoard.push(cPlayer);
}

function displayLeaderBoard() {
    console.table(leaderBoard);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}