var Grass = require("./modules/class_Grass.js");
var GrassEater = require("./modules/class_GrassEater.js");
var Predator = require("./modules/class_Predator.js");
var Hunter = require("./modules/class_Hunter.js");
var Werewolf = require("./modules/class_Werewolf.js");
let random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
PredatorArr = [];
HunterArr = [];
WerewolfArr = [];
matrix = [];

grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
hunterHashiv = 0;
werewolfHashiv = 0;
season = '"';
count = 10;


function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, werewolf) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < werewolf; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 10, 9, 7, 4, 2);



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            }
             else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                PredatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var hunter  = new Hunter(x, y);
                HunterArr.push(hunter);
                hunterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var werewolf = new Werewolf(x, y);
                WerewolfArr.push(werewolf);
                werewolfHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
// count++
// if(count <= 10){
//     season = "winter"
// }
// else if(count <= 20){
//     season = "spring"
// }
// else if(count <= 30){
//     season = "summer"
// }
// else if(count <= 40){
//     season = "fall"
// }

// if(season = "winter"){
//     for (var i in PredatorArr) {
//         predator.die()
//     } 
// }
// else if(season = "spring"){
//     for (var i in Grass) {
//         grass.mul(3)
//     } 
// }
// else if(season = "winter"){
//     for(var i in Hunter){
//         hunter.die
//     }
// }
if  (count == 75){
    count = 0;
}

if (count <= 30) {
    season = "Spring";
}
else if(count > 30 && count <= 45) {
    season = "Summer";
}
else if (count > 45 && count <= 60) {

    season = "Autumn";
}
else if (count > 60 && count <= 75) {
    season = "Winter";
}

count++;


    if (grassArr[0] !== undefined && season == "Winter") {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].move();
            grassEaterArr[i].eat();
            grassEaterArr[i].mul();
            grassEaterArr[i].die();
        }
    }
    if (PredatorArr[0] !== undefined && season == "Spring") {
        for (var i in PredatorArr) {
            PredatorArr[i].move();
            PredatorArr[i].eat();
            PredatorArr[i].mul();
            PredatorArr[i].die();
            
        }
    }
    if (HunterArr[0] !== undefined) {
        for (var i in HunterArr) {
            HunterArr[i].move();
            HunterArr[i].kill();
            HunterArr[i].mul();
            HunterArr[i].die();
        }
    }
    if (WerewolfArr[0] !== undefined) {
        for (var i in WerewolfArr) {
            WerewolfArr[i].move();
            WerewolfArr[i].kill();
            WerewolfArr[i].mul();
            WerewolfArr[i].die();
        }
    }

    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCount: grassEaterHashiv,
        predatorCount: predatorHashiv,
        hunterCount: hunterHashiv,
        werewolfCount: werewolfHashiv,
        countCounter: season,     
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000) 
