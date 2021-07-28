const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title && !body.url) {
    return response.status(400).json({ error: 'Missing title and url' })
  }

  const users = await User.find({})
  const user  = users[ Math.floor(Math.random() * users.length) ]

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  if (savedBlog) {
    response.json(savedBlog)
  } else {
    response.status(404).json({ error: 'Blog with given id does not exist' })
  }
})

module.exports = blogsRouter