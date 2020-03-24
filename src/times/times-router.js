const express = require('express')
const timesService = require('./times-service')
const timesRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()

timesRouter
  .route('/api/times')
  .get((req, res, next) => {
    timesService.getAllTimes(req.app.get('db'))  
    .then(times => {
      res.json(times)
    })  
    .catch(next)
  })

  .delete(bodyParser, (req, res, next) => {
    const { id } = req.body
    timesService.deleteTime(req.app.get('db'), id)
    .then(numRowsAffected => {
    logger.info(`Times with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { date, open, close } = req.body
    for (const field of ['date', 'open', 'close'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
          const newItem = { date, open, close }
            timesService.insertTimes(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          
      .catch(next)
  })

timesRouter
  .route('/api/times/:item_id')
    .patch((req, res, next) => {
    const { pizzaname, blurb, img } = req.params
    const newItemFields = { pizzaname, blurb, img}
    timesService.patchItem(
    req.app.get('db'), item_id, newItemFields)

    .then(numRowsAffected => {
    logger.info(`pizza with ${name} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = timesRouter

