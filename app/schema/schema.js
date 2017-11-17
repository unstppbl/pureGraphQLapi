const { GraphQLSchema } = require('graphql');
const { Query, Mutation } = require('./typedefs');

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

module.exports = Schema;
