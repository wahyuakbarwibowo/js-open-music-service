const routes = require('./routes');
const PlaylistsService = require('../../services/postgres/PlaylistsService');
const SongsService = require('../../services/postgres/SongsService');
const PlaylistsHandler = require('./handler');
const validator = require('../../validator/playlists/validator');
const PlaylistActivitiesService = require('../../services/postgres/PlaylistActivitiesService');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server) => {
    const playlistsService = new PlaylistsService();
    const songsService = new SongsService();
    const playlistActivitiesService = new PlaylistActivitiesService();
    const handler = new PlaylistsHandler(
      playlistsService,
      songsService,
      playlistActivitiesService,
      validator,
    );

    server.route(routes(handler));
  },
};
