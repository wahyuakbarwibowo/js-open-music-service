const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

const SongToPlaylistPayloadSchema = Joi.object({
  songId: Joi.string().required(),
});

const PlaylistsValidator = {
  validatePlaylistPayload: (payload) => {
    const result = PlaylistPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message);
  },
  validateSongToPlaylistPayload: (payload) => {
    const result = SongToPlaylistPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message);
  },
};

module.exports = PlaylistsValidator;
