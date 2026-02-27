const UserService = require('../../services/user.service');
const GeneralFunctionService = require('../../services/generalfunction');

class UserController {
  constructor(userService) {
    this.UserService = userService;
  }

  getUserDetails = async (req, res, next) => {
    try {
      const userId = req.params.userId;

      if (req.headers && req.headers.authorization) {
        let isTokenVerified = GeneralFunctionService.verifyToken(
          req.headers.authorization.split(' ')[1]
        );
        if (isTokenVerified) {
          let result = UserService.getUserDetails(userId);
          if (result && result.length) {
            res.status(200).json({
              success: 1,
              message: 'User details found successfully',
              data: result,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'No user detail found',
              data: result,
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
        message: err.message || 'Something went wrong please try again',
      });
    }
  };

  updateUserDetails = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      let userDetails = req.body;
      if (req.headers && req.headers.authorization) {
        let isTokenVerified = GeneralFunctionService.verifyMyToken(
          req.headers.authorization.split(' ')[1],
          userId
        );
        if (isTokenVerified) {
          let data_for_update = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            status: userDetails.status,
            modifiedAt: GeneralFunctionService.getCurrentDateTime(),
          };
          UserService.updateUserDetails(data_for_update, userId);
          let result = UserService.getUserDetails(userId);
          if (result && result.length) {
            res.status(200).json({
              success: 1,
              message: 'User details updated successfully',
              data: result,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Something went wrong,please try again',
              data: result,
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
        message: err.message || 'Something went wrong please try again',
      });
    }
  };

  getUsersList = async (req, res, next) => {
    try {
      if (req.headers && req.headers.authorization) {
        let isTokenVerified = GeneralFunctionService.verifyToken(
          req.headers.authorization.split(' ')[1]
        );
        if (isTokenVerified) {
          let result = UserService.getUsersList();
          if (result && result.length) {
            res.status(200).json({
              success: 1,
              message: 'Users list fetched successfully',
              data: result,
            });
          } else {
            res.status(200).json({
              success: 0,
              message: 'Something went wrong,please try again',
              data: result,
            });
          }
        } else {
          res.status(400).json({
            success: 0,
            message: 'Unauthorized user ',
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
        message: err.message || 'Something went wrong please try again',
      });
    }
  };
}
module.exports = new UserController(UserService);
