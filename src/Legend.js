import React from "react"
import Node from "./PathfindingVisualizer/Node/Node.jsx"
import "./Legend.css"

export default function Legend(props) {
  switch (props.selectedAlg) {
    case 1:
      return (
        <div className="Legend">
          <div className="Legend-item">
            <Node isStart={false} isFinish={false} actualValue={0}></Node> =
            Empty Square
          </div>
          <div className="Legend-item">
            <Node isStart={true} isFinish={false}></Node> = Current Square
          </div>
          <div className="Legend-item">
            <Node isStart={false} isFinish={true}></Node> = Visited Square
          </div>
        </div>
      )

    case 2:
      return (
        <div className="Legend">
          <div className="Legend-item">
            <Node isStart={false} isFinish={false} actualValue={0}></Node> =
            Empty Square
          </div>
          <div className="Legend-item">
            <Node isStart={true} isFinish={false}></Node> = Current Square
          </div>
          <div className="Legend-item">
            <Node isStart={false} isFinish={true}></Node> = Wrong Value Square
          </div>
        </div>
      )

    case 3:
      return (
        <div className="Legend">
          <div className="Legend-item">
            <Node isStart={false} isFinish={false} actualValue={0}></Node> =
            Empty Square
          </div>
          <div className="Legend-item">
            <Node isStart={true} isFinish={false}></Node> = Current Square
          </div>
          <div className="Legend-item">
            <Node isStart={false} isFinish={true}></Node> = Wrong Value Square
          </div>
        </div>
      )

    case 4:
      return (
        <div className="Legend">
          <div className="Legend-item">
            <Node isStart={false} isFinish={false} actualValue={0}></Node> =
            Empty Square
          </div>
          <div className="Legend-item">
            <Node isStart={false} isFinish={true}></Node> = Wrong Value Square
          </div>
        </div>
      )

    default:
      return <div></div>
  }
}
