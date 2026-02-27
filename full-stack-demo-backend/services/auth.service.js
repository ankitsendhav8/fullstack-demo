const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'database', 'usersData.json');

class AuthService {
  constructor() { }

  signup = (data) => {
    let allUserRecords = [];
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      allUserRecords = JSON.parse(oldUserRecords);
    }
    allUserRecords.push(data);
    fs.writeFileSync(DATA_FILE, JSON.stringify(allUserRecords, null, 2));
    return true;
  };

  getUserDetailByEmail = (email) => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      return JSON.parse(oldUserRecords).filter((user) => user.email.toLowerCase() == email.toLowerCase());
    } else {
      return [];
    }
  };

  getUserDetailById = (id) => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      return JSON.parse(oldUserRecords).filter((user) => user.userId == id);
    } else {
      return [];
    }
  };

  updateUserAccessKey = (id, accessKey) => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      let allUserRecords = JSON.parse(oldUserRecords);
      allUserRecords.forEach((user) => {
        if (user.userId == id) {
          user.accessKey = accessKey;
        }
      });
      fs.writeFileSync(DATA_FILE, JSON.stringify(allUserRecords, null, 2));
    }
  };

  logoutUser = (id) => {
    console.log('id----',id);
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      let allUserRecords = JSON.parse(oldUserRecords);
      allUserRecords.forEach((user) => {
        if (user.userId == id) {
          user.accessKey = '';
        }
      });
      fs.writeFileSync(DATA_FILE, JSON.stringify(allUserRecords, null, 2));
    }
    return true;
  };

  getUserCount = () => {
    let oldUserRecords = fs.readFileSync(DATA_FILE, 'utf8');
    if (oldUserRecords) {
      let allUserRecords = JSON.parse(oldUserRecords);
      return allUserRecords.length;
    } else {
      return 0;
    }
  };
}

module.exports = new AuthService();
