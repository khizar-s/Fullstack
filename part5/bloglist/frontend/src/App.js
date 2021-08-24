import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const getAllBlogs = async () => {
    const response = await blogService.getAll()
    setBlogs(response.sort(compareLikes))
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      getAllBlogs()
    } catch (exception) {
      console.error(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const updateBlog = async blogToUpdate => {
    const returnedBlog = await blogService.update(blogToUpdate)
    setBlogs(blogs.map(blog => blog.id === blogToUpdate.id ? returnedBlog : blog))
  }

  const deleteBlog = async blogToDelete => {
    if (window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)) {
      await blogService.remove(blogToDelete.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
    }
  }

  const showBlogs = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} loggedIn={user.username === blog.user.username}/>
        )}
      </div>
    )
  }

  const showError = message => {
    if (message === null) {
      return null
    } else {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  }

  const showSuccess = message => {
    if (message === null) {
      return null
    } else {
      return (
        <div className="success">
          {message}
        </div>
      )
    }
  }

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  return (
    <div>
      {showError(errorMessage)}
      {showSuccess(successMessage)}
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button type="submit" onClick={() => handleLogout()}>logout</button>
          {blogForm()}
          <br/>
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App