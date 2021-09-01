import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let component
  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog={createBlog}/>
    )
  })

  test('calls event handler with correct details', () => {
    const form = component.container.querySelector('.blogForm')
    const inputTitle = component.container.querySelector('#newTitle')
    const inputAuthor = component.container.querySelector('#newAuthor')
    const inputUrl = component.container.querySelector('#newUrl')

    fireEvent.change(inputTitle, {
      target: { value: 'Some new title here' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Some new author here' }
    })
    fireEvent.change(inputUrl, {
      target: { value: 'Some new url here' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Some new title here')
    expect(createBlog.mock.calls[0][0].author).toBe('Some new author here')
    expect(createBlog.mock.calls[0][0].url).toBe('Some new url here')
  })
})