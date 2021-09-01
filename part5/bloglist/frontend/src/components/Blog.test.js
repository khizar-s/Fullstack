import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const updateBlog = jest.fn()
  const deleteBlog = jest.fn()

  beforeEach(() => {
    const blog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'Test URL',
      likes: 10,
      user: 'Test User'
    }
    component = render(
      <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} loggedIn={false}/>
    )
  })

  test('renders title and author', () => {
    const div = component.container.querySelector('.mainBlog')
    const moreDiv = component.container.querySelector('.moreBlog')

    expect(div).toHaveTextContent('Test Blog - Test Author')
    expect(moreDiv).toHaveStyle('display: none')
  })

  test('renders url and likes after button clicked', () => {
    const button = component.getByText('view')
    const moreDiv = component.container.querySelector('.moreBlog')

    fireEvent.click(button)

    expect(moreDiv).toHaveTextContent('Test URL')
    expect(moreDiv).toHaveTextContent('10')
  })

  test('calls function 2 times when like button clicked twice', () => {
    const view = component.getByText('view')
    fireEvent.click(view)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})