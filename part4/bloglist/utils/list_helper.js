const lodash = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const reducer = (max, item) => {
    return (item.likes > max.likes)
      ? {
        title: item.title,
        author: item.author,
        likes: item.likes
      }
      : max
  }

  return blogs.reduce(reducer, {
    title: '',
    author: '',
    likes: - Infinity
  })
}

const mostBlogs = blogs => {
  const authors = lodash.groupBy(blogs, blog => blog.author)
  const countAuthors = lodash.mapValues(authors, blogs => {
    return lodash.reduce(blogs, count => {
      return count + 1
    }, 0)
  })
  return lodash.reduce(countAuthors, (max, blogs, author) => {
    return (blogs > max.blogs)
      ? {
        author: author,
        blogs: blogs
      }
      : max
  }, { author: '', blogs: 0 })
}

const mostLikes = blogs => {
  const authors = lodash.groupBy(blogs, blog => blog.author)
  const sumAuthors =  lodash.mapValues(authors, blogs => {
    return lodash.reduce(blogs, (sum, blog) => {
      return sum + blog.likes
    }, 0)
  })
  return lodash.reduce(sumAuthors, (max, blogs, author) => {
    return (blogs > max.likes)
      ? {
        author: author,
        likes: blogs
      }
      : max
  }, { author: '', likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}