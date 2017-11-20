const { executeQuery } = require('../db');

const getHost = async (id) => {
  try {
    const data = await executeQuery('SELECT * FROM hosts WHERE id=$1', [id]);
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
    const data = await executeQuery('INSERT INTO hosts (object) VALUES ($1) RETURNING *', [object]);
    return data.rows[0];
  } catch (err) {
    console.log(err);
    return null;
  }
};

const deleteHost = async (id) => {
  try {
    const data = await executeQuery('DELETE FROM hosts WHERE id=$1 RETURNING *', [id]);
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
