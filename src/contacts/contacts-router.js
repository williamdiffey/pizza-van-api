const express = require('express')
const contactsService = require('./contacts-service')
const contactsRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()

contactsRouter
  .route('/api/contacts')
  .get((req, res, next) => {
    contactsService.getContacts(req.app.get('db'))  
    .then(contacts => {
      res.json(contacts)
    })  
    .catch(next)
  })

  .delete(bodyParser, (req, res, next) => {
    const { id } = req.body
    contactsService.deleteContacts(req.app.get('db'), id)
    .then(numRowsAffected => {
    logger.info(`contacts with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { id, contact } = req.body
    for (const field of ['id', 'contact_type', 'contact_details'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
          const newItem = { id, contact_type, contact_details }
            contactsService.insertContacts(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          
      .catch(next)
  })

  .put(bodyParser,(req, res, next) => {
    const { id, message } = req.body
    const newFields = { contact_type, contact_details }
    contactsService.updateContacts(
    req.app.get('db'), id, newFields)

    .then(numRowsAffected => {
    logger.info(`contacts with ${id} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = contactsRouter

