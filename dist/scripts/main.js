/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/sass/style.scss":
/*!***********************************!*\
  !*** ./src/style/sass/style.scss ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://sim-package/./src/style/sass/style.scss?");

/***/ }),

/***/ "./src/scripts/barrel.js":
/*!*******************************!*\
  !*** ./src/scripts/barrel.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   board: () => (/* reexport safe */ Script_board_js__WEBPACK_IMPORTED_MODULE_0__.board),\n/* harmony export */   bot: () => (/* reexport safe */ Script_bot_js__WEBPACK_IMPORTED_MODULE_1__.bot),\n/* harmony export */   director: () => (/* reexport safe */ Script_main_js__WEBPACK_IMPORTED_MODULE_2__.director),\n/* harmony export */   displayController: () => (/* reexport safe */ Script_displayController_js__WEBPACK_IMPORTED_MODULE_3__.displayController)\n/* harmony export */ });\n/* harmony import */ var Script_board_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Script/board.js */ \"./src/scripts/board.js\");\n/* harmony import */ var Script_bot_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Script/bot.js */ \"./src/scripts/bot.js\");\n/* harmony import */ var Script_main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Script/main.js */ \"./src/scripts/main.js\");\n/* harmony import */ var Script_displayController_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Script/displayController.js */ \"./src/scripts/displayController.js\");\n\n\n\n\n\n//# sourceURL=webpack://sim-package/./src/scripts/barrel.js?");

