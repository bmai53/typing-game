import React from 'react'
import '../styles/Stats.css'

const Stats = props => (

    <div>
        <table className="Stats">
            <tbody>
                <tr className="MainStats">
                    <td className="StatsLeft">
                        <div style={{ color: `${props.wpmColor}` }}>
                            WPM: {props.wpm == 0 ? '0.00' : props.wpm}
                        </div>
                    </td>
                    <td className="StatsRight">
                        <div style={{ color: `${props.accuracyColor}` }}>
                            ACC: {props.accuracy == 0 ? '0.00' : props.accuracy}
                        </div>
                    </td>
                </tr>
                <tr className="SecondaryStats">
                    <td className="StatsLeft">
                        WORDS: {props.wordCount ? props.wordCount : 0}
                    </td>
                    <td className="StatsRight">
                        TIME: {props.runTime ? props.runTime : '00:00'}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

)

export default Stats