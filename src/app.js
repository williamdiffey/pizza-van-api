const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const menuRouter = require('./menu/menu-router')
const authRouter = require('./auth/auth-router')
const timesRouter = require('./times/times-router')
const locationRouter = require('./location/location-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))

app.use(helmet())
app.use(menuRouter)
app.use(authRouter)
app.use(timesRouter)
app.use(locationRouter)
app.use(cors());
app.get('/', (req, res) => {
  res.send('Pizzzzzzza!')
})


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: 'Server error' }
  } else {
    console.error(error)
    response = { error: error.message, object: error }
  }
  res.status(500).json(response)
})

module.exports = app
