class LivingCreature {
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
        this.directions = [
           [this.x - 1, this.y - 1],
           [this.x, this.y - 1],
           [this.x + 1, this.y - 1],
           [this.x - 1, this.y],
           [this.x + 1, this.y],
           [this.x - 1, this.y + 1],
           [this.x, this.y + 1],
           [this.x + 1, this.y + 1]
       ];
 
    }
    chooseCell(ch) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){
                if (matrix[y][x] == ch) {
                    found.push(this.directions[i]);
                }
            }   
        }
        return found;
    }
}


class Grass extends LivingCreature {
    mul() {
        this.multiply++;
        var newCell = random(this.yntrelVandak(0));
        if(this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0],newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.multiply = 0;
        }
    }
}
  


class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(ch) {
        this.getNewCoordinates();
        return super.chooseCell(ch);
     }
     
    move() {

        var newCell1 = this.chooseCell(0);
        var newCell2 = this.chooseCell(1);
        var newCell = random(newCell1.concat(newCell2))

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            if (matrix[newY][newX] == 0) {
                matrix[this.y][this.x] = 0;
                matrix[newY][newX] = this.index;

                this.y = newY;
                this.x = newX;
                this.energy--;
            }
            else if(matrix[newY][newX] == 1){
                matrix[this.y][this.x] = 1;
                grassArr.push(new Grass(this.x,this.y,1))
                matrix[newY][newX] = this.index;
                for (var i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                }

                this.y = newY;
                this.x = newX;
                this.energy--;
            }
        }

        }

    

    eat() {


        var newCell = random(this.chooseCell(1));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;


            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }

    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newGrassEater = new GrassEater(newCell[0], newCell[1], this.index);
            grassEaterArr.push(newGrassEater);
            matrix[newCell[1]][newCell[0]] = 2;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (this.X == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1)

                }
            }
        }
    }


}

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 7;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 3, this.y + 3],
            [this.x + 4, this.y + 4],
            [this.x + 5, this.y + 5],
            [this.x + 6, this.y + 6]
        ];
    }
        

chooseCell(character) {
    this.getNewCoordinates();
    var found = [];
    for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
            if (matrix[y][x] == character) {
                found.push(this.directions[i]);
            }
        }
    }
    return found;
}
move() {

    var newCell = random(this.chooseCell(0));

    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = 3;


        this.y = newY;
        this.x = newX;
        this.energy--;

    }

}
eat() {
    var newCell = random(this.chooseCell(2));

    if (newCell) {
        var newX = newCell[0];
        var newY = newCell[1];

        matrix[this.y][this.x] = 0;
        matrix[newY][newX] = 3;

        for (var i in grassEaterArr) {
            if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }


        this.y = newY;
        this.x = newX;
        this.energy += 3;

    }

}
mul() {

    var newCell = random(this.chooseCell(0));

    if (this.energy >= 8 && newCell) {
        var newPredator = new Predator(newCell[0], newCell[1], this.index);
        PredatorArr.push(newPredator);
        matrix[newCell[1]][newCell[0]] = 3;
        this.energy = 5;
    }
}
die() {
    if (this.energy <= 0) {
        matrix[this.y][this.x] = 0;
        for (var i in PredatorArr) {
            if (this.X == PredatorArr[i].x && this.y == PredatorArr[i].y) {
                PredatorArr.splice(i, 1)

            }
        }
    }
}
}

class Hunter {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 4;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]




        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 4;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }
    kill() {


        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }


            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }

    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 5 && newCell) {
            var newHunter = new Hunter(newCell[0], newCell[1], this.index);
            HunterArr.push(newHunter);
            matrix[newCell[1]][newCell[0]] = 4;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in HunterArr) {
                if (this.x == HunterArr[i].x && this.y == HunterArr[i].y) {
                    HunterArr.splice(i, 1);
                }
            }
        }
    }
}
class Werewolf {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 3;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {

        var newCell = random(this.chooseCell(0));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = 5;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }

    }


    kill() {


        var newCells1 = this.chooseCell(4);
        var newCells2 = this.chooseCell(3);
        var newCells = newCells1.concat(newCells2);
        var newCell = random(newCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in HunterArr) {
                if (newX == HunterArr[i].x && newY == HunterArr[i].y) {
                    HunterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in PredatorArr) {
                if (newX == PredatorArr[i].x && newY == PredatorArr[i].y) {
                    PredatorArr.splice(i, 1);
                    break;
                }
            }



            this.y = newY;
            this.x = newX;
            this.energy += 2;
        }

    }
    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 8 && newCell) {
            var newWerewolf = new Werewolf(newCell[0], newCell[1], this.index);
            WerewolfArr.push(newWerewolf);
            matrix[newCell[1]][newCell[0]] = 5;
            this.energy = 5;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in WerewolfArr) {
                if (this.x == WerewolfArr[i].x && this.y == WerewolfArr[i].y) {
                    WerewolfArr.splice(i, 1);
                }
            }
        }
    }
}









