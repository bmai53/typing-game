import React, { useState, useEffect } from "react"
import "../styles/App.css"

import Logo from "./Logo"

import { getWords } from "../utility/getWords"
import { useKeyPress } from "../utility/useKeyPress"
import { hsl } from '../utility/hsl'
import { getTime } from '../utility/time'
import { refresh } from '../utility/refresh'
import { getFirstWord } from "../utility/getFirstWord"
import { nonLettersDir } from "../utility/nonLetters"

const words = getWords()

const App = () => {

    // typing test
    const [leftPadding, setLeftPadding] = useState(' '.repeat(20))
    const [outgoing, setOutgoing] = useState('')
    const [curChar, setCurChar] = useState(words.charAt(0))
    const [incoming, setIncoming] = useState(words.substr(1))

    // colors/decoration
    const [accuracyColor, setAccuracyColor] = useState(hsl(100))
    const defaultCursorColor = "#09d3ac"
    const [cursorColor, setCursorColor] = useState(defaultCursorColor)

    // wpm
    const [startTime, setStartTime] = useState()
    const [wordCount, setWordCount] = useState(0)
    const [wpm, setWpm] = useState(0)

    // accuracy
    const [accuracy, setAccuracy] = useState(0);
    const [typedChars, setTypedChars] = useState('')

    // faster spins when typing!
    const [isTyping, setIsTyping] = useState(false)
    const [timeOfLastKey, setTimeOfLastKey] = useState()

    // tracking mistyped words
    const [curWord, setCurWord] = useState(getFirstWord(words))  // get first word in words
    const [typoMap, setTypoMap] = useState(new Map())

    // making array from map and sorting it
    let typoArray = []
    for (const [key, value] of typoMap.entries()) {
        typoArray.push({ key, value })
    }
    typoArray.sort((a, b) => b.value - a.value)

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

            // updating WPM
            if (incoming.charAt(0) === ' ') {
                setWordCount(wordCount + 1)
                setCurWord(getFirstWord(incoming.substr(1)))
            }
            const curTimeInMinutes = (getTime() - startTime) / 60000
            const curWpm = wordCount === 0 ? 0 : (wordCount / curTimeInMinutes).toFixed(2)
            setWpm(curWpm)

            //gradually remove padding as needed
            if (leftPadding.length > 0) {
                setLeftPadding(leftPadding.substr(1));
            }

            // updating current position in typing test
            setCursorColor(defaultCursorColor)
            curOutgoing += curChar
            curIncoming = incoming.substr(1)

            // get more words if needed for incoming
            // 400 is roughly the chars for one paragraph
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

    })


    // check if still typing
    useEffect(() => {
        const checkIfTyping = setInterval(() => {
            const timeDif = getTime() - timeOfLastKey
            if (timeOfLastKey && (timeDif < 1000)) {
                setIsTyping(true)
            }
            else {
                setIsTyping(false)
            }
        }, 100)

        return () => {
            clearInterval(checkIfTyping);
        };
    });


    return (
        <div className="AppComponent">
            <Logo isTyping={isTyping} />
            <h1 className="Stats">
                <span>
                    WPM: {wpm}
                </span>

                <span className="StatsDiv"> | </span>

                <span style={{ color: `${accuracyColor}` }}>
                    ACC: {accuracy}
                </span>
            </h1>

            <br />

            <p className="TypingTest">
                <span className="Outgoing">
                    {leftPadding + outgoing.slice(-20)}
                </span>

                <span
                    className="Current"
                    style={{ backgroundColor: `${cursorColor}` }}
                >
                    {curChar}
                </span>

                <span className="Incoming">
                    {incoming.substr(0, 20)}
                </span>
            </p>

            <br />

            <div className="MostFreqTypos">
                <p className="tableTitle"> Most Frequent Typos</p>
                <table className="table">
                    <thead>
                        <tr className="tableHeaders">
                            <th>Word</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{typoArray[0] ? typoArray[0].key : "-"}</td>
                            <td>{typoArray[0] ? typoArray[0].value : "-"}</td>
                        </tr>
                        <tr>
                            <td>{typoArray[1] ? typoArray[1].key : "-"}</td>
                            <td>{typoArray[1] ? typoArray[1].value : "-"}</td>
                        </tr>
                        <tr>
                            <td>{typoArray[2] ? typoArray[2].key : "-"}</td>
                            <td>{typoArray[2] ? typoArray[2].value : "-"}</td>
                        </tr>
                        <tr>
                            <td>{typoArray[3] ? typoArray[3].key : "-"}</td>
                            <td>{typoArray[3] ? typoArray[3].value : "-"}</td>
                        </tr>
                        <tr>
                            <td>{typoArray[4] ? typoArray[4].key : "-"}</td>
                            <td>{typoArray[4] ? typoArray[4].value : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <br />
            <div className="refreshButton" onClick={refresh}>Restart</div>
        </div>
    )
}



export default App