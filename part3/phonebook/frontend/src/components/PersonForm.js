import React from 'react'

const PersonForm = ({ newName, newPhone, submitName, handleNameChange, handlePhoneChange }) => (

    <form onSubmit={submitName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>

)

export default PersonForm