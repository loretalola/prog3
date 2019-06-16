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
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 1, 1);

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
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grass = new Predator(x, y);
                predatorArr.push(predator);
                grassHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var grass = new Hunter(x, y);
                hunterArr.push(hunter);
                grassHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var grass = new Werewolf(x, y);
                werewolfrArr.push(werewolf);
                grassHashiv++;
            }
        }
    }
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
            grassEaterArr[i].eat();
        }
    }
    

    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }

    io.sockets.emit("data", sendData);
}


setInterval(game, 1000)



