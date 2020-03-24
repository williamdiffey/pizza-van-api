const xss = require('xss')

const timesService = {
  getAllTimes(db) {
    return db 
    .select('*')
    .from('pizza_times')
  },

  insertTimes(db, newItem) {
    return db
      .insert(newItem)
      .into('pizza_times')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  deleteTime(db, id) {
    return db('pizza_times')
      .where({ id })
      .delete()
  },

  updateTime(db, id, newItemFields) {
    return db('pizza_times')
      .where({ id })
      .update(newFields)
  },
}

module.exports = timesService
