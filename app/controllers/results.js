const { executeQuery } = require('../db');

const getResult = id => executeQuery(`SELECT * FROM results WHERE id=${id}`).then(data => data[0]);
const getAllResults = () => executeQuery('SELECT * FROM results');

module.exports = {
  getResult,
  getAllResults,
};
