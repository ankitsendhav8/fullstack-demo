const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'database', 'usersData.json');

class UserService {
  constructor() { }

  getUserDetails = (id) => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');

    if (oldUserRecords) {
      let selectedRecord = JSON.parse(oldUserRecords).filter((user) => user.userId == id);
      const { modifiedAt, password,accessKey, ...safeUser } = selectedRecord[0];
      return [safeUser];
    } else {
      return [];
    }
  };

  updateUserDetails = (data, id) => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      let allUserRecords = JSON.parse(oldUserRecords);
      allUserRecords.forEach((user) => {
        if (user.userId == id) {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.status = data.status;
          user.modifiedAt = data.modifiedAt;
        }
      });
      fs.writeFileSync(DATA_FILE, JSON.stringify(allUserRecords, null, 2));
    }
  };

  getUsersList = () => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      return JSON.parse(oldUserRecords);
    } else {
      return [];
    }
  };
}

module.exports = new UserService();
