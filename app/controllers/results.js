const { executeQuery } = require('../db');

const getResult = async (id) => {
  try {
    const data = await executeQuery(`SELECT * FROM results WHERE id=${id}`);
    return data.rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllResults = async () => {
  try {
    const data = await executeQuery('SELECT * FROM results');
    return data.rows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getResult,
  getAllResults,
};
