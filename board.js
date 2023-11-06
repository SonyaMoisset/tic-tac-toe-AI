let board = Array(3).fill().map(() => Array(3).fill(null));
const boardDiv = document.getElementById('board');
let currentPlayer = 'X';
const scores = { 'X': 0, 'O': 0 };
let gameOver = false;
const notification = document.getElementById('notification');
const resetButton = document.getElementById('resetButton');

function drawBoard() {
    boardDiv.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellDiv = document.createElement('div');
            cellDiv.textContent = cell || '';
            if (!gameOver) {
                cellDiv.addEventListener('click', () => makeMove(rowIndex, colIndex));
            }
            boardDiv.appendChild(cellDiv);
        });
    });
}

function makeMove(row, col) {
    if (!gameOver && !board[row][col]) {
        board[row][col] = currentPlayer;
        drawBoard();
        if (checkWin(currentPlayer)) {
            gameOver = true;
            scores[currentPlayer]++;
            updateScoreBoard();
            notification.textContent = `Player ${currentPlayer} wins!`;
            notification.style.display = 'block';
            resetButton.style.display = 'block';
        } else if (isBoardFull()) {
            gameOver = true;
            notification.textContent = `It's a tie!`;
            notification.style.display = 'block';
            resetButton.style.display = 'block';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            notification.style.display = 'none';
        }
    }
}

function updateScoreBoard() {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.textContent = `Score: X = ${scores['X']}, O = ${scores['O']}`;
    scoreBoard.style.display = 'block';
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell));
}

function checkWin(player) {
    const winConditions = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    return winConditions.some(condition => 
        condition.every(([row, col]) => board[row][col] === player)
    );
}

function resetBoard() {
    board = Array(3).fill().map(() => Array(3).fill(null));
    gameOver = false;
    currentPlayer = 'X';
    drawBoard();
    updateScoreBoard();
    notification.textContent = '';
    notification.style.cssText = 'display: none; border: none; background-color: transparent;';
    resetButton.style.display = 'none';
}

resetButton.addEventListener('click', resetBoard);

drawBoard();
