const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const api = supertest(app)

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      password: 'password',
      name: 'Khizar Siddiqui'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with no username or password', async () => {
    const usersAtStart = await helper.usersInDb()

    const noUsername = {
      password: 'password',
      name: 'Person A'
    }

    const noPassword = {
      username: 'username',
      name: 'Person B'
    }

    const res1 = await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)

    const res2 = await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)

    expect(res1.body.error).toContain('User validation failed: username: Path `username` is required.')
    expect(res2.body.error).toContain('Password of length at least 3 must be provided')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with invalid username or password length', async () => {
    const usersAtStart = await helper.usersInDb()

    const invalidUsername = {
      username: 'xy',
      password: 'password',
      name: 'Person A'
    }

    const invalidPassword = {
      username: 'username',
      password: 'xy',
      name: 'Person B'
    }

    const res1 = await api
      .post('/api/users')
      .send(invalidUsername)
      .expect(400)

    const res2 = await api
      .post('/api/users')
      .send(invalidPassword)
      .expect(400)

    expect(res1.body.error).toContain(`User validation failed: username: Path \`username\` (\`${invalidUsername.username}\`) is shorter than the minimum allowed length (3).`)
    expect(res2.body.error).toContain('Password of length at least 3 must be provided')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with duplicate username', async () => {
    const usersAtStart = await helper.usersInDb()

    const duplicateUsername = {
      username: 'root',
      password: 'password',
      name: 'Person A'
    }

    const res = await api
      .post('/api/users')
      .send(duplicateUsername)
      .expect(400)

    expect(res.body.error).toContain(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${duplicateUsername.username}\``)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})