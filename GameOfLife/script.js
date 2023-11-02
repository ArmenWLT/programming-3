

function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount) {
    let matrix = [];
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0);
        }

    }

    for (let j = 0; j < grassCount; j++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }

    for (let j = 0; j < grassEaterCount; j++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }

    for (let j = 0; j < predatorCount; j++) {

        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }


    return matrix;
}

let matrix = matrixGenerator(20, 4, 4, 15);
let side = 40;

let grassArr = [];
let grassEaterArr = [];
let predatorArray = [];

function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y);
                grassArr.push(gr);
                console.log(grassArr);

            } else if (matrix[y][x] == 2) {
                let grEat = new GrassEater(x, y);
                grassEaterArr.push(grEat);
            }
            else if(matrix[y][x] ==3){
                let pred  = new Predator(x,y);
                predatorArray.push(pred);
            }
        }

    }
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill('green');
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
            } else if (matrix[y][x] == 3) {
                fill('red');
            } else {
                fill('gray');
            }
            rect(x * side, y * side, side, side);

        }

    }

    for (let i in grassArr) {

        grassArr[i].mul()
    }
    
    for (let i in grassEaterArr) {
    
        grassEaterArr[i].eat()
    }

    for(let i in predatorArray){
        predatorArray[i].eat()
    }
}

