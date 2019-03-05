import axios from 'axios'

const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL).then(response => response.data)
}

const create = (newEntry) => {
  return axios.post(baseURL, newEntry).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseURL}/${id}`).then(response => response.data)
}

export default {
  getAll,
  create,
  remove
}