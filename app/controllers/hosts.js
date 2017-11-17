const { executeQuery } = require('../db');

const getHost = async (id) => {
  try {
    const data = await executeQuery(`SELECT * FROM hosts WHERE id=${id}`);
    return data.rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getAllHosts = async () => {
  try {
    const data = await executeQuery('SELECT * FROM hosts');
    return data.rows;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const addHost = async (object) => {
  try {
    const data = await executeQuery(`INSERT INTO hosts (object) VALUES ('${object}') RETURNING *`);
    return data.rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteHost = async (id) => {
  try {
    const data = await executeQuery(`DELETE FROM hosts WHERE id=${id} RETURNING *`);
    return data.rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

module.exports = {
  getHost,
  getAllHosts,
  addHost,
  deleteHost,
};
