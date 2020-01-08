import express from 'express'
import { mappingsRouter } from './routes'

const app = express()
const PORT = 5001

app.use('/mappings', mappingsRouter)

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
