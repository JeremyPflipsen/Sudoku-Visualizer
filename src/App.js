import React from "react";
import "./App.css";
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";
import Menu from './Menu'
import loadGrid from './grids/loadGrid'
import loadSGrid from './grids/loadSGrid'
import loadRGrid from './grids/loadRGrid.js'
import About from './About'
import selectAlg from './selectAlg'
import visualizeAlgorithm from './visualizeAlgorithm'
import Error from './Error'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      selectedAlg: 0
    };
    this.visualizeAlgorithm = visualizeAlgorithm.bind(this)
    this.selectAlg = selectAlg.bind(this)
    this.inputValueChange = this.inputValueChange.bind(this)
    this.changeNodeVal = this.changeNodeVal.bind(this)
  }

  changeNodeVal (row,col,value) {
    let newGrid = this.state.grid.slice()
    newGrid[row][col] = value
    this.setState({
        grid: newGrid
      })
  }

  inputValueChange (row,col,event){
    let value = event.target.value
    let numVal = Number(value)
    
    if (numVal >= 0 && numVal <= 9){
      let newGrid = this.state.grid.slice()
      newGrid[row][col] = numVal
      this.setState({
        grid: newGrid
      })
    }
  }

  componentDidMount() {
    const nodes = [
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

    this.setState({
      grid: nodes
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className='Header'>Algorithm Visualizer</h1>
        <Menu
          selectAlg={this.selectAlg}
          handleClick={() => this.visualizeAlgorithm(this.changeNodeVal)}
          loadSGrid={() => {
            this.setState({grid: loadSGrid()}, () => loadGrid(this.state.grid))}}
          loadRGrid={() => {
            this.setState({grid: loadRGrid()}, () => loadGrid(this.state.grid))}}
        ></Menu>
        <div className='flexbox'>
          <About selectedAlg={this.state.selectedAlg}></About>
          <PathfindingVisualizer inputValueChange={this.inputValueChange} grid={this.state.grid} ></PathfindingVisualizer>
          <Error selectedAlg={this.state.selectedAlg}></Error>
        </div>
        <h3>p.s. I love you :heart:</h3>
      </div>
    );
  }
}

export default App;
