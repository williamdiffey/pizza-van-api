const express = require('express')
const locationService = require('./location-service')
const locationRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()

locationRouter
  .route('/api/locations')
  .get((req, res, next) => {
    locationService.getLocation(req.app.get('db'))  
    .then(location => {
      res.json(location)
    })  
    .catch(next)
  })

  .delete(bodyParser, (req, res, next) => {
    const { id } = req.body
    locationService.deleteLocation(req.app.get('db'), id)
    .then(numRowsAffected => {
    logger.info(`location with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { geolocation, name } = req.body
    for (const field of ['geolocation', 'name'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      
          const newItem = { geolocation, name }
            locationService.insertLocation(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          
      .catch(next)
  })

  .patch(bodyParser,(req, res, next) => {
    const { id, geolocation, name } = req.body
    const newFields = { geolocation, name }
    locationService.updateLocation(
    req.app.get('db'), id, newFields)

    .then(numRowsAffected => {
    logger.info(`location with ${id} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = locationRouter

