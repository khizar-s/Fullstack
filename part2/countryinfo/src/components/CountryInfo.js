import React from 'react'
import Weather from './Weather'

const CountryInfo = ({ country }) => {
    return (
        <>
            <h2> {country.name} </h2>
            capital {country.capital} <br/>
            population {country.population}
            <h3>Spoken languages</h3>
            <ul>
            {country.languages.map(language => 
                <li key={language.name}>{language.name}</li>  
            )}
            </ul>
            <img src={country.flag} width='20%' alt={country.name}/>
            <Weather capital={country.capital}/>
        </>
    )
}

export default CountryInfo