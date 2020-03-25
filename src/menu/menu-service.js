const xss = require('xss')

const menuService = {
  getAllmenu(db) {
    return db 
    .select('*')
    .from('pizza_menu')
  },

  hasItemWithName(db, pizzaname) {
    return db('pizza_menu')
      .where({ pizzaname })
      .first()
      .then(pizzaname => !!pizzaname)
  },
  insertMenuItem(db, newItem) {
    return db
      .insert(newItem)
      .into('pizza_menu')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteItem(db, id) {
    return db('pizza_menu')
      .where({ id })
      .delete()
  },

  updateItem(db, id, newFields) {
    return db('pizza_menu')
      .where({ id })
      .update(newFields)
  },
}

module.exports = menuService
