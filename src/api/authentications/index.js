const AuthenticationsHandler = require('./handler');
const routes = require('./routes');
const AuthService = require('../../services/postgres/AuthService');
const UsersService = require('../../services/postgres/UsersService');
const authValidator = require('../../validator/authentications');
const tokenManager = require('../../utils/tokenize/TokenManager');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server) => {
    const authService = new AuthService();
    const usersService = new UsersService();
    const handler = new AuthenticationsHandler(
      authService,
      usersService,
      tokenManager,
      authValidator,
    );

    server.route(routes(handler));
  },
};
