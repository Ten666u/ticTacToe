import { state } from "./main.js";

const easyBot = () => {
    let index = Math.floor(Math.random() * 9)

    if(!state.gameOver && state.board[index] === ""){
        let cell = document.querySelectorAll('.cell')[index]
        let clickEvent = new Event('click');
        cell.dispatchEvent(clickEvent);
        return
    }

    return easyBot()
}

export {easyBot}