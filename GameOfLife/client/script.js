let socket = io();
let side = 40;
let canvasSize = 20;
let creaturesColor = {
    grassColor:"green",
    grassEaterColor: "yellow",
    predatorColor: "red"
};

let winterButton = document.getElementById('winter');
let springButton = document.getElementById('spring');
let summerButton = document.getElementById('summer');
let fallButton = document.getElementById('fall');

winterButton.addEventListener("click", (event) => {
    let data = event.target.name;
    if(event.target.name === "winter"){
        creaturesColor.grassColor = "white";
        creaturesColor.grassEaterColor= "brown";
        creaturesColor.predatorColor = "darkGrey"
    }
    
    socket.emit("weather event", { info: data });
});

springButton.addEventListener("click", (event) => {
    let data = event.target.name;
    if(event.target.name === "spring"){
        creaturesColor.grassColor = "green";
        creaturesColor.grassEaterColor= "yellow";
        creaturesColor.predatorColor = "red"
    }
    
    socket.emit("weather event", { info: data });
});

summerButton.addEventListener("click", (event) => {
    let data = event.target.name;
    if(event.target.name === "summer"){
        creaturesColor.grassColor = "orange";
        creaturesColor.grassEaterColor= "yellow";
        creaturesColor.predatorColor = "red"
    }
    
    socket.emit("weather event", { info: data });
});

fallButton.addEventListener("click", (event) => {
    let data = event.target.name;
    if(event.target.name === "fall"){
        creaturesColor.grassColor = "brown";
        creaturesColor.grassEaterColor= "yellow";
        creaturesColor.predatorColor = "darkRed"
    }
    
    socket.emit("weather event", { info: data });
});

function setup() {
    frameRate(15);
    createCanvas(20 * side, 20 * side);

}

function display(matrix) {

    
for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        let g = creaturesColor.grassColor;
        let gE = creaturesColor.grassEaterColor;
        let p = creaturesColor.predatorColor;
        let obj = matrix[y][x];
        if (obj == 1) {
            fill(g);
        }
        else if (obj == 2) {
            fill(gE);
        }
        else if (obj == 3) {
            fill(p);
        }else{
            fill("gray");
        }
        rect(x * side, y * side, side, side)

    }
}

}



setInterval(
    function () {
    socket.on('send matrix', display)
    },1000
)

