import React from 'react'
import '../styles/Stats.css'

const Stats = props => (

    <div>
        <h1 className="Stats">
            <span style={{ color: `${props.wpmColor}` }}>
                WPM: {props.wpm == 0 ? '0.00' : props.wpm}
            </span>

            <span> | </span>

            <span style={{ color: `${props.accuracyColor}` }}>
                ACC: {props.accuracy == 0 ? '0.00' : props.accuracy}
            </span>
        </h1>
        <h2>
            TIME: {props.runTime ? props.runTime : '00:00'}
        </h2>
        <h2>
            WORDS: {props.wordCount ? props.wordCount : 0}
        </h2>

    </div>

)

export default Stats