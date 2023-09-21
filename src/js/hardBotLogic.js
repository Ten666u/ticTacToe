import { state } from "./main.js";

// Функция bestMove выбирает наилучший ход для бота с использованием алгоритма минимакса
const bestMove = () => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < state.board.length; i++) {
        if (state.board[i] === "") {
            state.board[i] = state.currentPlayer;
            const score = minimax(state.board, 0, false);
            state.board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    return move;
};

// Функция minimax реализует алгоритм минимакса для определения оценки наилучшего хода
const minimax = (board, depth, isMaximizing) => {
    const scores = {
        X: -10,
        O: 10,
        Tie: 0,
    };

    const winner = checkWinner(board);

    if (winner !== null) {
        return scores[winner];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = state.currentPlayer;
                const score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = state.currentPlayer === "X" ? "O" : "X";
                const score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
};

// Функция checkWinner проверяет, есть ли победитель в текущей ситуации на доске
const checkWinner = (board) => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
        [0, 4, 8], [2, 4, 6] // Диагональные
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (!board.includes('')) {
        return 'Tie';
    }

    return null;
};

// Функция, которая позволяет компьютеру сделать свой ход
const hardBot = () => {
    if (!state.gameOver) {
        const index = bestMove();
        if (index !== undefined) {
            const cell = document.querySelectorAll('.cell')[index];
            const clickEvent = new Event('click');
            cell.dispatchEvent(clickEvent);
        }
    }
}

export { hardBot }