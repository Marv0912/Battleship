/*----- constants -----*/
const ships = [2, 3, 3, 4, 5];
const directions = ['horizontal', 'vertical'];

/*----- state variables -----*/
let fps = 60; // refresh rate of screen
let cols = 10; // # of columns
let rows = 10; // # of rows
let playerTurn = true; //player starts game
let playerShips = 5; // # of ships player starts
let computerShips = 5; // # of ships computer starts
let playerGrid = []; // Grid for players ships
let computerGrid = []; // Grid for computers ships
let isGameOver = false; // Used to loop until game is over
let playerShipPositions = []; // player ship positions
let computerShipPositions = []; // computer ship positions

/*----- cached elements -----*/
const startButton = document.getElementById('startButton');
const playAgainButton = document.querySelector('button');
/*----- functions -----*/

// Creates 10x10 array
function initialize2DArray(cols, rows, modifier) {
    const arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return fillArray(arr, modifier);
}

function fillArray(arr, modifier) {
    count = 1;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            arr[i][j] = {
                id: count + modifier,
                isShip: false,
                isShot: false,
            };
            count++;
        }
    }
    return arr;
}

function displayBoard() {
    // Create 10x10 grid(divs) for player and computer
    for (let i = 1; i < cols * rows + 1; i++) {
        const playerSquare = document.createElement("div");
        playerSquare.className = "square";
        playerSquare.id = i;
        document.getElementById('playerBoard').appendChild(playerSquare);
    }

    for (let i = 101; i < cols * rows + 101; i++) {
        const opponentSquare = document.createElement("div");
        opponentSquare.className = "square";
        opponentSquare.id = i;
        opponentSquare.setAttribute("onclick", "onPlayerTouch(this.id)");
        document.getElementById('opponentBoard').appendChild(opponentSquare);
    }
}

//

// Will check if cell was shot so it can change it
// If same cell selected twice, it will not proceed with game
function checkCell(id) {
    for (let i = 0; i < computerGrid.length; i++) {
        for (let j = 0; j < computerGrid[i].length; j++) {
            let cell = computerGrid[i][j];
            if (cell.id == id) {
                if(cell.isShip && !cell.isShot){
                    cell.isShot = true;
                    document.getElementById(id).textContent = 'X';
                    searchForComputerShip(i, j);
                    playerTurn = false;
                } else if (!cell.isShot) {
                    cell.isShot = true;
                    document.getElementById(id).textContent = 'O';
                    playerTurn = false;   
                }
            }
        }
    }
}

// If ship is sunken takes 1 ship off
    function searchForComputerShip(row, col) {
        cell = computerGrid[row][col];
        if(cell.isShip) {
            computerShipPositions[cell.shipId].size--;
            if(computerShipPositions[cell.shipId].size < 1) computerShips--;
        }
    }
    function searchForPlayerShip(row, col) {
        cell = playerGrid[row][col];
        if(cell.isShip) {
            playerShipPositions[cell.shipId].size--;
            if(playerShipPositions[cell.shipId].size < 1) playerShips--;
        }
    }

function onPlayerTouch(id) {
    if (playerTurn == true) {
        checkCell(id);
    }
}
// Initialize Arrays
function initialize() {
    playerGrid = initialize2DArray(cols, rows, 0);
    computerGrid = initialize2DArray(cols, rows, 100);
    displayBoard();
}


//Start of the Game Loop
startButton.addEventListener('click', function () {
    startButton.style.display = 'none';
    initialize();
    playerShipPositions = placeShips(playerGrid);
    computerShipPositions = placeShips(computerGrid);
    loop = setInterval(() => {
        updateGame();
    }, 1000 / fps);
});

// Updates turns and checks if any player's ships went to 0 to stop game
function updateGame() {
    if (!isGameOver) {
        if (!playerTurn) {
            computerMove();
        }
        if (playerShips === 0) {
            gameOverMessage.textContent = "Game over! You lost."
            playAgainButton.hidden = false
            isGameOver = true;
        } else if (computerShips === 0) {
            gameOverMessage.textContent = "Congrats! You won."
            playAgainButton.hidden = false
            isGameOver = true;
        }
    }
    else {
        clearInterval(loop);
    }
}

// Randomized computers move
function computerMove() {
    let randomRow = Math.floor(Math.random() * rows);
    let randomColumn = Math.floor(Math.random() * cols);
    let cell = playerGrid[randomRow][randomColumn];
    //  If random shot made by computer was in an empty cell add X 
    if (!cell.isShot) {
        playerGrid[randomRow][randomColumn] = true;
        playerTurn = true;
        if (cell.isShip) {
            document.getElementById(cell.id).textContent = 'X';
            searchForPlayerShip(row, col);
        } else {
            document.getElementById(cell.id).textContent = 'O';

        }
        console.log('Computer made a move');
    }
}


function placeShips(grid) {
    let size = grid.length;
    let placedShips = [];
    let id = Date.now().toString(36) + Math.random().toString(36).substr(2);;


    // Loop through each ship
    for (let i = 0; i < ships.length; i++) {
        let ship = {};
        let shipPlaced = false;

        // Place ship until it fits
        while (!shipPlaced) {
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const shipSize = ships[i];

            // Verify that no ship overlaps
            let positions = [];
            let canPlace = true;
            for (let j = 0; j < shipSize; j++) {
                let rowShift = direction === 'vertical' ? j : 0;
                let colShift = direction === 'horizontal' ? j : 0;

                if (row + rowShift >= size || col + colShift >= size || grid[row + rowShift][col + colShift].isShip) {
                    canPlace = false;
                    break;

                }

                positions.push({ row: row + rowShift, col: col + colShift });

            }
            // If the ship can be placed, add it to the grid and placedShips array
            if (canPlace) {
                ship = { size: shipSize, positions: positions, direction: direction };
                placedShips.push(ship);

                for (let j = 0; j < shipSize; j++) {
                    let rowShift = direction === 'vertical' ? j : 0;
                    let colShift = direction === 'horizontal' ? j : 0;
                    grid[row + rowShift][col + colShift].isShip = true;
                    grid[row + rowShift][col + colShift].ship = ship;
                    grid[row + rowShift][col + colShift].shipId = id;
                }

                shipPlaced = true;
            }

        }
    }

    return placedShips;
}


