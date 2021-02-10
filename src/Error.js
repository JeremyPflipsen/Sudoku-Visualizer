import React from "react"
import "./Error.css"
import Legend from "./Legend.js"

// export default function Error(props) {
//   return (
//     <div className={"ErrorLegend"}>
//       {props.selectedAlg === 2 ||
//       props.selectedAlg === 3 ||
//       props.selectedAlg === 4 ? (
//         props.selectedAlg === 4 ? (
//           <div className="Error" id="Error">
//             Generation: 0 <br></br>
//             Error: 0
//           </div>
//         ) : (
//           <div className="Error" id="Error">
//             Error: 0
//           </div>
//         )
//       ) : (
//         <div className="backtrackHasSolution" id="Error"></div>
//       )}
//       <Legend selectedAlg={props.selectedAlg}></Legend>
//     </div>
//   )
// }

export default function Error(props) {
  let message = ""
  switch (props.selectedAlg) {
    case 1:
      break

    case 2:
    case 3:
      message = "Error : 0"
      break

    case 4:
      message = `Generation: 0 \n
                Error: 0`
      break

    default:
      break
  }
  return (
    <div className={"ErrorLegend"}>
      <div className="Error" id="Error">
        {message}
      </div>
      <Legend selectedAlg={props.selectedAlg}></Legend>
    </div>
  )
}
