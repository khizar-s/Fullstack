import { React, useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {

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
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  const removeBlog = () => {
    deleteBlog(blog)
  }

  const buttonLabel = viewable ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenViewable}>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.user.name} <br/>
        <button onClick={removeBlog}>remove</button>
      </div>
  </div>
)}

export default Blog