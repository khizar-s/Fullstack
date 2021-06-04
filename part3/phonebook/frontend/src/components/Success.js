import React from 'react'

const Success = ({ message }) => {
    if (message === null) {
        return null
    }
  
    return (
        <div className="msgSuccess">
            {message}
        </div>
    )
}

export default Success