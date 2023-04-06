/*----- constants -----*/
const ships = [2, 3, 3, 4, 5];
const directions = ['horizontal', 'vertical'];

/*----- state variables -----*/
let fps = 60; //
let cols = 10; // # of columns
let rows = 10; // # of rows
let playerTurn = true; //player starts game
let playerShips = 5; // # of ships player starts
let computerShips = 5; // # of ships computer starts
let playerGrid = []; // Grid for players ships
let computerGrid = []; // Grid for computers ships
let isGameOver = false; // Used to loop until game is over

// functions

// Creates 10x10 array
function initialize2DArray(cols, rows){
    const arr = new Array(cols);

    for(let i = 0; i<arr.length; i++){
        arr[i] = new Array(rows);
    }
    return fillArray(arr);
}

function fillArray(arr){
    count = 1;
    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j<arr[i].length; j++){
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
    // Create 10x10 grid(divs) for player and computer
    for(let i = 1; i<cols*rows+1; i++){
        const playerSquare = document.createElement("div");
        playerSquare.className = "square";
        playerSquare.id = i;
        document.getElementById('playerBoard').appendChild(playerSquare);

        const opponentSquare = document.createElement("div");
        opponentSquare.className = "square";
        opponentSquare.id = i;
        opponentSquare.setAttribute("onclick", "onPlayerTouch(this.id);");
        document.getElementById('opponentBoard').appendChild(opponentSquare);
    }
}

//
function onPlayerTouch(id){
    if(playerTurn === true){
        checkCell(id);
    }else{
        console.log("It is not your turn!");
    }
}

// Will check if cell was shot so it can change it
// If same cell selceted twice, it will not proceed with game
function checkCell(id){
    for(let i = 0; i<computerGrid.length; i++){
        for(let j = 0; j<computerGrid[i].length; j++){
            let cell = computerGrid[i][j];
            if(id == cell.id){
                if(cell.isShot === true){
                    checkCell(id);
                    cell.isShot = true;
                }else{
                    playerTurn = false;
                    computerGrid[i][j];
                }
            }
        }
    }
}

// Initialize Arrays
function initialize(){
    playerGrid = initialize2DArray(cols, rows);
    computerGrid = initialize2DArray(cols, rows);
    displayBoard();
}

initialize();

//Start of the Game Loop
window.onload = () => {
    loop = setInterval(() => {
        updateGame();
    }, 1000/fps);
};

// Updates turns and checks if any player's ships went to 0 to stop game
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

// Randomized computers move
function computerMove() {
    let randomRow = Math.floor(Math.random() * rows);
    let randomColumn = Math.floor(Math.random() * cols);
    let cell = playerGrid[randomRow][randomColumn];
    //  If random shot made by computer was in an empty cell add X 
    if(!cell.isShot) {
        playerGrid[randomRow][randomColumn] = true;
        playerTurn = true;
        document.getElementById(cell.id).innerHTML = 'X';
        console.log('Computer made a move');
    }
}

function placeShips(grid) {
    const size = grid.length;
    const placedShips = [];
}



