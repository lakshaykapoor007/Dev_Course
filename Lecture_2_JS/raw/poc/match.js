let request =require("request");
let fs=require("fs");
let cheerio = require("cheerio");
let path= require("path")

function eachMatchHandler(url) {
    request(url, dataReciever);
    //console.log(url);
    
}
function dataReciever(err,res,html){
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
    let $=cheerio.load(html);
    let bothInnings =$(".match-scorecard-page div .card.content-block.match-scorecard-table");
    for(let inn =0;inn<bothInnings.length ;inn++){
            let rows =$(bothInnings[inn]).find("table.table.batsman tbody tr");
            let teamname=$(bothInnings[inn]).find("h5").text();
            teamname=teamname.split("Innings")[0].trim();
            for (let i = 0; i < rows.length; i++) {
                let colsinEVeryRow = $(rows[i]).find("td");
                // has class to check if an element contains the class or not
                let isPlayer = $(colsinEVeryRow[0]).hasClass("batsman-cell");
                if (isPlayer == true) {
                    let pName = $(colsinEVeryRow[0]).text();
                    pName = pName.trim();
                    let runs = $(colsinEVeryRow[2]).text();
                    let balls = $(colsinEVeryRow[3]).text();
               // console.log(`${pName} of ${teamname}  scored ${runs} in ${balls} balls`);
                handlePlayer(pName, teamname, runs, balls);}
            }
            //console.log("````````````````")
    }//console.log("#############################")
}

module.exports = eachMatchHandler;

function checkWetherDirPresent(dirPath) {
    return fs.existsSync(dirPath);
}

function checkWetherFilePresent(filePath) {
    return fs.existsSync(filePath);
}

function createDirectory(dirPath) {
    return fs.mkdirSync(dirPath);
}

function createfile(filePath) {
    fs.openSync(filePath, 'w');
}

function handlePlayer(pName, teamName, runs, balls) {
    // if dirName of folder exist
    let dirPath =  teamName;
    let isdirPresent = checkWetherDirPresent(dirPath);
    
    if (isdirPresent == false) {
        // create directory
        createDirectory(dirPath);
    }

    // let filePath = __dirname + "/" + teamName + "/" + pName + ".json";
    let filePath = path.join(teamName, pName + ".json");
    let isthereFile = checkWetherFilePresent(filePath);
    if (isthereFile == false) {
        createfile(filePath);
        let entries = [];
        let newObj = {};
        newObj.Runs = runs;
        newObj.Balls = balls;
        entries.push(newObj);
        let stringObj = JSON.stringify(entries);
        fs.writeFileSync(filePath, stringObj);
        // fs.writeFileSync()
    } else {
        //appendData
        let content = fs.readFileSync(filePath, {
            encoding: "utf-8",
            flag: "r"
        });
        let entries = JSON.parse(content);
        let newObj = {};
        newObj.Runs = runs;
        newObj.Balls = balls;
        entries.push(newObj);
        let stringObj = JSON.stringify(entries);
        fs.writeFileSync(filePath, stringObj)

    }

    // check for playerName  file

    // create directory
    // append the entry
    // create a file and put data
}
