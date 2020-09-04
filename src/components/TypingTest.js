import React from 'react'
import "../styles/TypingTest.css"

const TypingTest = props => (

    <p className="TypingTest">
        <span className="Outgoing">
            {props.leftPadding + props.outgoing.slice(-40)}
        </span>

        <span
            className="Current"
            style={{ backgroundColor: `${props.cursorColor}` }}
        >
            {props.curChar}
        </span>

        <span className="Incoming">
            {props.incoming.substr(0, 40)}
        </span>
    </p>
)

export default TypingTest