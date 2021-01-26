function Node(row, col) {
    return document.getElementById(`node-${row}-${col}`)
} // Gets a node from the screen

function NodeVal(row,col) {
    return Number(Node(row,col).value)
}

function showErrors(length) {
    let seen = []

    setTimeout(() => {
        //check the rows
    for (let row = 0; row < 9; row ++) {
        for (let col = 0; col < 9; col ++) {
            if (seen.includes(NodeVal(row,col))) {
                Node(row,col).className = 'node-finish'
            }
            else {
                seen.push(NodeVal(row,col))
            }
        }
        seen = []
    }
    //check the columns
    for (let col = 0; col < 9; col ++) {
        for (let row = 0; row < 9; row ++) {
            if (seen.includes(NodeVal(row,col))) {
                Node(row,col).className = 'node-finish'
            }
            else {
                seen.push(NodeVal(row,col))
            }
        }
        seen = []
    }
    }, 1000*Math.log(Math.pow(length+2,5))+1000)
}

export default function visualizeSimulatedAnnealing(moves,changeNodeVal) {

    //check for completed grid
    if (moves.length === 0){
        return
    }

    //Set initial Error
    setTimeout(() => {
        document.getElementById('Error').innerHTML = `Error: ${moves[0][3]}`
    }, 100*Math.log(Math.pow(0,5)))

    for (let i = 2; i < moves.length; i = i+2) {
    
        setTimeout(() => {
            Node(moves[i][0],moves[i][1]).className = 'node-start' //current node that we may or may not change
            Node(moves[i+1][0],moves[i+1][1]).className = 'node-start' // other current node
        }, 1000*Math.log(Math.pow(i,5)))
        setTimeout(() => {
            //Switch values
            Node(moves[i][0],moves[i][1]).value = moves[i][2]
            Node(moves[i+1][0],moves[i+1][1]).value = moves[i+1][2]
            //Update Error
            document.getElementById('Error').innerHTML = `Error: ${moves[i][3]}`
            // changeNodeVal(moves[i][0],moves[i][1],moves[i][2])
            // changeNodeVal(moves[i+1][0],moves[i+1][1],moves[i+1][2])
            Node(moves[i][0],moves[i][1]).className = 'node' //remove color since we move onto the next pair of nodes
            Node(moves[i+1][0],moves[i+1][1]).className = 'node'
            
        }, 1000*Math.log(Math.pow(i+2,5)))
    }

// This starts off linear but tapers off fast. The first two squares stay yellow for whatever reason
//     setTimeout(() => {
//         Node(moves[i][0],moves[i][1]).className = 'node-start' //color node about to be changed
//         Node(moves[i+1][0],moves[i+1][1]).className = 'node-start'
//         document.getElementById('Error').innerHTML = `Error: ${moves[i-2][3]}`
//     }, (i < 20 ? 1000*i +1000: 18000 + 4000*Math.sqrt(Math.log(i-20))))
//     setTimeout(() => {
//         Node(moves[i][0],moves[i][1]).value = moves[i][2]
//         Node(moves[i+1][0],moves[i+1][1]).value = moves[i+1][2]
//         // changeNodeVal(moves[i][0],moves[i][1],moves[i][2])
//         // changeNodeVal(moves[i+1][0],moves[i+1][1],moves[i+1][2])
//         Node(moves[i][0],moves[i][1]).className = 'node' //remove color from previous node if we back up
//         Node(moves[i+1][0],moves[i+1][1]).className = 'node'
        
//     },  (i < 21 ? 1000*(i+1)+1000 : 18000 + 4000*Math.sqrt(Math.log(i+1-20))))
// }

    showErrors(moves.length)
}