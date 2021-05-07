import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const nameExists = persons.reduce((p, n) => {
    return (p || n.name === newName)
  }, false)

  const submitName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newPhone
    }

    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewPhone('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = (filter === "")
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} handleFilter={handleFilter}/>

      <h3>Add a new</h3>
      
      <PersonForm
        newName={newName}
        newPhone={newPhone}
        submitName={submitName}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      
      <h3>Numbers</h3>
      
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App