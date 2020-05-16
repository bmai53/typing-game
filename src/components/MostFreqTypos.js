import React from 'react'
import "../styles/MostFreqTypo.css"

const MostFreqTypos = ({ typoArray }) => (

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
)

export default MostFreqTypos