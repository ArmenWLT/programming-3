//առաջին 10 տողը նույնությամբ գրիր, որպեսզի լոկալհոստ ունենաս
let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);
let fs = require("fs");

app.use(express.static("../client"));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

//10

//քո սկրիպտ ֆայլից տպի մատրիցդ գեներացնոլու հատվածը և դատարկ զանգվածը
// ինձ մոտ այն չի գեներացվում,,,քեզ մոտ լաաաավ կլինի , որ գեներացվի
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
matrix = matrixGenerator(20, 40, 10, 15);

//այստեղ քո պատրաստի թվերով լցված զանգվածը ուղարկում ես կլիենտին:
//սոքեթի emit մեթոդը թույլ է տալիս առաջին արգումենտով ստեղծել իվենթի անունը, 
//2-րդ արգումենտով ուղղարկել տվյալը, այն ինչ ուզում ես ուղարկել

io.sockets.emit('send matrix', matrix)

// հիմա գնա կլիենտի ֆայլ

//.........................................լոադինգ

//եթե գնացիր ու ամենինչ գրեցիր, արի էստեղ, դեռ անելիք ունենք

//էստեղ բեր քո գազանիկների դատարկ զանգվածները
grassArr = [];
grassEaterArr = []
predatorArray = []

//քանի որ քո կլասս-երը արդեն մոդուլներ են և ոչ մի կապ չունեն html ֆայլիդ հետ՝
//այլ աշխատում են սերվերի վրա:
//Դու պետք է նրանց իմպորտ անես: Ինձ մոտ նրանք երկուսն են, քեզ մոտ ավելի շատ
let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./predator")

//Այժմ լցնենք մատրիցը օբյեկտներով
//սարքի մի հատ ֆունկցիա օրինակ createObject անունով
//և էստեղ բեր քո սկրիպտ ֆայլի օբյեկտներով լցնող հատվածը
function createObject(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y, 1);
                grassArr.push(gr)
            }
            else if (matrix[y][x] == 2) {
                let grEater = new GrassEater(x, y, 2);
                grassEaterArr.push(grEater)

            }
            else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y, 2);
                predatorArray.push(pred)

            }
        }
    }
    // և կրկին ուղարկի կլիենտիդ: 
    //չմոռանաս , որ emit-ը տվյալ ուղարկողն է, իսկ on-ը ստացողը և կատարողը
    //այս դեպքում 2-րդ արգումենտը տվյալն է
    io.sockets.emit('send matrix', matrix)


}


//հիմա անցնենք նրանց վայրենի գործունեությանը
//որևէ անունով կոչիր ֆունկցիադ և մեջը դիր մեթոդների հատվածը:

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in predatorArray) {
        predatorArray[i].eat();
    }
    //այո, դու ճիշտ ես տեսնում, կրկին և կրկին
    io.sockets.emit("send matrix", matrix);
}

//մեր խաղի շարժը լինելու է 1 վարկյանը մեկ
setInterval(game, 1000)



// մինչև այժմ մենք ինքներս էինք դնում իվենթների անուննները, 
//օրինակ send matrix կամ ըըը... էլ չկա :D
// էստեղ connection պատրասի իվենթի անուն է, որը աշխատում է այն ժամանակ, 
//երբ որևէ մեկը աշխատացնում է սերվերը՝ մտնում է սերվեր
//և մենք դեռ չէինք կանչել createObject ֆունկցիան
// էստեղ կկանչենք )))
function changeWinter(winter) {
    console.log("wwwwwww--->>", winter);
}

io.on('connection', function (socket) {
    console.log("Client connected");

    createObject(matrix);

    // Handle the 'weather event' from the client
    socket.on('weather event', function (data) {
        console.log("Received weather event:", data.info);
        changeWinter(data.info);
    });
});
