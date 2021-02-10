import React from "react"
import "./Menu.sass"

function selectAlgorithm(props, value) {
  switch (value) {
    case 1:
      document.getElementById("button").innerHTML = "Visualize Backtracking"
      props.selectAlg(1)
      break

    case 2:
      document.getElementById("button").innerHTML = "Visualize Hill Climbing"
      props.selectAlg(2)
      break

    case 3:
      document.getElementById("button").innerHTML =
        "Visualize Simulated Annealing"
      props.selectAlg(3)
      break

    case 4:
      document.getElementById("button").innerHTML =
        "Visualize Genetic Algorithm"
      props.selectAlg(4)
      break

    default:
      console.log("You selected an algorithm!")
      break
  }
}

export default function Menu(props) {
  return (
    <nav className="menu">
      <ol>
        <li className="menu-item">
          <a href="#0">Algorithm</a>
          <ol className="sub-menu">
            <li className="menu-item" onClick={() => selectAlgorithm(props, 1)}>
              <a href="#0">Backtracking</a>
            </li>
            <li className="menu-item" onClick={() => selectAlgorithm(props, 2)}>
              <a href="#0">Hill Climbing</a>
            </li>
            <li className="menu-item" onClick={() => selectAlgorithm(props, 3)}>
              <a href="#0">Simulated Annealing</a>
            </li>
            <li className="menu-item" onClick={() => selectAlgorithm(props, 4)}>
              <a href="#0">Genetic Algorithm</a>
            </li>
          </ol>
        </li>
        <button
          id="button"
          onClick={props.handleClick}
          href="#"
          className="myButton"
        >
          Visualize Algorithm
        </button>
        <li className="menu-item">
          <a href="#0">Load Grid</a>
          <ol className="sub-menu">
            <li className="menu-item" onClick={props.loadSGrid}>
              <a href="#0">Grid with Solution</a>
            </li>
            <li className="menu-item" onClick={props.loadRGrid}>
              <a href="#0">Load Random Grid</a>
            </li>
          </ol>
        </li>
      </ol>
    </nav>
  )
}
