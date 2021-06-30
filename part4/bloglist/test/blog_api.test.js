const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have id instead of _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBe(undefined)
  })
})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const newBlog = {
      title: 'Test material 3',
      author: 'Dilas Siddiqui',
      url: 'www.dilas.com',
      likes: 2003
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map(blog => blog.author)
    expect(authors).toContain('Dilas Siddiqui')
  })

  test('default likes are set to 0', async () => {
    const newBlog = {
      title: 'Test material 3',
      author: 'Dilas Siddiqui',
      url: 'www.dilas.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    expect(response.body.likes).toBe(0)
  })

  test('fails with status code 404 if missing title and url', async () => {
    const newBlog = {
      author: 'Dilas Siddiqui',
      likes: 2003
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 204 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .expect(204)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidID = '1234'

    await api
      .delete(`/api/blogs/${invalidID}`)
      .expect(400)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
      likes: 100
    }

    const updatedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)

    expect(updatedBlog.body.likes).toBe(updatedData.likes)
  })

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    const updatedData = {
      likes: 100
    }

    await api
      .put(`/api/blogs/${validNonexistingId}`)
      .send(updatedData)
      .expect(404)
  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidID = '1234'

    const updatedData = {
      likes: 100
    }

    await api
      .put(`/api/blogs/${invalidID}`)
      .send(updatedData)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})