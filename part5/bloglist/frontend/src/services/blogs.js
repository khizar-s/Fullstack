import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  console.log(response)
  return response.data
}

export default { setToken, getAll }