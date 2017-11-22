const DataLoader = require('dataloader');
const { executeQuery } = require('./db');

const hostsLoader = new DataLoader(async (keys) => {
  const keysList = keys.join(', ');
  try {
    const data = await executeQuery(`SELECT * FROM hosts WHERE id IN (${keysList}) ORDER BY array_position(ARRAY[${keysList}], id)`);
    const resultLength = data.rows.length;
    const queryLength = keys.length;
    if (resultLength !== queryLength) {
      throw new Error('Result length is not valid');
    }
    return data.rows;
  } catch (err) {
    console.log(err);
    return null;
  }
});

const resultsLoader = new DataLoader(async (keys) => {
  const keysList = keys.join(', ');
  try {
    const data = await executeQuery(`SELECT * FROM results WHERE id IN (${keysList}) ORDER BY array_position(ARRAY[${keysList}], id)`);
    const resultLength = data.rows.length;
    const queryLength = keys.length;
    if (resultLength !== queryLength) {
      throw new Error('Result length is not valid');
    }
    return data.rows;
  } catch (err) {
    console.log(err);
    return null;
  }
});

module.exports = {
  hostsLoader,
  resultsLoader,
};
