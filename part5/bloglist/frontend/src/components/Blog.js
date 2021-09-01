import { React, useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, loggedIn }) => {

  const [viewable, setViewable] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenViewable = { display: viewable ? '' : 'none' }

  const showWhenLoggedIn = { display: loggedIn ? '' : 'none' }

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
    <div style={blogStyle} className='blog'>
      <div className='mainBlog'>
        {blog.title} - {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenViewable} className='moreBlog'>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={handleLike}>like</button> <br/>
        {blog.user.name} <br/>
        <div style={showWhenLoggedIn} className='removeBlog'>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired
}

export default Blog