const { executeQuery } = require('../db');

const getResults = async (id) => {
  try {
    const data = await executeQuery(`SELECT * FROM results WHERE object_id=${id}`);
    return data.rows;
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
  getResults,
  getAllResults,
};
