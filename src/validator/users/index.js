const Joi = require('joi');
const InvariantError = require('../../exceptions/InvariantError');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const schema = Joi.object({
      username: Joi.string()
        .pattern(/^[a-zA-Z0-9_]+$/)
        .required(),
      password: Joi.string().required(),
      fullname: Joi.string().required(),
    });

    const { error } = schema.validate(payload);
    if (error) throw new InvariantError(error.message);
  },
};

module.exports = UsersValidator;
