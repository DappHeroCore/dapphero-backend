import express from 'express'
import * as routes from './routes'

const app = express()
const PORT = 5001

app.use('/mappings', routes.mappings)

app.get('/some-other-route', (req, res) => {
  const response = { someKey: 'someValue' }
  res.send(response)
})

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Power Server listening on port ${PORT}!`)
  })
}

startServer()
