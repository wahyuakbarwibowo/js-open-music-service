class AuthHandler {
  constructor(authService, userService, tokenManager, validator) {
    this._authService = authService;
    this._userService = userService;
    this._tokenManager = tokenManager;
    this._validator = validator;

    this.postAuthHandler = this.postAuthHandler.bind(this);
    this.putAuthHandler = this.putAuthHandler.bind(this);
    this.deleteAuthHandler = this.deleteAuthHandler.bind(this);
  }

  async postAuthHandler(request, h) {
    this._validator.validatePostAuthPayload(request.payload);
    const { username, password } = request.payload;

    const id = await this._userService.verifyUserCredential(username, password);

    const accessToken = this._tokenManager.generateAccessToken({ userId: id });
    const refreshToken = this._tokenManager.generateRefreshToken({ userId: id });

    await this._authService.addRefreshToken(refreshToken);

    return h.response({
      status: 'success',
      data: { accessToken, refreshToken },
    }).code(201);
  }

  async putAuthHandler(request, h) {
    this._validator.validatePutAuthPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authService.verifyRefreshToken(refreshToken);
    const { userId } = this._tokenManager.verifyRefreshToken(refreshToken);

    const newAccessToken = this._tokenManager.generateAccessToken({ userId });

    return h.response({
      status: 'success',
      data: { accessToken: newAccessToken },
    });
  }

  async deleteAuthHandler(request, h) {
    this._validator.validateDeleteAuthPayload(request.payload);
    const { refreshToken } = request.payload;

    await this._authService.verifyRefreshToken(refreshToken);
    await this._authService.deleteRefreshToken(refreshToken);

    return h.response({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  }
}

module.exports = AuthHandler;
