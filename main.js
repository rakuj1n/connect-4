/*----- constants -----*/
const PLAYER_1 = {
    name: "player 1",
    pieceVal: 1,
    pieceDisp: "#008080",
}
const PLAYER_2 = {
    name: "player 2",
    pieceVal: -1,
    pieceDisp: "#FAC898",
}

/*----- state variables -----*/
let game = {
    turn: null,
    winner: null,
    gameState: null,
    board: [
        [0,0,0,0,0,0], //marker (column) 0 game.board[0]
        [0,0,0,0,0,0], //marker (column) 1
        [0,0,0,0,0,0], //marker (column) 2
        [0,0,0,0,0,0], //marker (column) 3
        [0,0,0,0,0,0], //marker (column) 4
        [0,0,0,0,0,0], //marker (column) 5
        [0,0,0,0,0,0]  //marker (column) 6 game.board[6]
    ],
}

/*----- cached elements  -----*/
let markers = document.querySelectorAll("#markers>div") //array of markers
let message = document.querySelector("h1")
let playAgainButton = document.querySelector("button")

/*----- event listeners -----*/
markers.forEach((x)=> {
    x.addEventListener("click",handleDrop)
})
playAgainButton.addEventListener("click",handlePlayAgain)


/*----- functions -----*/
function init() {
    game.turn = PLAYER_1
    game.winner = null
    game.gameState = "playing"
    game.board = [
        [0,0,0,0,0,0], //marker (column) 0 game.board[0]
        [0,0,0,0,0,0], //marker (column) 1
        [0,0,0,0,0,0], //marker (column) 2
        [0,0,0,0,0,0], //marker (column) 3
        [0,0,0,0,0,0], //marker (column) 4
        [0,0,0,0,0,0], //marker (column) 5
        [0,0,0,0,0,0]  //marker (column) 6 game.board[6]
    ],

    render()
}

function handleDrop(e) {
    let clickedElIndex = Number(e.target.getAttribute("id"))
    if (game.winner != null) {return}
    if (game.board[clickedElIndex].every((x) => (x !== 0))) {return} //breaks if all rows filled
    for (let i = 0; i < game.board[clickedElIndex].length; i++) {
        if (!game.board[clickedElIndex][i]) {
            game.board[clickedElIndex][i] = game.turn.pieceVal
            break
        }
    }
    if (game.turn === PLAYER_1) {game.turn = PLAYER_2}
    else {game.turn = PLAYER_1}
    getWinner()
    if (game.winner !== null) {game.gameState = "gamedone"}
    render()
    console.log(game)
}

function handlePlayAgain() {
    init()
}

