let socket = io();
let side = 40;
let canvasSize = 20;

function setup() {
    frameRate(10);
    createCanvas(20 * side, 20 * side);

}

function display(matrix) {
    console.log("mmmmmm=====>>>>",matrix);

    
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        let obj = matrix[y][x];
        if (obj == 1) {
            fill("green");
            rect(x * side, y * side, side, side)
        }
        else if (obj == 2) {
            fill("yellow");
            rect(x * side, y * side, side, side);
        }
        else if (obj == 3) {
            fill("red");
            rect(x * side, y * side, side, side);
        }else{
            fill("gray");
            rect(x * side, y * side, side, side);
        }
    }
}

}

setInterval(
    function () {
    socket.on('send matrix', display)
    },1000
)

