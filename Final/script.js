function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let hunterCountElement = document.getElementById('hunterCount');
    let werewolfCountElement = document.getElementById('werewolfCount');

    var countCountElement = document.getElementById('Season');

    
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        predatorCountElement.innerText = data.predatorCounter;
        hunterCountElement.innerText = data.hunterCounter;
        werewolfCountElement.innerText = data.werewolfCounter;
        countCountElement.innerText = data.countCounter;

        createCanvas(matrix[0].length * side, matrix.length * side)
        
        background('#acacac');
        
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("yellow");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    if(season = "Winter"){
                        fill("white");
                    }
                    else if(season == "Summer"){
                        fill("orange");
                    }
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                     if (season == "winter"){
                        fill("purple")
                    }
                    else if (season == "Spring"){
                        fill("pink");
                    }
                    fill('purple');
                    rect(j * side, i * side, side, side);
                 }
            }
        }
    }
}

 

 