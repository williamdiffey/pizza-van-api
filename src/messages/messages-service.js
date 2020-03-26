const xss = require('xss')

const messagesService = {
  getMessages(db) {
    return db 
    .select('*')
    .from('pizza_messages')
  },

  insertMessages(db, newItem) {
    return db
      .insert(newItem)
      .into('pizza_messages')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteMessages(db, id) {
    return db('pizza_messages')
      .where({ id })
      .delete()
  },

  updateMessages(db, id, newFields) {
    return db('pizza_messages')
      .where({ id })
      .update(newFields)
  },
}

module.exports = messagesService
