const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test material 1',
    author: 'Khizar Siddiqui',
    url: 'www.khizar.com',
    likes: 2000
  },
  {
    title: 'Test material 2',
    author: 'Zuhair Siddiqui',
    url: 'www.zuhair.com',
    likes: 2012
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}