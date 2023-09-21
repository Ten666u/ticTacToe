import { state, board, message } from "./main.js";
import { saveState } from "./localStorage.js";
import { easyBot } from "./easyBotLogic.js";
import { hardBot } from "./hardBotLogic.js"

const resetGame = () => {
    state.currentPlayer = "X"
    state.board = ["", "", "", "", "", "", "", "", ""]
    state.gameOver = false
    message.textContent = 'Ход игрока X';

    saveState(state)
    board.innerHTML = `<div class="win_line" id="winLine"></div>`

    renderBoard()
}

const changeGameType = (e) =>{
    let elem = e.target

    if(elem.value == state.gameType){
        return
    }
    
    switch(elem.value){
        case "easyBot":
            state.botMove = easyBot
            break
        
        case "hardBot":
            state.botMove = hardBot
            break
    }
    
    state.gameType = elem.value

    resetGame()
}

const renderBoard = () =>{
    board.innerHTML = `<div class="win_line" id="winLine"></div>`

    let arrCells = state.board

    for(let i = 0; i <= arrCells.length - 1; i++){
        let cell = document.createElement("div")    
        cell.classList = "cell"
        cell.textContent = arrCells[i]

        if(arrCells[i] !== ""){
            cell.style.cursor = "not-allowed"
        }

        cell.addEventListener("click", handleClick(i))
        board.append(cell)
    }

    checkWinner()
}

const handleClick = (index) => {
    return (e) => {
        let elem = e.target

        if (!state.gameOver && state.board[index] === '') {
            state.board[index] = state.currentPlayer;
            elem.textContent = state.currentPlayer;
            elem.style.cursor = "not-allowed"

            state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';

            checkWinner()

            if(state.currentPlayer == "O" && state.gameOver !== true && state.gameType !== "oneByOne"){
                state.botMove()
                console.log(state.botMove);
            }

            saveState(state)
        }
    }
}

const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
        [0, 4, 8], [2, 4, 6] // Диагональные
    ];

    for (let [index, pattern] of winPatterns.entries()) {
        let [a, b, c] = pattern;
        if (state.board[a] && state.board[a] === state.board[b] && state.board[a] === state.board[c]) {
            let winLine = document.getElementById("winLine")
            winLine.style.display = "block"
            winLine.style.zIndex = 2

            if(0 <= index && index <= 2){
                winLine.style.width = "100%"
                winLine.style.height = "3px"
                winLine.style.top = `${42+index*85}px`
            }

            if(3 <= index && index <= 5){
                winLine.style.height = "100%"
                winLine.style.width = "3px"
                winLine.style.left = `${50+(index - 3)*97}px`      
            }

            if(6 <= index){
                winLine.style.height = "150.7%"
                winLine.style.width = "3px"
                winLine.style.left = "50%"
                winLine.style.top = "-65px"
                winLine.style.transform = index == 6 ? `rotate(-48.7deg)` : `rotate(48.7deg)`
            }

            message.textContent = `Победил игрок ${state.board[a]}!`;
            state.gameOver = true
            return state.board[a];
        }
    }

    if (!state.board.includes('')) {
        state.gameOver = true
        message.textContent = 'Ничья!';
        return
    }

    message.textContent = `Ход игрока ${state.currentPlayer}`;
}

export {resetGame, changeGameType, renderBoard, handleClick}