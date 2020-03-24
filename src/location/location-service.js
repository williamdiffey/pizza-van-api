const xss = require('xss')

const locationService = {
  getLocation(db) {
    return db 
    .select('*')
    .from('pizza_location')
  },

  insertLocation(db, newItem) {
    return db
      .insert(newItem)
      .into('pizza_location')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteLocation(db, id) {
    return db('pizza_location')
      .where({ id })
      .delete()
  },

  updateLocation(db, id, newFields) {
    return db('pizza_location')
      .where({ id })
      .update(newFields)
  },
}

module.exports = locationService