/***/ }),

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   board: () => (/* binding */ board)\n/* harmony export */ });\nconst board = (() => {\n    /*\n        Key/value pair for each line on the board.\n        Examples:\n            (3, 5): 1\n            (1, 2): 0\n    */\n    let boardMap = new Map();\n    let losingTriangle = [];\n\n    /**\n        Checks if currentPlayer has created a triangle on the board\n        @param currentPlayer - player being evaluated\n    */\n    let checkLoser = (currentPlayer) => {\n        let result = false;\n\n        for (let [line, player] of boardMap) {\n            losingTriangle = [];\n\n            if (player != currentPlayer) {\n                continue;\n            }\n\n            let [a, b] = line.split(',');\n            losingTriangle.push([+a, +b]);\n            result = createsTriangle(1, currentPlayer, +a, +b, +a, +b);\n\n            if (result) {\n                break;\n            }\n        }\n\n        return [result, losingTriangle];\n    }\n\n    /** \n        Recursive function that will check whether or not triangle exists by searching line by line.\n\n        **All incoming parameter values must be integers**\n        @param level - nth line of the triangle\n        @param player - the player that marked [aInitial, bInitial]\n        @param aInitial - starting point of the line marked by player\n        @param bInitial - end point of the line marked by player\n        @param a - current line's starting point\n        @param b - current line's end point\n        @return (boolean, value) - true, if triangle is found and the losing player\n    */\n    let createsTriangle = (level, player, aInitial, bInitial, a, b) => {\n        if (!boardMap.has(`${a},${b}`)) {\n            return false;\n        }\n\n        if (player != boardMap.get(`${a},${b}`)) {\n            return false;\n        }\n\n        // Condition for a complete triangle\n        if (level == 2) {\n            if (!boardMap.has(`${aInitial},${b}`)) {\n                return false;\n            }\n\n            if (player == boardMap.get(`${aInitial},${b}`)) {\n                losingTriangle.push([aInitial, b]);\n                return true;\n            }\n\n            return false;\n        }\n\n        a = b;\n\n        for (let i = a + 1; i < 7; i++) {\n            let result = createsTriangle(level + 1, player, aInitial, bInitial, a, i);\n\n            if (result) {\n                losingTriangle.push([a, i]);\n                return result;\n            }\n        }\n\n        return false;\n    }\n\n    let getPossibleMoves = () => {\n        let moves = [[1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [2, 3], [2, 4], [2, 5], [2, 6], [3, 4], [3, 5], [3, 6], [4, 5], [4, 6], [5, 6]];\n        let result = [];\n\n        for (let move of moves) {\n            if (!boardMap.has(`${move[0]},${move[1]}`)) {\n                result.push([move[0], move[1]]);\n            }\n        }\n\n        return result;\n    }\n\n    let resetBrain = () => {\n        boardMap.clear();\n    }\n\n    let update = (a, b, marker) => {\n        boardMap.set(`${a},${b}`, marker);\n    }\n\n    let remove = (a, b) => {\n        boardMap.delete(`${a},${b}`);\n    }\n\n    return {\n        checkLoser,\n        getPossibleMoves,\n        resetBrain,\n        update,\n        remove,\n    }\n})();\n\n//# sourceURL=webpack://sim-package/./src/scripts/board.js?");

/***/ }),

/***/ "./src/scripts/bot.js":
/*!****************************!*\
  !*** ./src/scripts/bot.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   bot: () => (/* binding */ bot)\n/* harmony export */ });\n/* harmony import */ var Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Script/barrel.js */ \"./src/scripts/barrel.js\");\n\n\nconst bot = (difficulty, { getPossibleMoves: getMoves, update, remove, checkLoser } = Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.board,) => {\n    const botNumber = 1; // bot will always have 1 (0 for player)\n\n    /* A random available move is chosen. */\n    let dumbMove = () => {\n        let possibleMoves = getMoves();\n        let movesRemaining = possibleMoves.length;\n\n        if (movesRemaining <= 0) {\n            return;\n        }\n\n        let [a, b] = possibleMoves[getRandomInt(movesRemaining)];\n\n        return [a, b];\n    }\n\n    /* Moves */\n    let normalMove = () => {\n        let possibleMoves = getMoves();\n        let movesRemaining = possibleMoves.length;\n\n        if (movesRemaining <= 0) {\n            return;\n        }\n\n        let a, b;\n\n        while (movesRemaining > 0) {\n            let rand = getRandomInt(movesRemaining);\n            [a, b] = possibleMoves[rand];\n\n            update(a, b, botNumber);\n            let [gameIsOver, t] = checkLoser(botNumber);\n            remove(a, b);\n\n            if (!gameIsOver) {\n                break;\n            }\n\n            possibleMoves.splice(rand, 1);\n            movesRemaining = possibleMoves.length;\n        }\n\n        return [a, b];\n    }\n\n    /* Normal moves are made until there are 10 available moves remaining. Once there are only 10 moves remaining the Min-max algorithm will be used. */\n    let smartMove = () => {\n        let possibleMoves = getMoves();\n        let movesRemaining = possibleMoves.length;\n\n        if (movesRemaining <= 0) {\n            return;\n        }\n        else if (movesRemaining > 10) {\n            return normalMove();\n        }\n\n        let bestScore = Number.NEGATIVE_INFINITY;\n        let score = 0;\n        let a, b;\n\n        for (let move of possibleMoves) {\n            update(move[0], move[1], botNumber);\n            score = minimax(true, botNumber);\n            remove(move[0], move[1]);\n\n            if (bestScore < score) {\n                bestScore = score;\n                a = move[0];\n                b = move[1];\n            }\n        }\n\n        return [a, b];\n    }\n\n    /**\n        Returns a move score depending on how long it takes the match to end.\n        If the maximizing player wins then minimax will return a score >= 0. If the maximizing player loses, the funtion will return a score <= 0.\n        The sooner the maximizing player loses, the lower the score.\n\n        @param maximize - boolean; maximizing player\n        @param currentPlayer - 0 for firstPlayer, 1 for secondPlayer\n        @param alpha - tracks maximizing player's max score\n        @param beta - tracks minimizing player's max score\n    */\n    function minimax(maximize, currentPlayer, alpha, beta) {\n        let possibleMoves = getMoves();\n        let movesRemaining = possibleMoves.length;\n        let [gameOver,] = checkLoser(currentPlayer);\n        let score;\n\n        if (gameOver) {\n            if (maximize) {\n                return -movesRemaining;\n            }\n            else {\n                return movesRemaining;\n            }\n        }\n\n        if (maximize) {\n            let maxEval = Number.NEGATIVE_INFINITY;\n\n            for (let move of possibleMoves) {\n                update(move[0], move[1], currentPlayer);\n                score = minimax(false, 1 - currentPlayer, alpha, beta);\n                remove(move[0], move[1]);\n\n                maxEval = Math.max(maxEval, score);\n                alpha = Math.max(alpha, score);\n\n                if (beta <= alpha) {\n                    break;\n                }\n            }\n\n            return maxEval;\n        }\n        else {\n            let minEval = Number.POSITIVE_INFINITY;\n\n            for (let move of possibleMoves) {\n                update(move[0], move[1], currentPlayer);\n                score = minimax(true, 1 - currentPlayer, alpha, beta);\n                remove(move[0], move[1]);\n\n                minEval = Math.min(minEval, score);\n                beta = Math.min(beta, score);\n            }\n\n            return minEval;\n        }\n    }\n\n    function getRandomInt(max) {\n        return Math.floor(Math.random() * max);\n    }\n\n    let move;\n\n    if (difficulty === 'hard') {\n        move = smartMove;\n    }\n    else if (difficulty === 'medium') {\n        move = normalMove;\n    }\n    else {\n        move = dumbMove;\n    }\n\n    return { move }\n};\n\n//# sourceURL=webpack://sim-package/./src/scripts/bot.js?");

