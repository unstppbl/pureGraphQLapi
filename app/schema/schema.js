const { GraphQLSchema } = require('graphql');
const { Query } = require('./typedefs');

const Schema = new GraphQLSchema({
  query: Query,
});

module.exports = Schema;
