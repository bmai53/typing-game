import React, { useEffect, useState } from "react"
import "../styles/Cat.css"
import base from '../bongo_cat/base.png'
import typing from '../bongo_cat/typing.gif'

export default ({ isTyping, startTime }) => {

    const [cur, setCur] = useState('left')

    useEffect(() => {
        const typing = setInterval(() => {
            if (cur === 'left') {
                setCur('right')
            }
            else {
                setCur('left')
            }
        }, 100)

        return () => {
            clearInterval(typing);
        }
    })

    if (!startTime) {
        return (
            <>
                <div className="Container">
                    <img className="Cat" src={base} />
                    <div class="ImgText blink">
                        <p>Type to start the game!</p>
                    </div>
                </div>

                {/* loads image as hidden to prevent stutter when typing is rendered for the first time */}
                <div style={{ display: "none" }}>
                    <img className="Cat" src={typing} />
                </div>
            </>
        )
    }
    else if (!isTyping) {
        return <img className="Cat" src={base} />
    }
    else {
        return <img className="Cat" src={typing} />
    }

}