import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
    const accessKey = '<ADD_KEY_HERE>'
    const [ weather, setWeather ] = useState('')
  
    const hook = () => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }
    useEffect(hook, [])
  
    if (!weather) {
        return (<></>)
    } else {
        return (
            <>
                <h3>Weather in {capital}</h3>
                <strong>temperature:</strong> {weather.current.temperature} Celcius <br/>
                <img src={weather.current.weather_icons} alt={weather.current.weather_descriptions}/> <br/>
                <strong>wind: </strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}
            </>
        )
    }
}

export default Weather