const startTraining = require('./startTraining')
const deleteBookTraining = require('./deleteTheExerciseBook.js')
module.exports = {
  ...require('./getActiveTrainigs'),
  ...require('./updateTrainigStatus'),
  startTraining,
  deleteBookTraining,
}