/***/ }),

/***/ "./src/scripts/displayController.js":
/*!******************************************!*\
  !*** ./src/scripts/displayController.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   displayController: () => (/* binding */ displayController)\n/* harmony export */ });\n/* harmony import */ var Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Script/barrel.js */ \"./src/scripts/barrel.js\");\n\n\nconst exitButton = document.getElementById('exitGame');\nconst startFirstPlayer = document.querySelector('.starter .firstPlayer fieldset');\nconst game = document.querySelector('.game');\nconst gameBoard = game.querySelector('.board');\nconst gamePlayersDiv = game.querySelector('.players');\nconst lines = document.querySelectorAll('.line');\nconst msgDiv = game.querySelector('.message');\nconst resetButton = document.getElementById('restartGame');\nconst startButton = document.getElementById('startGame');\nconst starterForm = document.querySelector('.starter');\nconst startGamemode = document.querySelector(`.starter .gamemode fieldset`);\n\nstartGamemode.addEventListener('click', (e) => {\n    let selected = e.target.value;\n    let player1Form = startFirstPlayer.querySelector(`label[for='first']`);\n    let player2Form = startFirstPlayer.querySelector(`label[for='second']`);\n    let player1Game = gamePlayersDiv.querySelector('.player1');\n    let player2Game = gamePlayersDiv.querySelector('.player2 .name');\n\n    if (selected == 'computer') {\n        player1Form.textContent = 'Player';\n        player2Form.textContent = 'Computer';\n        player1Game.textContent = 'Player';\n        player2Game.textContent = 'Computer';\n        starterForm.querySelector('.difficulty').classList.remove('disabled');\n    }\n    else if (selected == 'two_player') {\n        player1Form.textContent = 'Blue';\n        player2Form.textContent = 'Red';\n        player1Game.textContent = 'Blue';\n        player2Game.textContent = 'Red';\n        starterForm.querySelector('.difficulty').classList.add('disabled');\n    }\n})\n\nexitButton.addEventListener('click', () => {\n    Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.director.exitGame();\n})\n\nresetButton.addEventListener('click', () => {\n    Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.director.restartGame();\n});\n\nstartButton.addEventListener('click', () => {\n    Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.director.startGame();\n});\n\n/* Controls the front-end */\nconst displayController = (() => {\n    let z_index = 0; // Most recently marked line will appear above all other lines\n\n    // Initialize eventListeners for each line\n    for (let line of lines) {\n        line.addEventListener('click', () => {\n            Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.director.makeMove(line);\n        })\n    }\n\n    /* Select a new gif for bot to use */\n    let botNewGif = () => {\n        let gifs = [\n            'batman.gif',\n            'ha-think.gif',\n            'manifestation.gif',\n            'waiting.gif'\n        ]\n\n        let p2Gif = gamePlayersDiv.querySelector('.gif');\n        let gif = gifs[Math.floor(Math.random() * gifs.length)];\n        p2Gif.style.backgroundImage = `url(./media/gifs/${gif})`;\n    }\n\n    /* Toggle the visibility of bot's gif */\n    let botToggleGif = () => {\n        let p2After = gamePlayersDiv.querySelector('.gif');\n        p2After.style.opacity = (1 - (+p2After.style.opacity));\n    }\n\n    let clearBoard = () => {\n        for (let line of lines) {\n            line.setAttribute('marker', '')\n            line.style.zIndex = '';\n            line.classList.remove('losingTriangle');\n        }\n    }\n\n    let clearMessage = () => {\n        msgDiv.textContent = '';\n    }\n\n    let disableBoard = () => {\n        gameBoard.classList.add('disabled');\n    }\n\n    /**\n     * Game buttons must be disabled while the bot is generating a move, \n     * otherwise the flow of the game will be disrupted.\n     * \n     * @param enable - leave empty for toggling,TRUE to enable, FALSE to \n     * disable\n     **/\n    let toggleGameButtons = (enable = true) => {\n        let buttons = game.querySelectorAll('.buttons button');\n\n        buttons.forEach((button) => {\n            if (enable) {\n                button.classList.remove('disabled');\n            }\n            else {\n                button.classList.add('disabled');\n            }\n        })\n    }\n\n    /* Displays the winner of the match */\n    let displayWinner = (winner) => {\n        msgDiv.textContent = `${winner} has won!`;\n    }\n\n    let enableBoard = () => {\n        gameBoard.classList.remove('disabled');\n    }\n\n    let findLine = (a, b) => {\n        return gameBoard.querySelector(`div[coordinates=\"${a},${b}\"]`);;\n    }\n\n    /* Mark the losing triangle */\n    let markTriangle = (triangle) => {\n        for (let triangleLine of triangle) {\n            let line = gameBoard.querySelector(`div[coordinates=\"${triangleLine[0]},${triangleLine[1]}\"]`);\n\n            line.classList.add('losingTriangle');\n            line.style = '';\n        }\n    }\n\n    let showBoard = () => {\n        game.style.display = 'grid';\n    }\n\n    let hideBoard = () => {\n        game.style.display = 'none';\n    }\n\n    let showStarter = () => {\n        starterForm.style.display = 'block';\n    }\n\n    let hideStarter = () => {\n        starterForm.style.display = 'none';\n    }\n\n    let resetBoard = (firstPlayer) => {\n        clearMessage();\n        clearBoard();\n        enableBoard();\n        updateCurrentPlayer(firstPlayer);\n        botNewGif();\n        z_index = 0;\n    }\n\n    let updateCurrentPlayer = (player) => {\n        (player) ? game.classList.add('p2') : game.classList.remove('p2');\n    }\n\n    /* Updates 'marker' attribute value */\n    let updateMarker = (a, b, player) => {\n        let line = findLine(a, b);\n\n        if (!line) return;\n\n        line.setAttribute('marker', player);\n        z_index++;\n        line.style.zIndex = z_index;\n    }\n\n    return {\n        botNewGif,\n        botToggleGif,\n        disableBoard,\n        displayWinner,\n        enableBoard,\n        hideBoard,\n        hideStarter,\n        markTriangle,\n        resetBoard,\n        showBoard,\n        showStarter,\n        toggleGameButtons,\n        updateCurrentPlayer,\n        updateMarker\n    }\n})();\n\n//# sourceURL=webpack://sim-package/./src/scripts/displayController.js?");

