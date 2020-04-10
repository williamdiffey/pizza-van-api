const express = require('express')
const timesService = require('./times-service')
const timesRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()
const { requireAuth } = require('../middleware/jwt-auth')

timesRouter
  .route('/api/times')
  .get((req, res, next) => {
    timesService.getAllTimes(req.app.get('db'))  
    .then(times => {
      res.json(times)
    })  
    .catch(next)
  })

  .delete(requireAuth, bodyParser, (req, res, next) => {
    const { id } = req.body
    timesService.deleteTime(req.app.get('db'), id)
    .then(numRowsAffected => {
    logger.info(`Times with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(requireAuth, bodyParser, (req, res, next) => {
    const { id, date, open, close } = req.body
    for (const field of ['id', 'date', 'open', 'close'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
          const newItem = { id, date, open, close }
            timesService.insertTimes(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          
      .catch(next)
  })

  .put(requireAuth, bodyParser,(req, res, next) => {
    const { id, date, open, close } = req.body
    const newFields = { date, open, close}
    timesService.updateTime(
    req.app.get('db'), id, newFields)

    .then(numRowsAffected => {
    logger.info(`pizza with ${id} updated`)
    res.status(204).end()
    })
      .catch(next)
  })








module.exports = timesRouter

