import { director } from "./barrel.js";

const exitButton = document.getElementById('exitGame');
const startFirstPlayer = document.querySelector('.starter .firstPlayer fieldset');
const game = document.querySelector('.game');
const gameBoard = game.querySelector('.board');
const gamePlayersDiv = game.querySelector('.players');
const lines = document.querySelectorAll('.line');
const resetButton = document.getElementById('restartGame');
const startButton = document.getElementById('startGame');
const starterForm = document.querySelector('.starter');
const startGamemode = document.querySelector(`.starter .gamemode fieldset`);

startGamemode.addEventListener('click', (e) => {
    let selected = e.target.value;

    if (selected == 'computer') {
        startFirstPlayer.querySelector(`label[for='first']`).textContent = 'Player';
        startFirstPlayer.querySelector(`label[for='second']`).textContent = 'Computer';

        gamePlayersDiv.querySelector('.player1').textContent = 'Player';
        gamePlayersDiv.querySelector('.player2').textContent = 'Computer';

        starterForm.querySelector('.difficulty').classList.remove('disabled');
    }
    else if (selected == 'two_player') {
        startFirstPlayer.querySelector(`label[for='first']`).textContent = 'Blue';
        startFirstPlayer.querySelector(`label[for='second']`).textContent = 'Red';

        gamePlayersDiv.querySelector('.player1').textContent = 'Blue';
        gamePlayersDiv.querySelector('.player2').textContent = 'Red';

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
        p2Gif.style.backgroundImage = `url(/dist/media/gifs/${gif})`;
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
        let msgDiv = game.querySelector('.message');
        msgDiv.textContent = '';
    }

    let disableBoard = () => {
        gameBoard.classList.add('disabled');
    }

    /* Displays the winner of the match */
    let displayWinner = (winner) => {
        let winnerDiv = game.querySelector('.message');
        winnerDiv.textContent = `${winner} has won!`;
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

    return Object.assign(
        {},
        {
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
            updateCurrentPlayer,
            updateMarker
        },
    )
})();