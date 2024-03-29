import { director } from "Script/barrel.js";

const exitButton = document.getElementById('exitGame');
const startFirstPlayer = document.querySelector('.starter .firstPlayer fieldset');
const game = document.querySelector('.game');
const gameBoard = game.querySelector('.board');
const gamePlayersDiv = game.querySelector('.players');
const lines = document.querySelectorAll('.line');
const msgDiv = game.querySelector('.message');
const resetButton = document.getElementById('restartGame');
const startButton = document.getElementById('startGame');
const starterForm = document.querySelector('.starter');
const startGamemode = document.querySelector(`.starter .gamemode fieldset`);

startGamemode.addEventListener('click', (e) => {
    let selected = e.target.value;
    let player1Form = startFirstPlayer.querySelector(`label[for='first']`);
    let player2Form = startFirstPlayer.querySelector(`label[for='second']`);
    let player1Game = gamePlayersDiv.querySelector('.player1');
    let player2Game = gamePlayersDiv.querySelector('.player2 .name');

    if (selected == 'computer') {
        player1Form.textContent = 'Player';
        player2Form.textContent = 'Computer';
        player1Game.textContent = 'Player';
        player2Game.textContent = 'Computer';
        starterForm.querySelector('.difficulty').classList.remove('disabled');
    }
    else if (selected == 'two_player') {
        player1Form.textContent = 'Blue';
        player2Form.textContent = 'Red';
        player1Game.textContent = 'Blue';
        player2Game.textContent = 'Red';
        starterForm.querySelector('.difficulty').classList.add('disabled');
    }
})

exitButton.addEventListener('click', () => {
    director.exitGame();
})

resetButton.addEventListener('click', () => {
    director.restartGame();
});

startButton.addEventListener('click', () => {
    director.startGame();
});

/* Controls the front-end */
export const displayController = (() => {
    let z_index = 0; // Most recently marked line will appear above all other lines

    // Initialize eventListeners for each line
    for (let line of lines) {
        line.addEventListener('click', () => {
            director.makeMove(line);
        })
    }

    /* Select a new gif for bot to use */
    let botNewGif = () => {
        let gifs = [
            'batman.gif',
            'ha-think.gif',
            'manifestation.gif',
            'waiting.gif'
        ]

        let p2Gif = gamePlayersDiv.querySelector('.gif');
        let gif = gifs[Math.floor(Math.random() * gifs.length)];
        p2Gif.style.backgroundImage = `url(./media/gifs/${gif})`;
    }

    /* Toggle the visibility of bot's gif */
    let botToggleGif = () => {
        let p2After = gamePlayersDiv.querySelector('.gif');
        p2After.style.opacity = (1 - (+p2After.style.opacity));
    }

    let clearBoard = () => {
        for (let line of lines) {
            line.setAttribute('marker', '')
            line.style.zIndex = '';
            line.classList.remove('losingTriangle');
        }
    }

    let clearMessage = () => {
        msgDiv.textContent = '';
    }

    let disableBoard = () => {
        gameBoard.classList.add('disabled');
    }

    /**
     * Game buttons must be disabled while the bot is generating a move, 
     * otherwise the flow of the game will be disrupted.
     * 
     * @param enable - leave empty for toggling,TRUE to enable, FALSE to 
     * disable
     **/
    let toggleGameButtons = (enable = true) => {
        let buttons = game.querySelectorAll('.buttons button');

        buttons.forEach((button) => {
            if (enable) {
                button.classList.remove('disabled');
            }
            else {
                button.classList.add('disabled');
            }
        })
    }

    /* Displays the winner of the match */
    let displayWinner = (winner) => {
        msgDiv.textContent = `${winner} has won!`;
    }

    let enableBoard = () => {
        gameBoard.classList.remove('disabled');
    }

    let findLine = (a, b) => {
        return gameBoard.querySelector(`div[coordinates="${a},${b}"]`);;
    }

    /* Mark the losing triangle */
    let markTriangle = (triangle) => {
        for (let triangleLine of triangle) {
            let line = gameBoard.querySelector(`div[coordinates="${triangleLine[0]},${triangleLine[1]}"]`);

            line.classList.add('losingTriangle');
            line.style = '';
        }
    }

    let showBoard = () => {
        game.style.display = 'grid';
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
        clearMessage();
        clearBoard();
        enableBoard();
        updateCurrentPlayer(firstPlayer);
        botNewGif();
        z_index = 0;
    }

    let updateCurrentPlayer = (player) => {
        (player) ? game.classList.add('p2') : game.classList.remove('p2');
    }

    /* Updates 'marker' attribute value */
    let updateMarker = (a, b, player) => {
        let line = findLine(a, b);

        if (!line) return;

        line.setAttribute('marker', player);
        z_index++;
        line.style.zIndex = z_index;
    }

    return {
        botNewGif,
        botToggleGif,
        disableBoard,
        displayWinner,
        enableBoard,
        hideBoard,
        hideStarter,
        markTriangle,
        resetBoard,
        showBoard,
        showStarter,
        toggleGameButtons,
        updateCurrentPlayer,
        updateMarker
    }
})();