function getWinner() {
    //vertical
    for (let i = 0; i < game.board.length; i++) {
        if (game.board[i][0]===0) continue
        let total = game.board[i][0]
        for (let j = 1; j <game.board[i].length; j++) {
            if (Math.sign(total) === Math.sign(game.board[i][j])) {
                total += game.board[i][j]
            }
            if (Math.sign(total) !== Math.sign(game.board[i][j])) {
                total = game.board[i][j] 
            } 
            if (total === 4) {return game.winner = PLAYER_1}
            if (total === -4) {return game.winner = PLAYER_2}
        }
    }
    //horizontal
    for (let j = 0;j<6;j++) {
        let total = game.board[0][j]
        for (let i = 1; i<7; i++) {
            if (Math.sign(game.board[i][j]) === Math.sign(total) ) {
                total += game.board[i][j]
            }
            if (game.board[i][j] === 0 || Math.sign(game.board[i][j]) !== Math.sign(total) ) {
                total = game.board[i][j]
            }
            if (total === 4) {return game.winner = PLAYER_1}
            if (total === -4) {return game.winner = PLAYER_2}
        }
        
    }
    // / diagonal (6 lines) 
    // [0][2],[1][3],[2][4],[3][5]
    if (game.board[0][2] + game.board[1][3] + game.board[2][4] + game.board[3][5] === 4) {return game.winner = PLAYER_1}
    if (game.board[0][2] + game.board[1][3] + game.board[2][4] + game.board[3][5] === -4) {return game.winner = PLAYER_2}
    // [0][1],[1][2],[2][3],[3][4],[4][5]
    let total = game.board[0][1]
    for (let i = 1; i < 5; i++) {
        if (Math.sign(game.board[i][i+1]) === Math.sign(total)) {
            total += game.board[i][i+1]
        }
        if (Math.sign(game.board[i][i+1]) !== Math.sign(total) || game.board[i][i+1] === 0) {
            total = game.board[i][i+1]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [0][0],[1][1],[2][2],[3][3],[4][4],[5][5]
    total = game.board[0][0]
    for (let i = 1; i < 6; i++) {
        if (Math.sign(game.board[i][i]) === Math.sign(total)) {
            total += game.board[i][i]
        }
        if (Math.sign(game.board[i][i]) !== Math.sign(total) || game.board[i][i] === 0) {
            total = game.board[i][i]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [1][0],[2][1],[3][2],[4][3],[5][4],[6][5]
    total = game.board[1][0]
    for (let i = 2; i < 7; i++) {
        if (Math.sign(game.board[i][i-1]) === Math.sign(total)) {
            total += game.board[i][i-1]
        }
        if (Math.sign(game.board[i][i-1]) !== Math.sign(total) || game.board[i][i-1] === 0) {
            total = game.board[i][i-1]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [2][0],[3][1],[4][2],[5][3],[6][4]
    total = game.board[2][0]
    for (let i = 3; i < 7; i++) {
        if (Math.sign(game.board[i][i-2]) === Math.sign(total)) {
            total += game.board[i][i-2]
        }
        if (Math.sign(game.board[i][i-2]) !== Math.sign(total) || game.board[i][i-2] === 0) {
            total = game.board[i][i-2]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [3][0],[4][1],[5][2],[6][3]
    if (game.board[3][0] + game.board[4][1] + game.board[5][2] + game.board[6][3] === 4) {return game.winner = PLAYER_1}
    if (game.board[3][0] + game.board[4][1] + game.board[5][2] + game.board[6][3] === -4) {return game.winner = PLAYER_2}


    // \ diagonal
    // [0][3],[1][2],[2][1],[3][0]
    if (game.board[0][3] + game.board[1][2] + game.board[2][1] + game.board[3][0] === 4) {return game.winner = PLAYER_1}
    if (game.board[0][3] + game.board[1][2] + game.board[2][1] + game.board[3][0] === -4) {return game.winner = PLAYER_2}

    // [0][4],[1][3],[2][2],[3][1],[4][0]
    total = game.board[4][0]
    for (let i = 1; i < 5; i++) {
        if (Math.sign(game.board[4-i][i]) === Math.sign(total)) {
            total += game.board[4-i][i]
        }
        if (Math.sign(game.board[4-i][i]) !== Math.sign(total) || game.board[4-i][i] === 0) {
            total = game.board[4-i][i]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [0][5],[1][4],[2][3],[3][2],[4][1],[5][0]
    total = game.board[5][0]
    for (let i = 1; i < 6; i++) {
        if (Math.sign(game.board[5-i][i]) === Math.sign(total)) {
            total += game.board[5-i][i]
        }
        if (Math.sign(game.board[5-i][i]) !== Math.sign(total) || game.board[5-i][i] === 0) {
            total = game.board[5-i][i]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [1][5],[2][4],[3][3],[4][2],[5][1],[6][0]
    total = game.board[6][0]
    for (let i = 1; i < 6; i++) {
        if (Math.sign(game.board[6-i][i]) === Math.sign(total)) {
            total += game.board[6-i][i]
        }
        if (Math.sign(game.board[6-i][i]) !== Math.sign(total) || game.board[6-i][i] === 0) {
            total = game.board[6-i][i]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [2][5],[3][4],[4][3],[5][2],[6][1]
    total = game.board[6][1]
    for (let i = 2; i < 6; i++) {
        if (Math.sign(game.board[7-i][i]) === Math.sign(total)) {
            total += game.board[7-i][i]
        }
        if (Math.sign(game.board[7-i][i]) !== Math.sign(total) || game.board[7-i][i] === 0) {
            total = game.board[7-i][i]
        }
        if (total === 4) {return game.winner = PLAYER_1}
        if (total === -4) {return game.winner = PLAYER_2}
    }
    // [3][5],[4][4],[5][3],[6][2]
    if (game.board[3][5] + game.board[4][4] + game.board[5][3] + game.board[6][2] === 4) {return game.winner = PLAYER_1}
    if (game.board[3][5] + game.board[4][4] + game.board[5][3] + game.board[6][2] === -4) {return game.winner = PLAYER_2}

}


//render functions ---------------
function render() {
    renderBoard()
    renderMessage()
    renderControls()
}


function renderBoard() {
    for (let i =0 ; i <game.board.length;i++) {
        for (let j =0;j<game.board[0].length;j++) {
            document.querySelector(`#c${i}r${j}`).removeAttribute("style")
        }
    }


    for (let i =0 ; i <game.board.length;i++) {
        for (let j =0;j<game.board[0].length;j++) {
            if (game.board[i][j] === 1) {
                console.log(`#c${i}r${j}`)
                document.querySelector(`#c${i}r${j}`).style.backgroundColor = PLAYER_1.pieceDisp
            }
            if (game.board[i][j] === -1) {
                document.querySelector(`#c${i}r${j}`).style.backgroundColor = PLAYER_2.pieceDisp
            }
        }
    }
}

function renderMessage() {
    message.innerHTML = `${game.turn.name}'s turn`
    if (game.winner !== null) {
        message.innerHTML = `${game.winner.name} wins!`
    }
}

function renderControls() {
    console.log(0)
    if (game.gameState === "playing") {
        playAgainButton.classList.add("hide")
        markers.forEach((x)=> {
            x.classList.remove("hide")
        })
    }
    if (game.gameState === "gamedone") {
        playAgainButton.classList.remove("hide")
        markers.forEach((x)=> {
            x.classList.add("hide")
        })
    }
}

init();

