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
  return response.data
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async blogToUpdate => {
  const response = await axios.put(`${baseUrl}/${blogToUpdate.id}`, blogToUpdate, config)
  return response.data
}

const remove = async idToDelete => {
  const response = await axios.delete(`${baseUrl}/${idToDelete}`, config)
  return response.data
}

export default { setToken, getAll, create, update, remove }