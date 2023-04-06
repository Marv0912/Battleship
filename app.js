
// state variables
let fps = 60;
let cols = 10;
let rows = 10;
let playerTurn = true;
let playerShips = 5;
let computerShips = 5;
let playerGrid = [];
let computerGrid = [];
let isGameOver = false;


// functions
function initialize2DArray(cols, rows){
    const arr = new Array(cols);

    for(const i = 0; i<arr.length; i++){
        arr[i] = new Array(rows);
    }
    return fillArray(arr);
}

function fillArray(arr){
    count = 1;
    for(const i = 0; i<arr.length; i++){
        for(const j = 0; j<arr[i].length; j++){
            arr[i][j] = {
                id: count,
                isShip: false,
                isShot: false,
                ship: {}
            };
            count++;
        }
    }
    return arr;
}

function displayBoard(){
    // Create 10x10 grid for player and computer
    for(const i = 1; i<cols*rows+1; i++){
        const playerSquare = document.createElement("div");
        playerSquare.className = "square";
        playerSquare.id = i;
        document.getElementById('PlayerBoard').appendChild(playerSquare);

        const opponentSquare = document.createElement("div");
        opponentSquare.className = "square";
        opponentSquare.id = i;
        opponentSquare.setAttribute("onclick", "onPlayerTouch(this.id);");
        document.getElementById('OpponentBoard').appendChild(opponentSquare);
    }
}

function onPlayerTouch(id){
    if(playerTurn === true){
        checkCell(id);
    }else{
        console.log("It is not your turn!");
    }
}

function checkCell(id){
    for(const i = 0; i<computerGrid.length; i++){
        for(const j = 0; j<computerGrid[i].length; j++){
            let cell = computerGrid[i][j];
            if(id == cell.id){
                if(cell.isShot == false){
                    cell.isShot = true;
                }else{
                    console.log("You have already shot this cell.");
                }
            }
        }
    }
}

function initialize(){
    playerGrid = initialize2DArray(cols, rows);
    computerGrid = initialize2DArray(cols, rows);
    displayBoard();
}

initialize();

//Start of the Game Loop
window.onload = () => {
    console.log("Game Loop!");
    loop = setInterval(() => {
        updateGame();
    }, 1000/fps);
};

function updateGame(){
    if(!isGameOver){
        if(!playerTurn){
            computerMove();
        } else if (playerShips === 0 || computerShips === 0) {
            isGameOver = true;
        }
    }
    else{ 
        clearInterval(loop);
    }
}

function computerMove() {
    let randomRow = Math.floor(Math.random() * rows);
    let randomColumn = Math.floor(Math.random() * cols);
    let cell = playerGrid[randomRow][randomColumn];

    if(!cell.isShot) {
        playerGrid[randomRow][randomColumn] = true;
        playerTurn = true;
        document.getElementById(cell.id).innerHTML = 'X';
        console.log('Computer made a move');
    }
}

