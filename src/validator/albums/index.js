const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const IMAGE_HEADERS = ['image/jpeg', 'image/png'];

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateImageHeaders: (headers) => {
    const contentType = headers['content-type'];
    if (!IMAGE_HEADERS.includes(contentType)) {
      throw new InvariantError('Berkas harus berupa gambar');
    }
  },
};

module.exports = AlbumsValidator;
