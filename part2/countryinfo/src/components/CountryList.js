import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const CountryList = ({ filter, countries, handleShow }) => {
    var filtered = countries
  
    const disp = () => {
        return (filtered.map(country =>
            <Country key={country.name} country={country.name} handleShow={handleShow} />
        ))
    }
  
    if (filter) {
        filtered = filtered.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    } else {
        return disp()
    }
  
    if (filtered.length > 10) {
        return (<p>Too many matches, specify another filter</p>)
    } else if (filtered.length === 1) {
        return (<CountryInfo country={filtered[0]} />)
    } else {
        return disp()
    }
}

export default CountryList