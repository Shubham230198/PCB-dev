/*FUNCTIONALITY
    This is a scraping script, where we will scrap all the notices from the website of IPU university (only visible on the first opening)
*/ 

let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let emailLogic = require('./emailLogic');

let allNotices = [];

//requesting the notice page.
let url = "http://www.ipu.ac.in/notices.php";
startProcess(url);

function startProcess(url) {
    //requesting.
    console.log("Sending Request");
    request(url, cb);

    function cb(err, response, html) {
        if(err != null) {
            console.log("Error Occured");
            console.log(err);
        }
        else if(response.statusCode == 404) {
            console.log("Page not found");
        }
        else {
            parsehtml(html);
        }
    }
}

function parsehtml(html) {
    let cCallNotices = [];

    let $ = cheerio.load(html);
    let rowArr = $('table tbody:nth-child(2)').find('tr');
    
    for(let i = 0; i < rowArr.length; i++) {
        let notValid = $(rowArr[i]).hasClass('item-collapse');
        if(notValid == true) {
            break;
        }
        
        let noticeObj = {};
        noticeObj.notice = $(rowArr[i]).find('td:nth-child(1)').text();
        
        let partialLink = $(rowArr[i]).find('td:nth-child(1) a').attr('href');
        noticeObj.link = `http://www.ipu.ac.in/${partialLink}`;

        noticeObj.date = $(rowArr[i]).find('td:nth-child(2)').text();
        cCallNotices.push(noticeObj);
    }

    if(allNotices.length == 0) {
        allNotices = cCallNotices;
        console.table(allNotices);

        let allNoticesHtml = "";
        let html = fs.readFileSync("index.html") + "";
        for(let i = 0; i < allNotices.length; i++) {
            let cNotice = allNotices[i];
            let currentNoticeHtml = `<tr><td>${cNotice.notice}</td><td><a href="${cNotice.link}">Link</a></td><td>${cNotice.date}</td></tr>`;
            allNoticesHtml += currentNoticeHtml;          
        }
        html = html.replace("{{template}}", allNoticesHtml);
        
        // console.log(html);
        console.log("Sending the email...");
        emailLogic.sendEmail(html);
    }
    else {
        if(allNotices.length == cCallNotices.length) {
            console.log("No new Notice");
        }
        else {
            let newNoticesNumber = cCallNotices.length - allNotices.length;
            console.log("There are " + newNoticesNumber + " new notices");
            
            for(let i = 0; i < newNoticesNumber; i++) {
                allNotices.unshift(cCallNotices[i]);
                console.table(cCallNotices[i]);
            }
        }                  
    }
}
