const routes = require('./routes');
const CollaborationsHandler = require('./handler');
const validator = require('../../validator/collaborations');
const CollaborationsService = require('../../services/postgres/CollaborationService');
const PlaylistsService = require('../../services/postgres/PlaylistsService');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (server) => {
    const collaborationsService = new CollaborationsService();
    const playlistsService = new PlaylistsService();
    const handler = new CollaborationsHandler(
      collaborationsService,
      playlistsService,
      validator,
    );

    server.route(routes(handler));
  },
};
