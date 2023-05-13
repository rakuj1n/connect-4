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
        ["","","","","",""], //marker (column) 0 game.board[0]
        ["","","","","",""], //marker (column) 1
        ["","","","","",""], //marker (column) 2
        ["","","","","",""], //marker (column) 3
        ["","","","","",""], //marker (column) 4
        ["","","","","",""], //marker (column) 5
        ["","","","","",""]  //marker (column) 6 game.board[6]
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
        ["","","","","",""], //marker (column) 0 game.board[0]
        ["","","","","",""], //marker (column) 1
        ["","","","","",""], //marker (column) 2
        ["","","","","",""], //marker (column) 3
        ["","","","","",""], //marker (column) 4
        ["","","","","",""], //marker (column) 5
        ["","","","","",""]  //marker (column) 6 game.board[6]
    ],

    render()
}

function handleDrop(e) {
    let clickedElIndex = Number(e.target.getAttribute("id"))
    if (game.board[clickedElIndex].every((x) => (x !== ""))) {return} //breaks if all rows filled
    for (let i = 0; i < game.board[clickedElIndex].length; i++) {
        if (!game.board[clickedElIndex][i]) {
            game.board[clickedElIndex][i] = game.turn.pieceVal
            break
        }
    }
    if (game.turn === PLAYER_1) {game.turn = PLAYER_2}
    else {game.turn = PLAYER_1}
    render()
    console.log(game)
}

function handlePlayAgain() {
    init()
}

function getWinner() {
    
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
    console.log(game)
    message.innerHTML = `${game.turn.name}'s turn`
}

function renderControls() {
    console.log("")
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

