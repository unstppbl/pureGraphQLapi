const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const { getHost, getAllHosts } = require('../controllers/hosts');
const { getResults, getAllResults } = require('../controllers/results');

const Host = new GraphQLObjectType({
  name: 'Host',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    object: {
      type: GraphQLString,
    },
    results: {
      type: new GraphQLList(Result),
      resolve(parent) {
        return getResults(parent.id);
      },
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
    object: {
      type: Host,
      resolve(parent) {
        return getHost(parent.object_id);
      },
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
    results: {
      type: new GraphQLList(Result),
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { id }) {
        return getResults(id);
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
