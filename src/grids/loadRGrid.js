function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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

export default function loadRGrid() {
    let grid = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    for (let row=0; row < 9; row ++) {
        for (let col=0; col< 9; col++) {
          if (Math.random() > 0.7) {
            let temp = getRandomInt(9) +1

            let timesTried = 0
            let check = checkValue(grid,row,col,temp)
            while(!check && timesTried < 50) {
                // console.log(grid[row][col])
                temp = getRandomInt(8)+1
                check = checkValue(grid,row,col,temp)
                timesTried++
            }
            grid[row][col] = temp
          }

        }
    }

    return grid
}