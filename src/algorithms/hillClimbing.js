

function Node(row, col) {
    return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

function pushToScreen(grid) {
    for (let row = 0; row < 9; row++){
        for (let col = 0; col <9; col++){
            Node(row,col).value = grid[row][col]
        }
    }
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }

  function removeElement(arrayName,arrayElement)
 {
    for (var j = 0; j < arrayName.length; j++) {
        for(var i=0; i<arrayName.length;i++ )
        { 
            if(arrayName[i]===arrayElement)
                arrayName.splice(i,1); 
        }
    }
  }

//Fills in grid by rows
// function fillInZeros(grid) {
//     let nums= [1,2,3,4,5,6,7,8,9]

//     for(let row = 0; row < 9; row++) {
//         for (let col = 0; col < 9; col ++){
//             if (grid[row][col] !== 0) {
//                 nums[grid[row][col] - 1] = 0
//             }
//         }
//         console.log(nums)
//         removeElement(nums,0)
//         console.log(nums)
//         shuffle(nums)
//         for (let col = 0; col < 9; col ++){
//             if (grid[row][col] === 0) {
//                 grid[row][col] = nums.pop()
//             }
//         }
//         nums= [1,2,3,4,5,6,7,8,9]
//     }
// }

//fills in grid by squares
function fillInZeros(grid) {
    let nums= [1,2,3,4,5,6,7,8,9]
    let squareRow = 0
    let squareCol = 0

    for (let square = 0; square < 9; square++) {
        for (let row = squareRow; row<3+squareRow; row++) {
            for (let col = squareCol; col < 3+squareCol; col++) {
                if (grid[row][col] !== 0) {
                    nums[grid[row][col] - 1] = 0
                }
            }
        }
        removeElement(nums,0)
        shuffle(nums)
        for (let row = squareRow; row<3+squareRow; row++) {
            for (let col = squareCol; col < 3+squareCol; col++) {
                if (grid[row][col] === 0) {
                    grid[row][col] = nums.pop()
                }
            }
        }
        nums= [1,2,3,4,5,6,7,8,9]
        if (squareCol !== 6) {
            squareCol = squareCol + 3
        }
        else {
            squareCol = 0
            squareRow = squareRow + 3
        }
    }

    pushToScreen(grid)
}

function energy(grid) {
    let E = 0
    let seen = []

    //check the rows
    for (let row = 0; row < 9; row ++) {
        for (let col = 0; col < 9; col ++) {
            if (seen.includes(grid[row][col])) {
                E = E + 1
            }
            else {
                seen.push(grid[row][col])
            }
        }
        seen = []
    }
    //check the columns
    for (let col = 0; col < 9; col ++) {
        for (let row = 0; row < 9; row ++) {
            if (seen.includes(grid[row][col])) {
                E = E + 1
            }
            else {
                seen.push(grid[row][col])
            }
        }
        seen = []
    }

    return E
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getImmutableSquares(mutable) {
    let count = 0
    let immutableSquares = []
    let squareRow = 0
    let squareCol = 0

    for (let square = 0; square < 9; square++) {
        for (let row = squareRow; row<3+squareRow; row++) {
            for (let col = squareCol; col < 3+squareCol; col++) {
                if (!mutable[row][col]){
                    count++
                }
            }
        }
        
        if (count >= 8) {
            immutableSquares.push([squareRow,squareCol])
        }

        count = 0

        if (squareCol !== 6) {
            squareCol = squareCol + 3
        }
        else {
            squareCol = 0
            squareRow = squareRow + 3
        }
    }

    return immutableSquares
}

function getNode2(mutable,row1,row2,col1,col2,squareRow,squareCol) {
    if (!mutable[row2][col2]){
        return getNode2(mutable, row1, getRandomInt(3)+squareRow, col1, getRandomInt(3)+squareCol, squareRow,squareCol)
    }
    else{
        if (row1 === row2 && col1 === col2) {
            return getNode2(mutable, row1, getRandomInt(3)+squareRow, col1, getRandomInt(3)+squareCol, squareRow,squareCol)
        }
        else{
            console.log(row1,row2,col1,col2)
            return {row2,col2}
        }
    }
}

function move (grid, mutable,T,moves, immutableSquares) {
    //pick a random square
    let squareRow = 3*getRandomInt(3)
    let squareCol = 3*getRandomInt(3)
    //to handle case where a full square in immutable
    for (let i = 0; i < immutableSquares.length; i++){
        while (squareRow === immutableSquares[i][0] && squareCol === immutableSquares[i][1]){
            squareRow = 3*getRandomInt(3)
            squareCol = 3*getRandomInt(3)
        }
    }

    //pick a random 2 nodes in that square that aren't the same
    let row1 = getRandomInt(3) + squareRow
    let col1 = getRandomInt(3) + squareCol

    let row2 = getRandomInt(3)+ squareRow
    let col2 = getRandomInt(3)+ squareCol

    while (!mutable[row1][col1]){
        row1 = getRandomInt(3) + squareRow
        col1 = getRandomInt(3) + squareCol
    }
    
    let node2 = getNode2(mutable,row1,row2,col1,col2,squareRow,squareCol)
    row2 = node2.row2
    col2 = node2.col2

    let EC = energy(grid)
    if(EC === 0){
        return
    }

    //swap their values
    let temp = grid[row2][col2]
    grid[row2][col2] = grid[row1][col1]
    grid[row1][col1] = temp

    let EN = energy(grid)
    //If new energy is less, keep new grid
    if (EN < EC) {
        moves.push([row1,col1, grid[row1][col1],EN],[row2,col2,grid[row2][col2],EN])
    }
    else {
        //otherwise swap back to keep original grid
        temp = grid[row2][col2]
        grid[row2][col2] = grid[row1][col1]
        grid[row1][col1] = temp
        //just highlight the squares but don't change the values
        moves.push([row1,col1, grid[row1][col1],EC],[row2,col2,grid[row2][col2],EC])

    }
    // console.log(EN)
}

function solve(grid, moves, mutable) {
    //check if any squares have 8 or 9 immutables
    let immutableSquares = getImmutableSquares(mutable)
    if (immutableSquares.length === 9){
        document.getElementById('Error').innerHTML = 'Trivial solution detected.'
        return
    }

    //initialize random state with 9x9 squares complete
    fillInZeros(grid)

    // Do moves and lower the temperature over time
    let Tmax = 5
    let Tmin = 0.1
    for (let T = Tmax; T > Tmin; T = 0.9999*T){
        move(grid,mutable,T,moves, immutableSquares)
        
    }
}

export default function simulatedAnnealing (grid) {
    const mutable = []

    //Prevents the algorithm from changing original node values
    for (let row = 0; row < 9; row ++) {
        let temp = []
        for (let col = 0; col < 9; col ++){
            if (grid[row][col] === 0 || grid[row][col] === '0') {
                temp.push(true)
            }
            else{
                temp.push(false)
            }
        }
        mutable.push(temp)
    }

    //a list of the moves the algorithm will take
    let moves = []

    solve(grid,moves, mutable)

    return moves
}