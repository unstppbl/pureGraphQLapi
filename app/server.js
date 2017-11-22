const config = require('config');
const http = require('http');
const messages = require('./messages');
const { graphql } = require('graphql');
const Schema = require('./schema/schema');
const loaders = require('./loaders');

const port = config.get('server.port');
const server = http.createServer().listen(port, () => console.log(`Server listening at: ${port}`));

server.on('request', (req, resp) => {
  if (req.method === 'GET') {
    messages.showHome(req, resp);
  } else if (req.method === 'POST') {
    let query = '';
    req.on('data', (data) => {
      query += data;
      if (query.length > 1e7) { // 10MB
        messages.show413(req, resp);
      }
    });
    req.on('end', () => {
      graphql({ schema: Schema, source: query, contextValue: loaders }).then((data) => {
        messages.sendJson(req, resp, data);
      });
    });
  } else {
    messages.show405(req, resp);
  }
});
