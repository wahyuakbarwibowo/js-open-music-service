class AlbumHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postAlbum = this.postAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
    this.putAlbumById = this.putAlbumById.bind(this);
    this.deleteAlbumById = this.deleteAlbumById.bind(this);
  }

  async postAlbum(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: { albumId },
    });
    response.code(201);
    return response;
  }

  async getAlbums(request, h) {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: { albums },
    };
  }

  async getAlbumById(request, h) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: { album },
    };
  }

  async putAlbumById(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);
    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumById(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);
    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumHandler;
