const express = require('express')
const messagesService = require('./messages-service')
const messagesRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()

messagesRouter
  .route('/api/messages')
  .get((req, res, next) => {
    messagesService.getMessages(req.app.get('db'))  
    .then(messages => {
      res.json(messages)
    })  
    .catch(next)
  })

  .delete(bodyParser, (req, res, next) => {
    const { id } = req.body
    messagesService.deleteMessages(req.app.get('db'), id)
    .then(numRowsAffected => {
    logger.info(`messages with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { id, message } = req.body
    for (const field of ['id', 'message'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
          const newItem = { id, message }
            messagesService.insertMessages(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          
      .catch(next)
  })

  .put(bodyParser,(req, res, next) => {
    const { id, message } = req.body
    const newFields = { message }
    messagesService.updateMessages(
    req.app.get('db'), id, newFields)

    .then(numRowsAffected => {
    logger.info(`messages with ${id} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = messagesRouter

