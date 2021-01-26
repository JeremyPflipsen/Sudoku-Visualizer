import React, { Component } from "react";
import './About.css'

export default class About extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.chooseAbout = this.chooseAbout.bind(this)
      }

    chooseAbout(alg) {
        switch (alg) {
            case 1:
                return (
                    <div>
                    Backtracking is essentially structured guessing until you find 
                    a solution that works.
                    <br></br>
                    <br></br>
                    Step 1: Choose 1x1 Square
                    <br></br>
                    Here we choose the top-left-most 1x1 square whose value is 0.
                    <br></br>
                    <br></br>
                    Step 2: Choose Number
                    <br></br>
                    A conflict is when a the number in a 1x1 square already appears
                    in the same row, column, or 3x3 square. Choose the lowest number
                    1-9 that doesn't cause a conflict and put it in the current chosen
                    square. If all of the numbers 1-9 cause conflicts in the current square
                    then go to step 3. Otherwise skip step 3 and go to step 4.
                    <br></br>
                    <br></br>
                    Step 3: Backtrack
                    <br></br>
                    Back up to the previous chosen square. Chose the lowest number that
                    is greater than what was previously in that square. So if the previous 
                    chosen square had a 4, now start checking the numbers 5-9. If these all
                    cause conflicts, then repeat step 3 again.
                    <br></br>
                    <br></br>
                    Step 4: Repeat
                    <br></br>
                    Start again at step 1 until you've filled in all the squares. If there
                    is no solution then reset all the squares back to 0.
                    </div>
                    )
            
            case 2: 
                return (
                    <div>
                    Hill Climbing is an example of a greedy algorithm, meaning that
                    at each step in the algorithm, it chooses the option that maximizes
                    its short-term gain to the next step. 
                    <br></br>
                    <br></br>
                    Step 1: Initialize
                    <br></br>
                    Fill all of the 3x3 squares with the numbers 1-9  in a random
                    arrangement so that there are no duplicates in the 3x3 squares.
                    There will be conflicts in the rows and columns.
                    <br></br>
                    <br></br>
                    Step 2: Count Error
                    <br></br>
                    For each conflict in the grid, increase the total Error.
                    <br></br>
                    <br></br>
                    Step 3: Switch Squares
                    <br></br>
                    Choose two random 1x1 squares in the same 3x3 square. If switching
                    their numbers lowers the total Error in the grid, then make the
                    switch. Otherwise do not.
                    <br></br>
                    <br></br>
                    Step 4: Repeat
                    <br></br>
                    Repeat steps 2 and 3 a lot of times or until the error becomes 0.
                    <br></br>
                    <br></br>

                    This implementation looks at around 50000 moves, but quickly reaches a point
                    where there aren't any moves that will lower the error, even though
                    the grid is not solved. This is called a "local minimum" in the error,
                    but it is not the "absolute minimum" of 0 error that we want. To get
                    unstuck from this local minimum, we need to allow the error to increase
                    sometimes, like in Simulated Annealing.
                    </div>
                )

            case 3: 
                return (
                    <div>
                        Simulated Annealing is based on how molten metals cool into solid
                    form.
                    <br></br>
                    <br></br>
                    Step 1: Initialize
                    <br></br>
                    Fill all of the 3x3 squares with the numbers 1-9  in a random
                    arrangement so that there are no duplicates in the 3x3 squares.
                    There will be conflicts in the rows and columns.
                    <br></br>
                    <br></br>
                    Step 2: Count Error
                    <br></br>
                    For each conflict in the grid, increase the total Error.
                    <br></br>
                    <br></br>
                    Step 3: Switch Squares
                    <br></br>
                    Choose two random 1x1 squares in the same 3x3 square. If switching
                    their numbers lowers the total Error in the grid, then make the
                    switch. If swithing their numbers increases the total Error, then
                    there is a chance to make the switch. At the beginning this chance
                    is around 80% but it drops over time to around 0% at the end.
                    <br></br>
                    <br></br>
                    Step 4: Repeat
                    <br></br>
                    Repeat steps 2 and 3 a lot of times or until the error becomes 0.
                    <br></br>
                    <br></br>
                    Simulated Annealing is much like Hill Climbing, but it
                    allows the board to change a lot more at the beginning and "cool"
                    into a solution with less errors. This helps the algorithm break
                    out of local minima in the error that Hill Climbing gets stuck
                    at. If you run both of these a few times, you'll see that Hill
                    Climbing usually ends with around 10 errors, but Simulated
                    Annealing usually ends with 2 or 3, which is much better.
                    </div>
                )

            case 4:
                return (
                    <div>
                        The genetic algorithm replicates natural selection in organisms.
                        <br></br>
                        <br></br>
                        Step 1: Initialize
                        <br></br>
                        Duplicate the initial board 1000 times and randomly set the 0s
                        to be any number 1-9. This is our initial population.
                        <br></br>
                        <br></br>
                        Step 2: Reproduction
                        <br></br>
                        Choose two "parent" boards from the current population. Boards with
                        lower errors get chosen to be parents more often. This reflects natural 
                        selection choosing more fit individuals to reproduce more.
                        Create a new "child" board by randomly mixing the values of the two parents. 
                        This new board becomes a member of the child population. Make 
                        1000 children in this way.
                        <br></br>
                        <br></br>
                        Step 3: Mutation
                        <br></br>
                        In each child, there is a small chance that any of its values will
                        randomly change to a different value. This reflects gene mutation
                        in organisms.
                        <br></br>
                        <br></br>
                        Step 4: Repeat
                        <br></br>
                        The child population becomes the new parent population. Then repeat Steps 2 and 3.
                        In our implementation we make 1000 generations.
                        <br></br>
                        <br></br>
                        While there are 1000 boards in each generation, I am only showing you one
                        board per generation.
                    </div>
                )
            
            default:
                return "Choose an algorithm!"
        }
    }

    render() {
        return (
        <span className='About'>{this.chooseAbout(this.props.selectedAlg)}</span>
        )
    }
}