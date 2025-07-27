const Joi = require('joi');

const ExportPlaylistPayloadSchema = Joi.object({
  targetEmail: Joi.string().email().required(),
});

const ExportValidator = {
  validateExportPlaylistPayload: (payload) => {
    const validationResult = ExportPlaylistPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};

module.exports = ExportValidator;