/***/ }),

/***/ "./src/scripts/main.js":
/*!*****************************!*\
  !*** ./src/scripts/main.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   director: () => (/* binding */ director)\n/* harmony export */ });\n/* harmony import */ var Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Script/barrel.js */ \"./src/scripts/barrel.js\");\n/* harmony import */ var _style_sass_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../style/sass/style.scss */ \"./src/style/sass/style.scss\");\n\n\n\n/* Controls the game flow */\nconst director = (() => {\n    let gameBot;\n    let firstPlayer;\n    let currentPlayer; // 0 = player1 | 1 = player2\n    let gamemode;\n\n    let applyMove = (a, b) => {\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.board.update(a, b, currentPlayer);\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.updateMarker(a, b, currentPlayer);\n    }\n\n    let botMove = () => {\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.botToggleGif();\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.toggleGameButtons(false);\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.disableBoard();\n        \n        setTimeout(() => {\n            let [botA, botB] = gameBot.move();\n            applyMove(botA, botB);\n            let [gameIsOver, losingTriangle] = Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.board.checkLoser(currentPlayer);\n            \n            Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.botToggleGif();\n            Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.toggleGameButtons(true);\n\n            if (gameIsOver) {\n                endGame(1 - currentPlayer, losingTriangle);\n                return;\n            }\n            \n            currentPlayer = 1 - currentPlayer;\n            Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.updateCurrentPlayer(currentPlayer);\n            Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.enableBoard();\n        }, 1500);\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.botNewGif();\n    }\n\n    let endGame = (winner, losingTriangle) => {\n        if (gamemode == 'two_player') {\n            winner = (winner) ? 'Red' : 'Blue';\n        }\n        else {\n            winner = (winner) ? 'Computer' : 'Player';\n        }\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.disableBoard();\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.toggleGameButtons(true);\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.markTriangle(losingTriangle);\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.displayWinner(winner);\n    }\n\n    let exitGame = () => {\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.hideBoard();\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.showStarter();\n    }\n\n    /* This function must be executed before any other function */\n    let initializeValues = () => {\n        let firstPlayerSymbol = document.getElementsByName('symbol');\n\n        for (let player of firstPlayerSymbol) {\n            if (player.checked) {\n                firstPlayer = +player.value;\n                currentPlayer = firstPlayer;\n            }\n        }\n\n        let gameMode = document.getElementsByName('gamemode');\n\n        for (let mode of gameMode) {\n            if (mode.checked) {\n                gamemode = mode.value;\n            }\n        }\n\n        if (gamemode === 'two_player') {\n            return;\n        }\n\n        let gameDifficulty = document.getElementsByName('difficulty');\n\n        for (let difficulty of gameDifficulty) {\n            if (difficulty.checked) {\n                gameBot = (0,Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.bot)(difficulty.value);\n            }\n        }\n    }\n\n    let makeMove = (line) => {\n        if (line.getAttribute('marker') !== '') {\n            return;\n        }\n\n        let [a, b] = line.getAttribute('coordinates').split(',');\n        applyMove(+a, +b);\n        let [gameOver, losingTriangle] = Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.board.checkLoser(currentPlayer);\n\n        if (gameOver) {\n            endGame(1 - currentPlayer, losingTriangle);\n            return;\n        }\n\n        currentPlayer = 1 - currentPlayer;\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.updateCurrentPlayer(currentPlayer);\n\n        if (gamemode === 'computer') {\n            botMove();\n        }\n    }\n\n    /* Resets game and allows the bot to make the first move if the option is selected */\n    let restartGame = () => {\n        currentPlayer = firstPlayer;\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.resetBoard(currentPlayer);\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.board.resetBrain();\n\n        if (firstPlayer && gamemode === 'computer') {\n            botMove();\n        }\n    }\n\n    let startGame = () => {\n        initializeValues();\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.hideStarter();\n        Script_barrel_js__WEBPACK_IMPORTED_MODULE_0__.displayController.showBoard();\n        document.querySelector('.starter .skip').style.display = 'block';\n        restartGame();\n    }\n\n    return {\n        exitGame,\n        makeMove,\n        restartGame,\n        startGame,\n    }\n})();\n\n//# sourceURL=webpack://sim-package/./src/scripts/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/main.js");
/******/ 	
/******/ })()
;