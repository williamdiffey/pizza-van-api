const xss = require('xss')

const contactsService = {
  getContacts(db) {
    return db 
    .select('*')
    .from('pizza_contacts')
  },

  insertContacts(db, newItem) {
    return db
      .insert(newItem)
      .into('pizza_contacts')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteContacts(db, id) {
    return db('pizza_contacts')
      .where({ id })
      .delete()
  },

  updateContacts(db, id, newFields) {
    return db('pizza_contacts')
      .where({ id })
      .update(newFields)
  },
}

module.exports = contactsService
