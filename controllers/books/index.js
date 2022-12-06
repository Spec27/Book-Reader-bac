const add = require('./add')

module.exports = {
  add,
  ...require('./updateResume.js'),
  ...require('./updateStatus'),
}
