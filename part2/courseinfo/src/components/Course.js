import React from 'react'

const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
      </>
    )
}
  
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}
  
const Header = ({ name }) => {
    return (
      <h2>
        {name}
      </h2>
    )
}
  
const Content = ({ parts }) => {
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} part={part}/>
        )}
      </>
    )
}
  
const Total = ({ parts }) => {
    const total = parts.reduce((e1, e2) => {
      return e1 + e2.exercises
    }, 0)
    
      return (
      <b>
        total of {total} exercises
      </b>
    )
}

export default Course