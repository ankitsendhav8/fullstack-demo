const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', '..', 'database', 'contactUsDetails.json');

class ContactUsController {
  contactUsDetails = async (req, res, next) => {
    try {
      let contactUsDetails = req.body;
      let data_for_update = {
        firstName: contactUsDetails.firstName,
        lastName: contactUsDetails.lastName,
        email: contactUsDetails.email.toLowerCase(),
        description: contactUsDetails.description,
      };
      let oldDataArray = [];
      let oldData = fs.readFileSync(DATA_FILE, 'utf8');
      if (oldData) {
        oldDataArray = JSON.parse(oldData);
      }
      oldDataArray.push(data_for_update);
      fs.writeFileSync(DATA_FILE, JSON.stringify(oldDataArray, null, 2));

      res.status(200).json({
        success: 1,
        message: 'Contact details submitted successfully',
        data: [],
      });
    } catch (err) {
      res.status(500).json({
        success: 0,
        message: err.message || 'Something went wrong please try again',
      });
    }
  };
}
module.exports = new ContactUsController();
