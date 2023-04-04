/*----- constants -----*/
const displayShot = {
    '1': 'red',
    '-1': 'white',
    '0': 'gray',
}


/*----- state variables -----*/
let turn;
let winner;
let grid;
let sunkenShips;


/*----- cached elements -----*/
const playerEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const fireBtn = document.getElementById(fire);

/*----- event listeners -----*/
playAgainBtn.addEventListener('click', initialize);
fireBtn.addEventListener('click', )

/*----- functions -----*/
initialize();

// Need to initialize the game everytime is getting started
function initialize() {
    turn = 1;
    winner = null;

    // 90 degree turn
    grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 7
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 9
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 10
        // a  b  c  d  e  f  g  h  i  j
    ]

    render();
}

function render() {
    playAgainBtnDisplay();
    randomizeShipPosition();
}

// Hides Play Again Button until a winner is declared
function playAgainBtnDisplay() {
    const visibility = winner === null ? 'hidden' : 'visible';
    playAgainBtn.style.visibility = visibility
}

// Create positions for the 5 ships of each player
function randomizeShipPosition() {
    // Possible ships allowed
    let ships = [
        { name: 'Carrier', size: 5, hits: 0, maxCount: 2},  
        { name: 'Battleship', size: 4, hits: 0, maxCount: 2},  
        { name: 'Cruiser', size: 3, hits: 0, maxCount: 2},  
        { name: 'Submarine', size: 3, hits: 0, maxCount: 2},  
        { name: 'Destroyer', size: 2, hits: 0, maxCount: 2},
    ];
    // Empty array that will occupate player's and computer's 5 ships
    let placedShips = [];

    // Verify if there is more than two ships with the same name, if not you can add it to the new array of placedShip
    ships.forEach(ship => {
        if (placedShips.filter(s => s.name === ship.name).length < ship.maxCount) {
            placedShips.push(ship);
        }
    });

    let randomShip;
    //randomly pick ship with 50/50 chance of choosing new ship or keep previous random ship selected
    placedShips.forEach[Math.floor(Math.random() * placedShips.length)];
        if (!randomShip || Math.random() > 0.5){
            randomShip = ship;
        }
    }

