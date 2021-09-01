import { React, useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog} className='blogForm'>
        <div>
          title:
          <input
            id='newTitle'
            type="text"
            value={newTitle}
            name="NewTitle"
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='newAuthor'
            type="text"
            value={newAuthor}
            name="NewAuthor"
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='newUrl'
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
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm