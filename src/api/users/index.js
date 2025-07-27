const UsersValidator = require('../../validator/users');
const UsersHandler = require('./handler');
const routes = require('./routes');
const UsersService = require('../../services/postgres/UsersService');

module.exports = {
  name: 'users',
  version: '1.0.0',
  register: async (server) => {
    const service = new UsersService();
    const handler = new UsersHandler(service, UsersValidator);

    server.route(routes(handler));
  },
};
