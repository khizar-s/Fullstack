import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const getAllBlogs = async () => {
    const response = await blogService.getAll()
    setBlogs(response)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(`old data is ${loggedUserJSON}`)
    if (loggedUserJSON) {
      console.log('trying to fetch old login')
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
      console.log(exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const loginForm = () => {
    console.log('We in login')
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
    console.log('Logout')
  }

  const addBlog = async event => {
    event.preventDefault()
    console.log('add Blog')
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    const returnedBlog = await blogService.create(blog)
    setBlogs(blogs.concat(returnedBlog))
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    setSuccessMessage(`a new blog ${blog.title} by ${blog.author} added`)
    setTimeout(() => setSuccessMessage(null), 5000)
  }

  const showBlogs = () => {
    console.log('we in show')
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
            type="text"
            value={newTitle}
            name="NewTitle"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={newAuthor}
            name="NewAuthor"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={newUrl}
            name="NewUrl"
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  console.log(user)

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
          <br/>
          {blogForm()}
          <br/>
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App