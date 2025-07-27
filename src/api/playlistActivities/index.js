const PlaylistActivitiesHandler = require('./handler');
const routes = require('./routes');
const PlaylistActivitiesService = require('../../services/postgres/PlaylistActivitiesService');
const PlaylistsService = require('../../services/postgres/PlaylistsService');

module.exports = {
  name: 'playlistActivities',
  version: '1.0.0',
  register: async (server) => {
    const service = new PlaylistActivitiesService();
    const playlistsService = new PlaylistsService();
    const handler = new PlaylistActivitiesHandler(service, playlistsService);

    server.route(routes(handler));
  },
};
