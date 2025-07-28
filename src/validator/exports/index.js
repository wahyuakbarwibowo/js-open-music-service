const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const ExportPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email().required(),
});

const ExportValidator = {
  validateExportPlaylistPayload: (payload) => {
    const result = ExportPlaylistPayloadSchema.validate(payload);
    if (result.error) throw new InvariantError(result.error.message);
  },
};

module.exports = ExportValidator;
