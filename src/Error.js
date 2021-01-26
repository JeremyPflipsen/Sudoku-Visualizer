import React from 'react'
import './Error.css'
import Legend from './Legend.js'

export default function Error(props) {

    return (
        <div className={'ErrorLegend'}>
            {props.selectedAlg === 2 || props.selectedAlg === 3 || props.selectedAlg === 4 ?
                props.selectedAlg === 4 ?
                    <div className='Error' id='Error'>
                        Generation: 0 <br></br>
                        Error: 0
                    </div>
                    :
                    <div className='Error' id='Error'>
                        Error: 0
                    </div>
                :
                <div className='backtrackHasSolution' id='Error'></div>
            }
            <Legend selectedAlg={props.selectedAlg}></Legend>
        </div>
    )
}