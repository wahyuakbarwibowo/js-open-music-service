const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const AuthenticationsPayloadSchema = {
  postAuth: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  putAuth: Joi.object({
    refreshToken: Joi.string().required(),
  }),
  deleteAuth: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const AuthenticationsValidator = {
  validatePostAuthPayload: (payload) => {
    const result = AuthenticationsPayloadSchema.postAuth.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },

  validatePutAuthPayload: (payload) => {
    const result = AuthenticationsPayloadSchema.putAuth.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },

  validateDeleteAuthPayload: (payload) => {
    const result = AuthenticationsPayloadSchema.deleteAuth.validate(payload);
    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = AuthenticationsValidator;
