import React from 'react'

const Filter = ({ filter, handleFilter }) => (

    <>
        filter shown with <input value={filter} onChange={handleFilter}></input>
    </>

)

export default Filter