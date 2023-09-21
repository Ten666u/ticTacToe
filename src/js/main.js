import { getState } from "./localStorage.js";
import { resetGame, changeGameType, renderBoard } from "./gameLogic.js";

import "../assets/styles/bootstrap-reboot.min.css"
import "../assets/styles/style.css"

const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');
const typeSelect = document.getElementById("typeSelect")

let state = {
    currentPlayer: "X",
    board: ["", "", "", "", "", "", "", "", ""],
    gameOver: false,
    gameType: "oneByOne",
    botMove: () =>{},
}

if(getState()){
    state = getState()
    typeSelect.value = state.gameType
}
    
renderBoard()

typeSelect.addEventListener("change", changeGameType)
resetButton.addEventListener('click', resetGame);

export {state, board, message}