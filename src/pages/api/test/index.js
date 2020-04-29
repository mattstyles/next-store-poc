
import bent from 'bent'

const get = bent('json', 'https://swapi.dev/api/')
const endpoint = id => `people/${id}/`

const delay = ms => new Promise((resolve) => setTimeout(resolve, ms))

export default async (req, res) => {
  const {
    query: { id }
  } = req

  await delay(1000)
  const result = await get(endpoint(id || 1))

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json(result)
}
