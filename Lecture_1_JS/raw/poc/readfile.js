let fs =require("fs");
let cheerio=require("cheerio");
let html = fs.readFileSync("../facts/index.html","utf-8");
//console.log(html);
let $ =cheerio.load(html);
let p =$("p");
let pKaData = p.text();
console.log(pKaData);

