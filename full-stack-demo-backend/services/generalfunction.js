const jwt = require('jsonwebtoken');
const AuthService = require('./auth.service');

class GeneralFunctionService {
  constructor() {}

  getCurrentTime = () => new Date().toLocaleTimeString();

  getCurrentDateTime = () => new Date().toISOString();

  verifyToken = (token) => {
    try {
      const decoded = jwt.decode(token);
      let getUserDetails = AuthService.getUserDetailById(decoded.userId);

      if (decoded.access_key === getUserDetails[0]?.accessKey) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  verifyMyToken = (token, id) => {
    try {
      const decoded = jwt.decode(token);
      let getUserDetails = AuthService.getUserDetailById(decoded.userId);
      if (
        decoded.access_key === getUserDetails[0].accessKey &&
        decoded.userId === +id
      ) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };
}

module.exports = new GeneralFunctionService();
