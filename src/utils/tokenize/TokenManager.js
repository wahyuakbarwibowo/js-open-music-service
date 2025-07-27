const Jwt = require('@hapi/jwt');

const TokenManager = {
  generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),

  generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),

  verifyRefreshToken: (token) => {
    try {
      const artifacts = Jwt.token.decode(token);
      Jwt.token.verify(artifacts, process.env.REFRESH_TOKEN_KEY);
      return artifacts.decoded.payload;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  },
};

module.exports = TokenManager;
