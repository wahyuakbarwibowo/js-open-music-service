const AlbumHandler = require('./handler');
const routes = require('./routes');
const AlbumsService = require('../../services/postgres/AlbumsService');
const validator = require('../../validator/albums');
const StorageService = require('../../services/storage/StorageService');
const AlbumLikesService = require('../../services/postgres/AlbumLikesService');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server) => {
    const service = new AlbumsService();
    const storageService = new StorageService();
    const albumLikesService = new AlbumLikesService();
    const handler = new AlbumHandler(
      service,
      validator,
      storageService,
      albumLikesService,
    );

    server.route(routes(handler));
  },
};
