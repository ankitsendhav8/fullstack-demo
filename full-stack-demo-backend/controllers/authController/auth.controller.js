const jwtwebtoken = require('jsonwebtoken');
const AuthService = require('../../services/auth.service');
const GeneralFunctionService = require('../../services/generalfunction');
const bcrypt = require('bcryptjs');

class AuthController {
  constructor(authService) {
    this.AuthService = authService;
  }
  signup = async (req, res) => {
    try {
      const data = req.body;
      let result;

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(data.password, salt, async (err, hash) => {
          if (err) {
            return res
              .status(500)
              .json({ error: 'Error while encrypting password' });
          }
          let getUserCount = await AuthService.getUserCount();
          let getUserDetailByEmail = await AuthService.getUserDetailByEmail(data.email);
          if (getUserDetailByEmail && getUserDetailByEmail.length) {
            return res.status(200).json({
              success: 0,
              message: 'Email already exists',
            });
          }
          let userDetails = {
            firstName: data.firstName,
            lastName: data.lastName,
            createdAt: GeneralFunctionService.getCurrentDateTime(),
            modifiedAt: '',
            status: 'Active',
            email: data.email,
            password: hash,
            userId: getUserCount + 1,
            accessKey: ''
          };

          result = AuthService.signup(userDetails);

          if (result) {
            res.status(200).json({
              success: 1,
              message: 'User registered successfully',
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Something went wrong, please try again',
              data: {},
            });
          }
        });
      });
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.code,
      });
    }
  };

  login = async (req, res, next) => {
    try {
      const loginDetails = req.body;
      let date = new Date();
      let getUserDetailByEmail = AuthService.getUserDetailByEmail(
        loginDetails.email
      );

      if (getUserDetailByEmail && getUserDetailByEmail.length) {
        bcrypt.compare(
          loginDetails.password,
          getUserDetailByEmail[0].password,
          async (err, isMatch) => {
            if (!isMatch) {
              res.status(200).json({
                success: 0,
                message: 'Invalid credential',
              });
            } else {
              let accessKey =
                Math.floor(Math.random() * 1000000 + 1) +
                '_fullstack-demo_' +
                date.getTime();

              AuthService.updateUserAccessKey(
                getUserDetailByEmail[0].userId,
                accessKey
              );

              let getUserDetailById = AuthService.getUserDetailById(
                getUserDetailByEmail[0].userId
              );
              let jwtSecretKey = process.env.JWT_SECRET;
              console.log('jwtSecretKey----',jwtSecretKey);
              let tokendata = {
                userId: getUserDetailById[0].userId,
                email: getUserDetailById[0].email,
                firstName: getUserDetailById[0].firstName,
                lastName: getUserDetailById[0].lastName,
                status: getUserDetailById[0].status,
                access_key: getUserDetailById[0].accessKey,
              };

              const token = jwtwebtoken.sign(tokendata, jwtSecretKey);
              let response = tokendata;
              response.access_token = token;

              res.status(200).json({
                success: 1,
                message: 'User logged in successfully',
                data: response,
              });
            }
          }
        );
      } else {
        res.status(200).json({
          success: 0,
          message: 'No user found',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong with password update',
      });
    }
  };
  logout = async (req, res) => {
    try {

      
      if (req.headers && req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1];
        let isTokenVerified = GeneralFunctionService.verifyToken(token);
        if (isTokenVerified) {
          console.log('isTokenVerified----',isTokenVerified);
          const decoded = jwtwebtoken.decode(token);
          console.log('decoded----',decoded.userId);
          const result = AuthService.logoutUser(decoded.userId);
          if (result) {
            res.status(200).json({
              success: 1,
              message: 'User logout successfully',
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Something went wrong, please try again.',
            });
          }
        } else {
          res.status(400).json({
            success: 0,
            message: 'Unauthorized User ',
          });
        }
      } else {
        res.status(200).json({
          success: 0,
          message: 'Token not found',
        });
      }
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message,
      });
    }
  };
}
module.exports = new AuthController(AuthService);
