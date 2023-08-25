export const board = (() => {
    /*
        Key/value pair for each line on the board.
        Examples:
            (3, 5): 1
            (1, 2): 0
    */
    let boardMap = new Map();
    let losingTriangle = [];

    /**
        Checks if currentPlayer has created a triangle on the board
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
        Recursive function that will check whether or not triangle exists by searching line by line.

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

    return {
        checkLoser,
        getPossibleMoves,
        resetBrain,
        update,
        remove,
        boardMap
    }
})();