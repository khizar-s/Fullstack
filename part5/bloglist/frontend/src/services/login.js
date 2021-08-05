import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('trying to login through service')
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }