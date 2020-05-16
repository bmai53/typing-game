import React from 'react'
import '../styles/Stats.css'

const Stats = props => (

    <div>
        <h1 className="Stats">
            <span style={{ color: `${props.wpmColor}` }}>
                WPM: {props.wpm}
            </span>

            <span> | </span>

            <span style={{ color: `${props.accuracyColor}` }}>
                ACC: {props.accuracy}
            </span>
        </h1>
    </div>
    
)

export default Stats