import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [ countries, setCountries ]  = useState([])
  const [ filter, setFilter ] = useState('')

  const handleChange = (event) => (
    setFilter(event.target.value)
  )

  const handleShow = (event) => {
    setFilter(event.target.attributes.country.value)
  }

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <>
      <form>
        find countries <input value={filter} onChange={handleChange}></input>
      </form>
      <CountryList filter={filter} countries={countries} handleShow={handleShow} />
    </>    
  )
}

export default App