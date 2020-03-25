const express = require('express')
const menuService = require('./menu-service')
const menuRouter = express.Router()
const logger = require('../middleware/logger')
const bodyParser = express.json()

menuRouter
  .route('/api/menu')
  .get((req, res, next) => {
    menuService.getAllmenu(req.app.get('db'))  
    .then(menu => {
      res.json(menu)
    })  
    .catch(next)
  })

  .delete(bodyParser, (req, res, next) => {
    const { id } = req.body
    console.log(id)   
    menuService.deleteItem(
    req.app.get('db'), id)

    .then(numRowsAffected => {
    logger.info(`pizza with ${id} deleted.`)
    res.status(204).end()
    })
      .catch(next)
  })

  .post(bodyParser, (req, res, next) => {
    const { pizzaname, blurb, img } = req.body
    for (const field of ['pizzaname', 'blurb', 'img'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })


    menuService.hasItemWithName(
      req.app.get('db'), pizzaname
    )
      .then(hasItemWithName => {
        if (hasItemWithName)
          return res.status(400).json({ error: `Item with that name already in menu` })
    
    
          const newItem = { pizzaname, img, blurb }
            menuService.insertMenuItem(req.app.get('db'), newItem)
              .then(item => {
                res.status(201).end()
           })
          })
      .catch(next)
  })

  .patch(bodyParser,(req, res, next) => {
    const { id, pizzaname, blurb, img } = req.body
    const newFields = { pizzaname, blurb, img}
    menuService.updateItem(
    req.app.get('db'), id, newFields)

    .then(numRowsAffected => {
    logger.info(`pizza with ${id} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = menuRouter

