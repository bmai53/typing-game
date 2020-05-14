import React from "react"
import "../styles/Logo.css"
import logo from "../logo.svg"

const Logo = (props) => {

    const style = {
        animation: `spin infinite ${props.isTyping? '3' : '0'}s linear`, 
        transition: 'ease-in-out'
    }
   
    return (
        <div 
            // speed up spinning animation
            style={style}
        >
            <img
                src={logo}
                className="Logo"
                alt="logo"
            />
        </div>
    )
}

export default Logo