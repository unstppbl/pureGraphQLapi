const { executeQuery } = require('../db');

const getHost = id => executeQuery(`SELECT * FROM hosts WHERE id=${id}`).then(data => data[0]);
const addHost = object => executeQuery(`INSERT INTO hosts VALUES ${object}`);
const getAllHosts = () => executeQuery('SELECT * FROM hosts');

module.exports = {
  getHost,
  getAllHosts,
  addHost,
};
