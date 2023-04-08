const exitButton = document.getElementById('exitGame');
const game = document.querySelector('.game');
const gameBoard = game.querySelector('.board');
const lines = document.querySelectorAll('.line');
const resetButton = document.getElementById('restartGame');
const startButton = document.getElementById('startGame');
const starterForm = document.querySelector('.starter');

exitButton.addEventListener('click', () => {
    director.exitGame();
})

resetButton.addEventListener('click', () => {
    console.clear();
    director.restartGame();
});

startButton.addEventListener('click', () => {
    director.startGame();
});

let bot = (difficulty) => {
    const botNumber = 1; // bot will always have 1 (0 for player)

    let dumbMove = () => {
        let possibleMoves = board.getPossibleMoves();
        let movesRemaining = possibleMoves.length;

        if (movesRemaining <= 0) {
            return;
        }

        let [a, b] = possibleMoves[getRandomInt(movesRemaining)];

        return [a, b];
    }

    let normalMove = () => {
        let possibleMoves = board.getPossibleMoves();
        let movesRemaining = possibleMoves.length;

        if (movesRemaining <= 0) {
            return;
        }

        let a, b;

        while (movesRemaining > 0) {
            let rand = getRandomInt(movesRemaining);
            [a, b] = possibleMoves[rand];

            board.update(a, b, botNumber);
            let [gameIsOver, t] = board.checkLoser(botNumber);
            board.remove(a, b);

            if (!gameIsOver) {
                break;
            }

            possibleMoves.splice(rand, 1);
            movesRemaining = possibleMoves.length;
        }

        return [a, b];
    }

    let smartMove = () => {
        let possibleMoves = board.getPossibleMoves();
        let movesRemaining = possibleMoves.length;

        if (movesRemaining <= 0) {
            return;
        }
        else if (movesRemaining > 9) {
            return normalMove();
        }

        let bestScore = Number.NEGATIVE_INFINITY;
        let score = 0;
        let a, b;

        for (let move of possibleMoves) {
            board.update(move[0], move[1], botNumber);
            score = minimax(true, botNumber);
            board.remove(move[0], move[1]);

            if (bestScore < score) {
                bestScore = score;
                a = move[0];
                b = move[1];
            }

            if (bestScore == 15) {
                break;
            }
        }

        return [a, b];
    }

    function minimax(maximize, currentPlayer, alpha, beta) {
        let possibleMoves = board.getPossibleMoves();
        let movesRemaining = possibleMoves.length;
        let [gameOver,] = board.checkLoser(currentPlayer);
        let score;

        if (gameOver) {
            if (maximize) {
                return -movesRemaining;
            }

            return 15 - movesRemaining;
        }

        if (maximize) {
            let maxEval = Number.NEGATIVE_INFINITY;

            for (let move of possibleMoves) {
                board.update(move[0], move[1], currentPlayer);
                score = minimax(false, 1 - currentPlayer, alpha, beta);
                board.remove(move[0], move[1]);

                maxEval = Math.max(maxEval, score);
                alpha = Math.max(alpha, score);

                if (beta <= alpha) {
                    break;
                }
            }

            return maxEval;
        }
        else {
            let minEval = Number.POSITIVE_INFINITY;

            for (let move of possibleMoves) {
                board.update(move[0], move[1], currentPlayer);
                score = minimax(true, 1 - currentPlayer, alpha, beta);
                board.remove(move[0], move[1]);

                minEval = Math.min(minEval, score);
                beta = Math.min(beta, score);
            }

            return minEval;
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let move;

    if (difficulty === 'hard') {
        move = smartMove;
    }
    else if (difficulty === 'medium') {
        move = normalMove;
    }
    else {
        move = dumbMove;
    }


    return Object.assign(
        {},
        { move }
    )
};

const board = (() => {
    let boardMap = new Map();
    let losingTriangle = [];

    /**
        Checks the entire boardMap for a losing triangle
        made by currentPlayer
        @param currentPlayer - player being evaluated
    */
    let checkLoser = (currentPlayer) => {
        let result = false;

        for (let [line, player] of boardMap) {
            losingTriangle = [];

            if (player != currentPlayer) {
                continue;
            }

            let [a, b] = line.split(',');
            losingTriangle.push([+a, +b]);
            result = createsTriangle(1, currentPlayer, +a, +b, +a, +b);

            if (result) {
                break;
            }
        }

        return [result, losingTriangle];
    }

    /** 
        Recursive function that will check whether or not triangle exists starting on line aInitial to bInitial.

        **All incoming parameter values must be integers**
        @param level - nth line of the triangle
        @param player - the player that marked [aInitial, bInitial]
        @param aInitial - starting point of the line marked by player
        @param bInitial - end point of the line marked by player
        @param a - current line's starting point
        @param b - current line's end point
        @return (boolean, value) - true, if triangle is found and the losing player
    */
    let createsTriangle = (level, player, aInitial, bInitial, a, b) => {
        if (!boardMap.has(`${a},${b}`)) {
            return false;
        }

        if (player != boardMap.get(`${a},${b}`)) {
            return false;
        }

        // Condition for a complete triangle
        if (level == 2) {
            if (!boardMap.has(`${aInitial},${b}`)) {
                return false;
            }

            if (player == boardMap.get(`${aInitial},${b}`)) {
                losingTriangle.push([aInitial, b]);
                return true;
            }

            return false;
        }

        a = b;

        for (let i = a + 1; i < 7; i++) {
            let result = createsTriangle(level + 1, player, aInitial, bInitial, a, i);

            if (result) {
                losingTriangle.push([a, i]);
                return result;
            }
        }

        return false;
    }

    let getPossibleMoves = () => {
        let moves = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 3], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6], [4, 5], [4, 6], [5, 6]];
        let result = [];

        for (let move of moves) {
            if (!boardMap.has(`${move[0]},${move[1]}`)) {
                result.push([move[0], move[1]]);
            }
        }

        return result;
    }

    let resetBrain = () => {
        boardMap.clear();
    }

    let update = (a, b, marker) => {
        boardMap.set(`${a},${b}`, marker);
    }

    let remove = (a, b) => {
        boardMap.delete(`${a},${b}`);
    }

    return Object.assign(
        {},
        {
            checkLoser,
            getPossibleMoves,
            resetBrain,
            update,
            remove,
            boardMap
        },
    );
})();

