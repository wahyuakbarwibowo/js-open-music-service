const routes = require('./routes');
const PlaylistsHandler = require('./handler');
const validator = require('../../validator/exports');
const PlaylistsService = require('../../services/postgres/PlaylistsService');
const ProducerService = require('../../services/rabbitmq/ProducerService');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server) => {
    const playlistsService = new PlaylistsService();
    const producerService = new ProducerService();
    const handler = new PlaylistsHandler(
      playlistsService,
      producerService,
      validator,
    );

    server.route(routes(handler));
  },
};
