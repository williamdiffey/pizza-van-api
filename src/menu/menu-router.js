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
    const { pizzaname } = req.body
    console.log(pizzaname)   
    menuService.deleteItem(
    req.app.get('db'), pizzaname)

    .then(numRowsAffected => {
    logger.info(`pizza with ${pizzaname} deleted.`)
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

menuRouter
  .route('/api/menu/:item_id')
    .patch((req, res, next) => {
    const { pizzaname, blurb, img } = req.params
    const newItemFields = { pizzaname, blurb, img}
    menuService.patchItem(
    req.app.get('db'), item_id, newItemFields)

    .then(numRowsAffected => {
    logger.info(`pizza with ${name} updated`)
    res.status(204).end()
    })
      .catch(next)
  })






module.exports = menuRouter


// userRouter
//   .route('/user')
//   .get((req, res, next) => {
//     UserService.getAllEmails(req.app.get('db'))
//       .then(user => {
//         res.json(user)
//       })
//     .catch(next)
//   })
  
//   .post(bodyParser, (req, res, next) => {
//     for (const field of ['remail', 'username', 'rpw', 'premteam']) {
//       if (!req.body[field]) {
//         logger.error(`${field} is required`)
//       return res.status(400).send({
//         error: { message: `'${field}' is required` }
//       })
//       }
//     }
//     console.log(req.body)
//     const { remail, username, rpw, premteam } = req.body
//     const pw = bcrypt.hashSync(rpw, 12)
//     const email = bcrypt.hashSync(remail, 12)
    
//     // input verification here
//     // const ratingNum = Number(rating)
//     //   if (!Number.isInteger(ratingNum) || ratingNum < 0 || ratingNum > 5) {
//     //     logger.error(`Invalid rating '${rating}' supplied`)
//     //   return res.status(400).send({
//     //     error: { message: `'rating' must be a number between 0 and 5` }
//     //   })
//     //   }
//     //   if (!isWebUri(url)) {
//     //     logger.error(`Invalid url '${url}' supplied`)
//     //   return res.status(400).send({
//     //     error: { message: `'url' must be a valid URL` }
//     //   })
//     //   }
//     const newUser = { email, username, pw, premteam }
//     console.log(`new user is ${newUser}`)
//     UserService.insertUser (req.app.get('db'), newUser)
//       .then(user => {
//         logger.info(`User with id ${user.id} created and entered in to the database.`)
//         logger.info(`User with hashed email ${user.email} created and entered in to the database.`)
//         logger.info(`User with username ${user.username} created and entered in to the database.`)
//         logger.info(`User with hashed password ${user.pw} created and entered in to the database.`)
//         logger.info(`User with an affiliation for ${user.premteam} created and entered in to the database.`)
//         res.status(201).end()
//         // .location(`/user/${user.id}`)
//         // .json(serializeUser(user))
//       })
//       .catch(next)  
// })

// userRouter
//   .route('/user/:user_id')
//   .all((req, res, next) => {  
//     const { email } = req.params
//     UserService.getById(req.app.get('db'), email)
//     .then(user => {
//       if (!user) {
//       logger.error(`user with email ${email} not found.`)
//       return res.status(404).json({
//       error: { message: `User Not Found` }
//         })
//       }
//       res.user = [user.username, user.email, user.premteam]
//         next()
//     })
//       .catch(next)
//   })

//   .get((req, res) => {
//     res.json(res.user)
//     // res.json(serializeUser(res.user))

//   })

//   .delete((req, res, next) => {
//     const { email } = req.params
//     UserService.deleteUser(
//     req.app.get('db'), user_id)

//     .then(numRowsAffected => {
//     logger.info(`User with id ${email} deleted.`)
//     res.status(204).end()
//     })
//       .catch(next)
//   })
