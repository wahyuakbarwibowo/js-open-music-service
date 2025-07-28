class AlbumHandler {
  constructor(service, validator, storageService, albumLikesService) {
    this._service = service;
    this._validator = validator;
    this._storageService = storageService;
    this._albumLikesService = albumLikesService;

    this.postAlbum = this.postAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
    this.putAlbumById = this.putAlbumById.bind(this);
    this.deleteAlbumById = this.deleteAlbumById.bind(this);
    this.uploadCoverHandler = this.uploadCoverHandler.bind(this);
    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
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

  async uploadCoverHandler(request, h) {
    const { cover } = request.payload;
    const { id } = request.params;

    this._validator.validateImageHeaders(cover.hapi.headers);

    await this._service.getAlbumById(id); // pastikan album ada

    const filename = await this._storageService.writeFile(cover, cover.hapi);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`;

    await this._service.updateAlbumCover(id, fileUrl);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }

  async postAlbumLikeHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    const hasLiked = await this._albumLikesService.hasUserLiked(albumId, userId);

    if (hasLiked) {
      await this._albumLikesService.unlikeAlbum(albumId, userId);
      return {
        status: 'success',
        message: 'Batal menyukai album',
      };
    }

    await this._albumLikesService.likeAlbum(albumId, userId);
    return h.response({
      status: 'success',
      message: 'Album disukai',
    }).code(201);
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;
    const { count, fromCache } = await this._albumLikesService.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: { likes: count },
    });

    if (fromCache) {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  }
}

module.exports = AlbumHandler;
