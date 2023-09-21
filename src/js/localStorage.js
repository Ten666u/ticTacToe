import { easyBot } from "./easyBotLogic.js"
import { hardBot } from "./hardBotLogic.js"

const saveState = (state) =>{
    localStorage.setItem("state", JSON.stringify(state))
}

const getState = () =>{
    if(localStorage.state){
        let state = JSON.parse(localStorage.getItem("state"))
        
        switch (state.gameType){
            case "oneByOne":
                state.botMove = () => {}
                break

            case "easyBot":
                state.botMove = easyBot
                break

            case "hardBot":
                state.botMove = hardBot
                break
        } 

        return state
    }

    return false
}

export {saveState, getState}