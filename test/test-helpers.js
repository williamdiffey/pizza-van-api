const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      password: 'password',
    },
    {
      id: 2,
      user_name: 'test-user-2',
      password: 'password',
    },
  ]
}

function makeMenuArray() {
  return [
    {
      id: 1,
      pizzaname: 'Supreme',
      img: 'https://images.app.goo.gl/W5EMVftSGQZLCFk48',
      blurb: 'How-to',
    },
    {
      id: 2,
      pizzaname: 'Calzone',
      img: 'https://images.app.goo.gl/W5EMVftSGQZLCFk48',
      blurb: 'How-to',
    },
  ]
}

function makeExpectedmenu(users, menu, comments=[]) {
  const author = users
    .find(user => user.id === menu.author_id)

  const number_of_comments = comments
    .filter(comment => comment.menu_id === menu.id)
    .length

  return {
    id: menu.id,
    style: menu.style,
    title: menu.title,
    content: menu.content,
    date_created: menu.date_created.toISOString(),
    number_of_comments,
    author: {
      id: author.id,
      user_name: author.user_name,
      full_name: author.full_name,
      nickname: author.nickname,
      date_created: author.date_created.toISOString(),
      date_modified: author.date_modified || null,
    },
  }
}

function makeExpectedmenuComments(users, menuId, comments) {
  const expectedComments = comments
    .filter(comment => comment.menu_id === menuId)

  return expectedComments.map(comment => {
    const commentUser = users.find(user => user.id === comment.user_id)
    return {
      id: comment.id,
      text: comment.text,
      date_created: comment.date_created.toISOString(),
      user: {
        id: commentUser.id,
        user_name: commentUser.user_name,
        full_name: commentUser.full_name,
        nickname: commentUser.nickname,
        date_created: commentUser.date_created.toISOString(),
        date_modified: commentUser.date_modified || null,
      }
    }
  })
}

function makemenuFixtures() {
  const testUsers = makeUsersArray()
  const testMenu = makeMenuArray()
  return { testUsers, testMenu }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        pizza_menu,
        pizza_users,
      `
    )
    .then(() =>
      Promise.all([
        trx.raw(`ALTER SEQUENCE pizza_menu_id_seq minvalue 0 START WITH 1`),
        trx.raw(`ALTER SEQUENCE pizza_users_id_seq minvalue 0 START WITH 1`),
        trx.raw(`SELECT setval('pizza_menu_id_seq', 0)`),
        trx.raw(`SELECT setval('pizza_users_id_seq', 0)`),
      ])
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('pizza_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('pizza_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedmenuTables(db, menu,) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('pizza_menu').insert(menu)
    // update the auto sequence to match the forced id values
  })
}

function seedMaliciousmenu(db, user, menu) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('pizza_menu')
        .insert([menu])
    )
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeMenuArray,
  makemenuArray,
  makeExpectedmenu,
  makeExpectedmenuComments,
  makeMaliciousmenu,
  makeCommentsArray,

  makemenuFixtures,
  cleanTables,
  seedmenuTables,
  seedMaliciousmenu,
  makeAuthHeader,
  seedUsers,
}
