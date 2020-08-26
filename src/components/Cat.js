import React, { useEffect, useState } from "react"
import "../styles/Cat.css"
import base from '../bongo_cat/base.png'
import typing from '../bongo_cat/typing.gif'

export default ({ isTyping, currentKey }) => {
    
    const [cur, setCur] = useState('left')

    useEffect(() => {
        const typing = setInterval(() => {
            if(cur === 'left'){
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

    if (!isTyping) {
        return <img className="Cat" src={base} />
    }
    else {
        return <img className="Cat" src={typing} />
    }

}