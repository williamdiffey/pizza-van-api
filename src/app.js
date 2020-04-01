const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const menuRouter = require('./menu/menu-router')
const authRouter = require('./auth/auth-router')
const timesRouter = require('./times/times-router')
const messagesRouter = require('./messages/messages-router')
const contactsRouter = require('./contacts/contacts-router')

const app = express()

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test',
}))

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin"
//   // , "YOUR-DOMAIN.TLD"
//   ); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());
app.use(helmet())
app.options('*', cors()) // include before other routes
app.use(menuRouter)
app.use(authRouter)
app.use(timesRouter)
app.use(locationRouter)
app.use(messagesRouter)
app.use(contactsRouter)

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
