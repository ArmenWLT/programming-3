class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiple = 0;
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

    chooseCell(char) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if(matrix[y][x] == char){
                        found.push(this.directions[i])
                }

            }
        }

        return found;
    }


    mul(){
        this.multiple++;
        let emptyCell = this.chooseCell(0);
        let newCell = random(emptyCell);
        if(newCell && this.multiple >= 8){
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 1;
            let gr = new Grass(newX, newY);
            grassArr.push(gr);
            this.multiple = 0;
        }





    }
}