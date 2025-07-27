class PlaylistActivitiesHandler {
  constructor(service, playlistsService) {
    this._service = service;
    this._playlistsService = playlistsService;

    this.getActivitiesHandler = this.getActivitiesHandler.bind(this);
  }

  async getActivitiesHandler(request, h) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const activities = await this._service.getActivities(playlistId);

    return h.response({
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    });
  }
}

module.exports = PlaylistActivitiesHandler;
