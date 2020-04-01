const xss = require('xss')

const contactsService = {
  getcontacts(db) {
    return db 
    .select('*')
    .from('pizza_contacts')
  },

  insertcontacts(db, newItem) {
    return db
      .insert(newItem)
      .into('pizza_contacts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deletecontacts(db, id) {
    return db('pizza_contacts')
      .where({ id })
      .delete()
  },

  updatecontacts(db, id, newFields) {
    return db('pizza_contacts')
      .where({ id })
      .update(newFields)
  },
}

module.exports = contactsService
