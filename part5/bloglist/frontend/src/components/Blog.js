import { React, useState } from 'react'

const Blog = ({ blog }) => {

  const [viewable, setViewable] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenViewable = { display: viewable ? '' : 'none' }

  const toggleVisibility = () => {
    setViewable(!viewable)
  }

  const handleLike = () => {
    console.log('liked!')
  }

  const buttonLabel = viewable ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenViewable}>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.author}
      </div>
  </div>
)}

export default Blog