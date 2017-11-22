const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const {
  getAllHosts,
  addHost,
  deleteHost,
} = require('../controllers/hosts');
const {
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
      resolve(parent, args, { resultsLoader }) {
        return resultsLoader.load(parent.id);
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
      type: Message,
      resolve(parent) {
        return JSON.parse(parent.message);
      },
    },
    object: {
      type: Host,
      resolve(parent, args, { hostsLoader }) {
        return hostsLoader.load(parent.object_id);
      },
    },
  }),
});

const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'Parsed result fields',
  fields: () => ({
    framework_name: {
      type: GraphQLString,
    },
    framework_type: {
      type: GraphQLString,
    },
    framework_version: {
      type: GraphQLString,
    },
    server_name: {
      type: GraphQLString,
    },
    server_version: {
      type: GraphQLString,
    },
    components: {
      type: new GraphQLList(GraphQLString),
    },
    https_redirected: {
      type: GraphQLString,
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
      resolve(parent, { id }, { hostsLoader }) {
        return hostsLoader.load(id);
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
      type: Result,
      description: 'Fetch results for one host from db',
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parent, { id }, { resultsLoader }) {
        return resultsLoader.load(id);
      },
    },
    allResults: {
      type: new GraphQLList(Result),
      description: 'Fetch all results from db',
      resolve() {
        return getAllResults();
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
      resolve(parent, { id }, { hostsLoader }) {
        hostsLoader.clear(id);
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
