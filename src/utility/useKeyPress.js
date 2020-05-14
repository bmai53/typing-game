import { userState, useEffect, useState } from "react"

export const useKeyPress = callback => {
    
    const [keyPressed, setKeyPressed] = useState()

    useEffect(()=> {
        const downHandler = ({ key }) => {
            if (keyPressed !== key && key.length === 1){
                setKeyPressed(key)
                callback(key)
            }
        }

        const upHandler = () => {
            setKeyPressed(null)
        }

        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    })
}

