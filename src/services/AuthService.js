const status = require('http-status');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client();

class AuthService {
  static async verifyGoogleToken(req, res) {
    const { idToken } = req.body;

    if (!idToken) {
      res.status(status.BAD_REQUEST).send({
        success: false,
        message: 'idToken is required',
      });
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken,
        audience: [process.env.GOOGLE_OAUTH_WEBCLIENT_ID],
      });
      const payload = ticket.getPayload();

      res.status(status.OK).send({
        success: true,
        data: payload,
      });
    } catch (err) {
      res.status(status.BAD_REQUEST).send({
        success: false,
        message: err,
      });
    }
  }
}

module.exports = AuthService;
