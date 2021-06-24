import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import getPersons from './services/getPersons'
import Error from './components/Error'
import Success from './components/Success'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ success, setSuccess ] = useState(null)
  const [ error, setError ] = useState(null)

  const hook = () => {
    getPersons
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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
      const id = persons.find(p => p.name === newName).id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        getPersons
          .update(id, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
            setSuccess(`Updated ${newName}`)
            setTimeout(() => setSuccess(null), 5000)
            setNewName('')
            setNewPhone('')
          })
          .catch(error => {
            setError(`Information of ${newName} has already been removed from server`)
            setTimeout(() => setError(null), 5000)
          })
      }
    } else {
      getPersons
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccess(`Added ${newName}`)
          setTimeout(() => setSuccess(null), 5000)
          setNewName('')
          setNewPhone('')
        })
        .catch(error => {
          setError(error.response.data.error)
          setTimeout(() => setError(null), 5000)
        })
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

  const deletePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name} ?`)) {
      getPersons.remove(id)
      setPersons(persons.filter(p => p.id !== id))
    }
  }

  const personsToShow = (filter === "")
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Success message={success}/>
      
      <Error message={error} />

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
      
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App