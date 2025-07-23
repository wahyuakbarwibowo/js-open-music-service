const SongsHandler = require('./handler');
const routes = require('./routes');
const SongsService = require('../../services/postgres/SongsService');
const SongsValidator = require('../../validator/songs');

module.exports = {
  name: 'songs',
  register: async (server) => {
    const service = new SongsService();
    const handler = new SongsHandler(service, SongsValidator);

    server.route(routes(handler));
  },
};
