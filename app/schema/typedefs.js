const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const { getHost, getAllHosts } = require('../controllers/hosts');
const { getResult, getAllResults } = require('../controllers/results');

const Host = new GraphQLObjectType({
  name: 'Host',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    object: {
      type: GraphQLString,
    },
  }),
});

const Result = new GraphQLObjectType({
  name: 'Result',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    object_id: {
      type: GraphQLID,
    },
    message: {
      type: GraphQLString,
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    host: {
      type: Host,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { id }) {
        return getHost(id);
      },
    },
    allHosts: {
      type: new GraphQLList(Host),
      resolve() {
        return getAllHosts();
      },
    },
    result: {
      type: Result,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { id }) {
        return getResult(id);
      },
    },
    allResults: {
      type: new GraphQLList(Result),
      resolve(parent, { id }) {
        return getAllResults(id);
      },
    },
  }),
});

module.exports = { Query };
