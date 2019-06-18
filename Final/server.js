var Grass = require("./modules/class_Grass.js");
var GrassEater = require("./modules/class_GrassEater.js");
var Predator = require("./modules/class_Predator.js");
var Hunter = require("./modules/class_Hunter.js");
var Werewolf = require("./modules/class_Werewolf.js");
let random = require('./modules/random');

grassArr = [];
grassEaterArr = [];
predatorArr = [];
hunterArr = [];
werewolfArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
hunterHashiv = 0;
werewolfHashiv = 0;
seasons = '"';
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
matrixGenerator(20, 10, 8, 5, 3, 2);



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
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var hunter  = new Hunter(x, y);
                hunterArr.push(hunter);
                hunterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var werewolf = new Werewolf(x, y);
                werewolfArr.push(werewolf);
                werewolfHashiv++;
            }
        }
    }
    console.log(werewolf);
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
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
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].move();
            predatorArr[i].eat();
            predatorArr[i].mul();
            predatorArr[i].die();
            
        }
    }
    if (hunterArr[0] !== undefined) {
        for (var i in hunterArr) {
            hunterArr[i].move();
            hunterArr[i].kill();
            hunterArr[i].mul();
            hunterArr[i].die();
        }
    }
    if (werewolfArr[0] !== undefined) {
        for (var i in hunterArr) {
            werewolfArr[i].move();
            werewolfArr[i].kill();
            werewolfArr[i].mul();
            werewolfArr[i].die();
        }
    }


    if(seasons == "spring" ){
        
        predator[i].die();
    }


    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCount: grassEaterHashiv,
        predatorCount: predatorHashiv,
        hunterCount: hunterHashiv,
        werewolfCount: werewolfHashiv,       
    }

    io.sockets.emit("data", sendData);
}

setInterval(game, 1000)



