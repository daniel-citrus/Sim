import { board, bot, displayController } from "Script/barrel.js";

/* Controls the game flow */
export const director = (() => {
    let gameBot;
    let firstPlayer;
    let currentPlayer; // 0 = player1 | 1 = player2
    let gamemode;

    let applyMove = (a, b) => {
        board.update(a, b, currentPlayer);
        displayController.updateMarker(a, b, currentPlayer);
    }

    let botMove = () => {
        displayController.botToggleGif();
        displayController.toggleGameButtons(false);
        displayController.disableBoard();
        
        setTimeout(() => {
            let [botA, botB] = gameBot.move();
            applyMove(botA, botB);
            let [gameIsOver, losingTriangle] = board.checkLoser(currentPlayer);
            
            displayController.botToggleGif();
            displayController.toggleGameButtons(true);

            if (gameIsOver) {
                endGame(1 - currentPlayer, losingTriangle);
                return;
            }
            
            currentPlayer = 1 - currentPlayer;
            displayController.updateCurrentPlayer(currentPlayer);
            displayController.enableBoard();
        }, 1500);
        displayController.botNewGif();
    }

    let endGame = (winner, losingTriangle) => {
        if (gamemode == 'two_player') {
            winner = (winner) ? 'Red' : 'Blue';
        }
        else {
            winner = (winner) ? 'Computer' : 'Player';
        }
        displayController.disableBoard();
        displayController.toggleGameButtons(true);
        displayController.markTriangle(losingTriangle);
        displayController.displayWinner(winner);
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
                gameBot = bot(difficulty.value);
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
        displayController.updateCurrentPlayer(currentPlayer);

        if (gamemode === 'computer') {
            botMove();
        }
    }


    /* Resets game and allows the bot to make the first move if the option is selected */
    let restartGame = () => {
        currentPlayer = firstPlayer;
        displayController.resetBoard(currentPlayer);
        board.resetBrain();

        if (firstPlayer && gamemode === 'computer') {
            botMove();
        }
    }

    let startGame = () => {
        initializeValues();
        displayController.hideStarter();
        displayController.showBoard();
        document.querySelector('.starter .skip').style.display = 'block';
        restartGame();
    }

    return {
        exitGame,
        makeMove,
        restartGame,
        startGame,
    }
})();