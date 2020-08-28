import React, { useState, useEffect } from "react"
import "../styles/App.css"

import Logo from "./Logo"
import Cat from "./Cat"
import Stats from "./Stats"
import TypingTest from "./TypingTest"
import MostFreqTypos from "./MostFreqTypos"

import { getWords } from "../utility/getWords"
import { useKeyPress } from "../utility/useKeyPress"
import { hsl } from '../utility/hsl'
import { getTime } from '../utility/time'
import { refresh } from '../utility/refresh'
import { getFirstWord } from "../utility/getFirstWord"
import { nonLettersDir } from "../utility/nonLetters"
import { timeConvert } from "../utility/timeConvert"

import GithubCorner from 'react-github-corner';

const words = getWords()


const App = () => {

    // typing test
    const [leftPadding, setLeftPadding] = useState(' '.repeat(20))
    const [outgoing, setOutgoing] = useState('')
    const [curChar, setCurChar] = useState(words.charAt(0))
    const [incoming, setIncoming] = useState(words.substr(1))

    // colors/decoration
    const [accuracyColor, setAccuracyColor] = useState('#FFFFFF')
    const [wpmColor, setWpmColor] = useState('#FFFFFF')
    const defaultCursorColor = "#09d3ac"
    const [cursorColor, setCursorColor] = useState(defaultCursorColor)

    // wpm
    const [startTime, setStartTime] = useState()
    const [runTime, setRunTime] = useState('0:00')
    const [wordCount, setWordCount] = useState(0)
    const [wpm, setWpm] = useState(0)

    // accuracy
    const [accuracy, setAccuracy] = useState(0);
    const [typedChars, setTypedChars] = useState('')

    // bongo cat when typing!
    const [isTyping, setIsTyping] = useState(false)
    const [timeOfLastKey, setTimeOfLastKey] = useState()

    // tracking mistyped words
    const [curWord, setCurWord] = useState(getFirstWord(words))  // get first word in words
    const [typoMap, setTypoMap] = useState(new Map())

    const calcWpm = () => {
        const curTimeInMinutes = (getTime() - startTime) / 60000
        const curWpm = wordCount === 0 ? 0 : (wordCount / curTimeInMinutes).toFixed(2)
        const wpmColorValue = parseFloat(curWpm)

        setWpmColor(hsl(wpmColorValue))
        setWpm(curWpm)
    }

    // logic of game 
    useKeyPress(key => {

        // initialize!
        if (!startTime) {
            setStartTime(getTime())
        }

        // are we typing? Yes!
        setTimeOfLastKey(getTime())
        setIsTyping(true)

        // copy of incoming/outgoing char states
        let curOutgoing = outgoing
        let curIncoming = incoming

        if (key === curChar) {

            // updating word count
            if (incoming.charAt(0) === ' ') {
                setWordCount(wordCount + 1)
                setCurWord(getFirstWord(incoming.substr(1)))
            }

            // calc wpm after every keystroke
            calcWpm()


            //gradually remove padding as needed
            if (leftPadding.length > 0) {
                setLeftPadding(leftPadding.substr(1));
            }

            // updating current position in typing test
            setCursorColor(defaultCursorColor)
            curOutgoing += curChar
            curIncoming = incoming.substr(1)

            // get more words if needed for incoming
            if (incoming.length < 30) {
                curIncoming += ' ' + getWords()
            }

            setOutgoing(curOutgoing)
            setCurChar(incoming.charAt(0))
            setIncoming(curIncoming)
        }
        // mistyped character
        else {
            setCursorColor("red")

            const kvPair = nonLettersDir.find(kv => kv.key === curChar)
            if (kvPair) {
                setTypoMap(
                    typoMap.has(kvPair.value) ?
                        typoMap.set(kvPair.value, typoMap.get(kvPair.value) + 1) :
                        typoMap.set(kvPair.value, 1)
                )
            }

            else {
                setTypoMap(
                    typoMap.has(curWord) ?
                        typoMap.set(curWord, typoMap.get(curWord) + 1) :
                        typoMap.set(curWord, 1)
                )
            }

        }

        // updating accuracy
        const curTypedChars = typedChars + key;
        setTypedChars(curTypedChars);
        setAccuracy(
            ((curOutgoing.length * 100) / curTypedChars.length).toFixed(2)
        )

        // update accuracy text color - buggy without if statement
        if (curOutgoing.length > 1) {
            setAccuracyColor(hsl(accuracy))
        }

        // update running time when keys are pressed
        if (startTime) {
            const curTime = (getTime() - startTime) / 1000
            setRunTime(timeConvert(curTime))
        }
    })

    // updates while no key strokes are made
    useEffect(() => {
        const checkIfTyping = setInterval(() => {

            // calc wpm even when user is not typing
            // update running time when no keys are pressed
            if (startTime) {
                calcWpm()
                const curTime = (getTime() - startTime) / 1000
                setRunTime(timeConvert(curTime))
            }

            // check if still typing
            const timeDif = getTime() - timeOfLastKey
            if (timeOfLastKey && (timeDif < 100)) {
                setIsTyping(true)
            }
            else {
                setIsTyping(false)
            }
        }, 500)

        return () => {
            clearInterval(checkIfTyping);
        };
    });

    return (
        <div className="AppComponent">
            <GithubCorner href='https://github.com/bmai53/typing-game' direction='left' />
            {/* <Logo isTyping={isTyping} /> */}
            <Cat isTyping={isTyping} />
            <Stats
                runTime={runTime}
                wpm={wpm}
                accuracy={accuracy}
                accuracyColor={accuracyColor}
                wpmColor={wpmColor}
                wordCount={wordCount}
            />

            <TypingTest
                leftPadding={leftPadding}
                outgoing={outgoing}
                incoming={incoming}
                curChar={curChar}
                cursorColor={cursorColor}
            />

            <MostFreqTypos typoMap={typoMap} />

            <div className="refreshButton" onClick={refresh}>Restart</div>
        </div>
    )
}



export default App