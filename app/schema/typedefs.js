const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const {
  getHost,
  getAllHosts,
  addHost,
  deleteHost,
} = require('../controllers/hosts');
const {
  getResults,
  getAllResults,
} = require('../controllers/results');

const Host = new GraphQLObjectType({
  name: 'Host',
  description: 'Host type for Hosts table in sql db',
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
  description: 'Result type for Results table in sql db',
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
  description: 'Query type for fetching data',
  fields: () => ({
    host: {
      type: Host,
      description: 'Fetch one host by id from db',
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
      description: 'Fetch all hosts from db',
      resolve() {
        return getAllHosts();
      },
    },
    results: {
      type: new GraphQLList(Result),
      description: 'Fetch results for one host from db',
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
      description: 'Fetch all results from db',
      resolve(parent, { id }) {
        return getAllResults(id);
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Adding to and deletion from db',
  fields: () => ({
    deleteHost: {
      type: Host,
      description: 'Delete host with given id from db',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { id }) {
        return deleteHost(id);
      },
    },
    addHost: {
      type: Host,
      description: 'Add host with given url to hosts table in db',
      args: {
        object: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parent, { object }) {
        return addHost(object);
      },
    },
  }),
});

module.exports = { Query, Mutation };