// Controls the game flow
const director = (() => {
    let myBot;
    let firstPlayer;
    let currentPlayer; // 0 = player1 | 1 = player2
    let gamemode;

    let applyMove = (a, b) => {
        board.update(a, b, currentPlayer);
        displayController.updateMarker(a, b, currentPlayer);
    }

    let endGame = (winner, losingTriangle) => {
        winner = (winner) ? 'Red' : 'Blue';
        console.log(`Winner: ${winner}, Triangle: ${losingTriangle}`);
        displayController.disableBoard();
    }

    let exitGame = () => {
        displayController.hideBoard();
        displayController.showStarter();
    }

    /* This function must be executed before any other function */
    let initializeValues = () => {
        let firstPlayerSymbol = document.getElementsByName('symbol');

        for (let player of firstPlayerSymbol) {
            if (player.checked) {
                firstPlayer = +player.value;
                currentPlayer = firstPlayer;
            }
        }

        let gameMode = document.getElementsByName('gamemode');

        for (let mode of gameMode) {
            if (mode.checked) {
                gamemode = mode.value;
            }
        }

        if (gamemode === 'two_player') {
            return;
        }

        let gameDifficulty = document.getElementsByName('difficulty');

        for (let difficulty of gameDifficulty) {
            if (difficulty.checked) {
                myBot = bot(difficulty.value);
            }
        }
    }

    let makeMove = (line) => {
        if (line.getAttribute('marker') !== '') {
            return;
        }

        let [a, b] = line.getAttribute('coordinates').split(',');
        applyMove(+a, +b);
        let [gameOver, losingTriangle] = board.checkLoser(currentPlayer);

        if (gameOver) {
            endGame(1 - currentPlayer, losingTriangle);
            return;
        }

        currentPlayer = 1 - currentPlayer;

        if (gamemode === 'computer') {
            let [botA, botB] = myBot.move();
            applyMove(botA, botB);
            let [gameIsOver, losingTriangle] = board.checkLoser(currentPlayer);

            if (gameIsOver) {
                endGame(1 - currentPlayer, losingTriangle);
                return;
            }
            currentPlayer = 1 - currentPlayer;
        }
        else {
            displayController.updateCurrentPlayer(currentPlayer);
        }
    }

    /*
        Resets game and allows the bot to make the first move if the option is selected
     */
    let restartGame = () => {
        currentPlayer = firstPlayer;
        displayController.resetBoard(currentPlayer);
        board.resetBrain();

        if (firstPlayer && gamemode === 'computer') {
            let [a, b] = myBot.move();
            applyMove(a, b);
            currentPlayer = 1 - currentPlayer;
            displayController.updateCurrentPlayer(currentPlayer);
        }
    }

    let startGame = () => {
        initializeValues();
        displayController.hideStarter();
        displayController.showBoard();
        restartGame();
    }

    return Object.assign(
        {},
        {
            exitGame,
            makeMove,
            restartGame,
            startGame,
        },
    )
})();

// Controls the front-end
const displayController = (() => {
    let z_index = 0; // Most recently marked line will appear above all other lines

    // Initialize eventListeners for each line
    for (let line of lines) {
        line.addEventListener('click', () => {
            director.makeMove(line);
        })
    }

    let clearBoard = () => {
        for (let line of lines) {
            line.setAttribute('marker', '')
            line.style.zIndex = '';
        }
    }

    let disableBoard = () => {
        gameBoard.classList.add('disabled');
    }

    let enableBoard = () => {
        gameBoard.classList.remove('disabled');
    }

    let findLine = (a, b) => {
        for (let line of lines) {
            if (line.getAttribute('coordinates') == `${a},${b}`) {
                return line;
            }
        }

        return null;
    }

    let showBoard = () => {
        game.style.display = 'flex';
    }

    let hideBoard = () => {
        game.style.display = 'none';
    }

    let showStarter = () => {
        starterForm.style.display = 'block';
    }

    let hideStarter = () => {
        starterForm.style.display = 'none';
    }

    let resetBoard = (firstPlayer) => {
        clearBoard();
        enableBoard();
        updateCurrentPlayer(firstPlayer);
        z_index = 0;
    }

    let updateCurrentPlayer = (player) => {
        (player) ? gameBoard.classList.add('p2') : gameBoard.classList.remove('p2');
    }

    // Updates 'marker' attribute value
    let updateMarker = (a, b, player) => {
        let line = findLine(a, b);

        if (!line) return;

        line.setAttribute('marker', player);
        z_index++;
        line.style.zIndex = z_index;
    }

    return Object.assign(
        {},
        {
            disableBoard,
            hideBoard,
            hideStarter,
            resetBoard,
            showBoard,
            showStarter,
            updateCurrentPlayer,
            updateMarker
        },
    )
})();