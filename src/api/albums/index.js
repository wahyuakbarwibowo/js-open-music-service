const AlbumHandler = require('./handler');
const routes = require('./routes');
const AlbumsService = require('../../services/postgres/AlbumsService');
const AlbumsValidator = require('../../validator/albums');

module.exports = {
  name: 'albums',
  register: async (server) => {
    const service = new AlbumsService();
    const handler = new AlbumHandler(service, AlbumsValidator);

    server.route(routes(handler));
  },
};
