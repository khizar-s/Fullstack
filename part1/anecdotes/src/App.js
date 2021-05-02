import React, { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
   
  const [selected, setSelected] = useState(0)

  const changeValue = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)
    setSelected(rand)
  }

  const incrementVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const maxFind = () => {
    const maxIndex = votes.indexOf(Math.max(...votes))
    return (
      <>
        {anecdotes[maxIndex]}
        <br/>
        has {votes[maxIndex]} votes
      </>
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <button onClick={incrementVote}>vote</button>
      <button onClick={changeValue}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {maxFind()}
    </div>
  )
}

export default App