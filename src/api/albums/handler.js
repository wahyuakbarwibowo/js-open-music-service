const Path = require('path');
const { nanoid } = require('nanoid');
const ClientError = require('../../exceptions/ClientError');

class AlbumHandler {
  constructor(service, validator, storageService, albumLikesService, cacheService) {
    this._service = service;
    this._validator = validator;
    this._storageService = storageService;
    this._albumLikesService = albumLikesService;
    this._cacheService = cacheService;

    this.postAlbum = this.postAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.getAlbumById = this.getAlbumById.bind(this);
    this.putAlbumById = this.putAlbumById.bind(this);
    this.deleteAlbumById = this.deleteAlbumById.bind(this);
    this.uploadCoverHandler = this.uploadCoverHandler.bind(this);
    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
    this.deleteAlbumLikeHandler = this.deleteAlbumLikeHandler.bind(this);
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
    const { id } = request.params;
    const { cover } = request.payload;

    if (!cover || !cover.hapi || !cover.hapi.filename) {
      return h.response({ status: 'fail', message: 'File cover tidak ada' }).code(400);
    }

    const allowedMime = ['image/jpeg', 'image/png'];
    if (!allowedMime.includes(cover.hapi.headers['content-type'])) {
      return h.response({ status: 'fail', message: 'Tipe file harus jpg/png' }).code(400);
    }

    const filename = `${nanoid(16)}${Path.extname(cover.hapi.filename)}`;

    // Simpan ke filesystem
    await this._storageService.writeFile(cover, filename);

    const fileUrl = `http://${process.env.HOST}:${process.env.PORT}/uploads/${filename}`;
    await this._service.updateAlbumCover(id, fileUrl);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }

  async postAlbumLikeHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    // Verifikasi album ada
    await this._service.verifyAlbumExists(albumId);

    // Cek apakah sudah like
    const hasLiked = await this._albumLikesService.isUserAlreadyLiked(albumId, userId);
    if (hasLiked) {
      throw new ClientError('Anda sudah menyukai album ini', 400);
    }

    // Tambahkan like
    await this._albumLikesService.addUserLike(albumId, userId);

    // Hapus cache
    await this._cacheService.delete(`album_likes:${albumId}`);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });
    response.code(201);
    return response;
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

  async deleteAlbumLikeHandler(request, h) {
    const { id: albumId } = request.params;
    const { id: userId } = request.auth.credentials;

    // Verifikasi album ada
    await this._service.verifyAlbumExists(albumId);

    // Hapus like
    await this._albumLikesService.removeUserLike(albumId, userId);

    // Hapus cache
    await this._cacheService.delete(`album_likes:${albumId}`);

    return {
      status: 'success',
      message: 'Berhasil batal menyukai album',
    };
  }
}

module.exports = AlbumHandler;
