import {board} from "./barrel.js";

export const bot = (difficulty) => {
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
        else if (movesRemaining > 10) {
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
        }

        return [a, b];
    }

    /**
        Returns a move score depending on how long it takes the match to end.
        If the maximizing player wins then minimax will return a score >= 0. If the maximizing player loses, the funtion will return a score <= 0.
        The sooner the maximizing player loses, the lower the score.

        @param maximize - boolean; maximizing player
        @param currentPlayer - 0 for firstPlayer, 1 for secondPlayer
        @param alpha - tracks maximizing player's max score
        @param beta - tracks minimizing player's max score
    */
    function minimax(maximize, currentPlayer, alpha, beta) {
        let possibleMoves = board.getPossibleMoves();
        let movesRemaining = possibleMoves.length;
        let [gameOver,] = board.checkLoser(currentPlayer);
        let score;

        if (gameOver) {
            if (maximize) {
                return -movesRemaining;
            }
            else {
                return movesRemaining;
            }
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