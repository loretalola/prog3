let matrix = []; 
let rows = 50; 
let columns = 50; 

for (let y = 0; y < rows; y++) {
    matrix[y] = []; 
    for (let x = 0; x < columns; x++) {
        let a = Math.floor(Math.random() * 100);
        if (a >= 0 && a < 20) {
            matrix[y][x] = 0; 
        }
        if (a >= 20 && a < 40) {
            matrix[y][x] = 1; 
        }
        else if (a >= 40 && a < 50) {
            matrix[y][x] = 2; 
        }
        else if (a >= 50 && a < 70) {
            matrix[y][x] = 3; 
        }
        else if (a >= 70 && a < 90) {
            matrix[y][x] = 4; 
        }
        else if (a >= 90 && a < 100) {
            matrix[y][x] = 5; 
        }
    }
}
var m = 30;
var grassArr = [];
var grassEaterArr = [];
var side = 20;
var PredatorArr = [];
var HunterArr = [];
var WerewolfArr = [];


function setup() {
    for (var y = 0; y < m; y++) {
        matrix[y] = [];
        for (var x = 0; x < m; x++) {
            matrix[y][x] = Math.round(random(5));
        }
    }
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                var et = new GrassEater(x, y, 2);
                grassEaterArr.push(et);

            }
            else if (matrix[y][x] == 3) {
                var pd = new Predator(x, y, 3);
                PredatorArr.push(pd);
            }
            else if (matrix[y][x] == 4) {
                var ht = new Hunter(x, y, 4);
                HunterArr.push(ht);
            }
            else if (matrix[y][x] == 5) {
                var wf = new Werewolf(x, y, 5);
                WerewolfArr.push(wf);
            }
        }

    }
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }

        }

    }


    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].move();
        grassEaterArr[i].eat();
        grassEaterArr[i].mul();
        grassEaterArr[i].die();
    }


    for (var i in PredatorArr) {
        PredatorArr[i].move();
        PredatorArr[i].eat();
        PredatorArr[i].mul();
        PredatorArr[i].die();


    }
    for (var i in HunterArr) {
        HunterArr[i].move();
        HunterArr[i].kill();
        HunterArr[i].mul();
        HunterArr[i].die();
    }
    for (var i in WerewolfArr) {
        WerewolfArr[i].move();
        WerewolfArr[i].kill();
        WerewolfArr[i].mul();
        WerewolfArr[i].die();
    }
}
