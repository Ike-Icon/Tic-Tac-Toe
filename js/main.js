// First declare the constants like "X", "O", and winning combinations.
const X_CLASS = "x"
const O_CLASS = "o"
const scores = [0, 0] // [X, O]
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

class scoreInfo {
    constructor() {
        this.playerOName = scores[1];
        this.playerXName = scores[0];
        // this.scores = [0, 0]; // [X, O]
    }
} 

// Then declare the DOM elements that will be used in the game.
const cellElements = document.querySelectorAll("[data-cell]")
const container = document.getElementById("container")
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const restartButton = document.getElementById("restartButton")
const scoreboard = document.getElementById("scoreboard")
const scoreX = document.getElementById("score-x")
const scoreO = document.getElementById("score-o")
const xButton = document.getElementById("submitPlayerX")
const oButton = document.getElementById("submitPlayerO")
const playerOName = document.getElementById("playerOName")
const playerXName = document.getElementById("playerXName")

const scoreReset = document.getElementById("resetScore")

// Create a variable to keep track of the current player.
let circleTurn

// Call the startGame function to start the game before everything else
startGame()
// enterNames();
updateScoreboard()

// When the restart button is clicked, the game should reset.
restartButton.addEventListener("click", startGame)


// The startGame function initializes the game.
function startGame() {
    // Since "X" will start first.
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(O_CLASS)
        cell.addEventListener("click", handleClick, { once: true })
    })
    setCellHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(event) {
    const cell = event.target
    const currentClass = circleTurn ? O_CLASS : X_CLASS
    // This is another way of writing if statement
    // let currentClass;
    // if (circleTurn){
    //     currentClass = O_CLASS;
    // }else {
    //     currentClass = X_CLASS;
    // }

    placemark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn()
        setCellHoverClass()
    }
}

// When the game end displays the winning/ draw messages
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
        updateScore() // Update the score when a player wins
    }
    winningMessageElement.classList.add("show")
}

// Check if the board is full and there is no win, then it's a draw.
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)
    })
}

// Add marks to the cell when the user clicks it.
function placemark(cell, currentClass) {
    cell.classList.add(currentClass)
}

// If it's X's turn, turn(true), and vice versa.
function swapTurn() {
    circleTurn = !circleTurn
}


function setCellHoverClass() {
    container.classList.remove(X_CLASS)
    container.classList.remove(O_CLASS)
    circleTurn ? container.classList.add(O_CLASS) : container.classList.add(X_CLASS)
}

// Check if there are a winning combinations
function checkWin(currentClass) {
    return WINNING_COMBINATION.some(combination => { return combination.every(index => { return cellElements[index].classList.contains(currentClass) }) })
}

// Add the score update logic
function updateScore() {
    if (checkWin(O_CLASS)) {
        scores[1] += 1; // O's score
        scoreO.innerText = scores[1];
    } else {
        scores[0] += 1; // X's score
        scoreX.innerText = scores[0];
    }
}

// Update the scoreboard display
function updateScoreboard() {
    scoreX.innerText = scores[0];
    scoreO.innerText = scores[1];

}

scoreReset.addEventListener("click", () => {
    scores[0] = 0;
    scores[1] = 0;
    updateScoreboard()
});

// Let user enter their names before game starts.
function enterNames() {
    playerXName = document.getElementById("enterPlayerX").value;
    playerOName = document.getElementById("enterPlayerO").value;
    if (playerXName) {
        playerX.innerText = `${playerXName}(X): `;
    }
    if (playerOName) {
        playerO.innerText = `${playerOName}(O): `;
    }

}

xButton.addEventListener("click", () => {
    const playerXNameInput = document.getElementById("enterPlayerX").value;
    if (playerXNameInput) {
        playerXName.innerText = `${playerXNameInput}(X): `;
        console.log(`Player X Name: ${playerXNameInput}`);
    }
});

oButton.addEventListener("click", () => {
    const playerONameInput = document.getElementById("enterPlayerO").value;
    if (playerONameInput) {
        playerOName.innerText = `${playerONameInput}(O): `;
        console.log(`Player O Name: ${playerONameInput}`);
    }
});


