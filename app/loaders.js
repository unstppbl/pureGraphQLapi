const DataLoader = require('dataloader');
const { executeQuery } = require('./db');
const { groupBy, keyBy } = require('lodash');

const hostsLoader = new DataLoader(async (keys) => {
  const keysList = keys.join(', ');
  try {
    const data = await executeQuery(`SELECT * FROM hosts WHERE id IN (${keysList}) ORDER BY array_position(ARRAY[${keysList}], id)`);
    const hostsById = keyBy(data.rows, 'id');
    return keys.map(id => hostsById[id]);
  } catch (err) {
    console.log(err);
    return null;
  }
});

const resultsLoader = new DataLoader(async (keys) => {
  const keysList = keys.join(', ');
  try {
    const data = await executeQuery(`SELECT * FROM results WHERE object_id IN (${keysList}) ORDER BY array_position(ARRAY[${keysList}], object_id)`);
    const resultsById = groupBy(data.rows, 'object_id');
    return keys.map(id => resultsById[id]);
  } catch (err) {
    console.log(err);
    return null;
  }
});

module.exports = {
  hostsLoader,
  resultsLoader,
};
