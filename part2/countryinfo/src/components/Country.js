import React from 'react'

const Country = ({ country, handleShow }) => {
    return (
        <>
            {country}
            <button onClick={handleShow} country={country}>
            show
            </button>
            <br/>
        </>
    )
}

export default Country