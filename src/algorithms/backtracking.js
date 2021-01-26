function checkRow(grid, row, value) {
    for (let col = 0; col < 9; col++) {
        if (grid[row][col] === value) {
            return false
        }
    }
    return true
}

function checkCol(grid, col, value) {
    for (let row = 0; row < 9; row++) {
        if (grid[row][col] === value) {
            return false
        }
    }
    return true
}

function checkSquare(grid, row, col,value) {
    let squareRow = Math.floor(row/3)*3
    let squareCol = Math.floor(col/3)*3

    for (let i = 0; i<3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[squareRow + i][squareCol + j] === value)
                return false
        }
    }
    return true
}

function checkValue(grid, row, col, value) {
    if (checkRow(grid, row, value) &&
        checkCol(grid, col,value) &&
        checkSquare(grid, row,col,value)) {
            return true
        }
        return false
    }

function nextEmptySpot(grid ) {
    for (var row = 0; row < 9; row++){
        for (var col = 0; col <9; col++){
            if (grid[row][col] === 0 || grid[row][col] === '0') {
                return [row,col]
            }
        }
    }
    return [-1,-1]
}

function solve(grid,moves) {
    //find the next empty spot to look at
    let emptySpot = nextEmptySpot(grid)
    let row = emptySpot[0]
    let col = emptySpot[1]

    //check if there are no more empty spots
    if (row === -1) {
        return
    }

    //if the current node can change, do so and recursively call solve again
    for (let num = 1; num <=9; num++) {
        if (checkValue(grid, row,col,num)){
            grid[row][col] = num
            moves.push([row,col,num])
            solve(grid,moves)
        }
    
        //if the current node can't change but there are other empty spots then we need to back up
        if(nextEmptySpot(grid)[0] !== -1) {
            grid[row][col] = 0
            moves.push([row,col,0])
            }
    }
}

export default function backtracking(grid) {

    let moves = []

    //check if the initial board state is solvable
    for (let row =0; row < 9; row ++) {
        for (let col=0; col < 9; col++){
            if (grid[row][col] !== 0 && grid[row][col] !== '0'){
                //remove value so that checkValue doesn't count the current square and thus always return false
                let temp = grid[row][col]
                grid[row][col] = 0

                if (!checkValue(grid,row,col,temp)){
                    return {moves: [],solvable: false}
                }

                grid[row][col] = temp
            }
        }
    }

    //call main solve function that does all the work
    solve(grid,moves)

    return {moves: moves,solvable: true}
}