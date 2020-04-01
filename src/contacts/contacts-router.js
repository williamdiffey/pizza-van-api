const express = require('express')
const contactsService = require('./contacts-service')
const contactsRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()

contactsRouter
  .route('/api/contacts')
  .get((req, res, next) => {
    contactsService.getcontacts(req.app.get('db'))  
    .then(contacts => {
      res.json(contacts)
    })  
    .catch(next)
  })

  .delete(bodyParser, (req, res, next) => {
    const { id } = req.body
    contactsService.deletecontacts(req.app.get('db'), id)
    .then(numRowsAffected => {
    logger.info(`contacts with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { message } = req.body
    for (const field of ['message'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
          const newItem = { message }
            contactsService.insertcontacts(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          
      .catch(next)
  })

  .put(bodyParser,(req, res, next) => {
    const { id, message } = req.body
    const newFields = { message }
    contactsService.updatecontacts(
    req.app.get('db'), id, newFields)

    .then(numRowsAffected => {
    logger.info(`contacts with ${id} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = contactsRouter

