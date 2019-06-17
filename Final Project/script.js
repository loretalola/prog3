

function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let hunterCountElement = document.getElementById('predatorCount');
    let werewolfCountElement = document.getElementById('werewolfCount');

    
    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;

        matrix = data.matrix;
        grassEaterCountElement.innerText = data.grassEaterCounter;

        matrix = data.matrix;
        predatorCountElement.innerText = data.predatorCounter;

        matrix = data.matrix;
        hunterCountElement.innerText = data.hunterCounter;

        matrix = data.matrix;
        werewolfCountElement.innerText = data.werewolfCounter;
        
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
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('pink');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('purple');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

 

 