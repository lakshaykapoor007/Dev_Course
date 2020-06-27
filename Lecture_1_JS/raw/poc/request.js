let request =require("request");
let fs=require("fs");
let cheerio = require("cheerio");

request("https://www.espncricinfo.com/series/_/id/8039/season/2015/icc-cricket-world-cup",dataReciver);
function dataReciver(err,res,html){
    if(err ==null && res.statusCode ==200){
        parsefile(html);
    }else if(res.statusCode ==404){
        console.log("Page not found");
    }else{
        console.log(err);
        console.log(res);
    }
}
function parsefile(html){
    let $ =cheerio.load(html);
    // let list = $("ul.list-unstyled.mb-0");
    // fs.writeFileSync("list.html",list);
    let a = $("li.widget-items.cta-link a").attr("href");
    let fullLink="https://www.espncricinfo.com"+a;
   // console.log(fullLink);
   request(fullLink,matchPagehandler);
}

function matchPagehandler(err,res,html){
    if(err ==null && res.statusCode ==200){
        parseMatch(html);
        //console.log(html)
    }else if(res.statusCode ==404){
        console.log("Page not found");
    }else{
        console.log(err);
        console.log(res);
    }
}

function parseMatch(html){
    let $ =cheerio.load(html);
    let allcards = $(".col-md-8.col-16");
  // console.log(allcards.length);
  for(let i=0;i<allcards.length;i++){
      let result =$(allcards[i]).find(".extra-small.mb-0.match-description.match-description-bottom").text();
      let details =$(allcards[i]).find(".small.mb-0.match-description").text();
      let allanchors =$(allcards[i]).find(".match-cta-container a");
      let scorecardlink=$(allanchors[1]).attr("href");

     console.log("=======================");
     console.log(result);
    console.log("https://www.espncricinfo.com"+scorecardlink);
    console.log(details);
    console.log("#######################");
  }
}