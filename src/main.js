
// Game State
let currentPlayer = 'X'; // Start with 'X'
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Board cells are empty initially
let gameOver = false; // Flag to check if the game is over

// Elements
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

// Handle cell click
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (gameOver || gameBoard[index] !== '') return; // Ignore if game is over or cell is already taken

        // Mark the cell with the current player's symbol
        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        // Check if there's a winner
        if (checkWinner()) {
            message.textContent = `${currentPlayer} wins!`;
            gameOver = true;
        } else if (gameBoard.every(cell => cell !== '')) {
            // Check for a draw
            message.textContent = "It's a draw!";
            gameOver = true;
        } else {
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `${currentPlayer}'s turn`;
        }
    });
});

// Check for a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6], // Diagonal
    ];

    // Check if any winning combination matches
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
    });
}

// Reset the game (optional)
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    message.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
