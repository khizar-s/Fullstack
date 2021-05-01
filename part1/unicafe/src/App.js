import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.eventHandler}>
      {props.text}
    </button>
  )
}

const Statistics = ({ text, value, end }) => {
  return (
    <> 
      <td>{text}</td>
      <td>{value} {end}</td>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good+1)
  const incrementNeutral = () => setNeutral(neutral+1)
  const incrementBad = () => setBad(bad+1)

  const all   = good + bad + neutral
  const average = (good - bad)/all
  const positive = (good)*100/all

  const cond = () => {
    if (all === 0) {
      return <p>No feedback given</p> 
    } else {
      return (
        <table>
          <tbody>
            <tr><Statistics text='good' value={good}/></tr>
            <tr><Statistics text='neutral' value={neutral}/></tr>
            <tr><Statistics text='bad' value={bad}/></tr>
            <tr><Statistics text='all' value={all}/></tr>
            <tr><Statistics text='average' value={average}/></tr>
            <tr><Statistics text='positive' value={positive} end='%'/></tr>
          </tbody>
        </table>
      )
    }
  }

  return (
    <>
      <h2>give feedback</h2>
      <Button eventHandler={incrementGood} text='good'/>
      <Button eventHandler={incrementNeutral} text='neutral'/>
      <Button eventHandler={incrementBad} text='bad'/>
      <h2>statistics</h2>
      {cond()}
    </>
  )

}

export default App