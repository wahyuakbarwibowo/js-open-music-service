const path = require('path');
const AlbumHandler = require('./handler');
const routes = require('./routes');
const AlbumsService = require('../../services/postgres/AlbumsService');
const validator = require('../../validator/albums');
const StorageService = require('../../services/storage/StorageService');
const AlbumLikesService = require('../../services/postgres/AlbumLikesService');
const CacheService = require('../../services/cache/CacheService');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server) => {
    const service = new AlbumsService();
    const storageService = new StorageService(path.resolve(__dirname, '../../../uploads'));
    const albumLikesService = new AlbumLikesService();
    const cacheService = new CacheService();
    const handler = new AlbumHandler(
      service,
      validator,
      storageService,
      albumLikesService,
      cacheService,
    );

    server.route(routes(handler));
  },
};
