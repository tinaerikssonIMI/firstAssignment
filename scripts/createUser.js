const fs = require('fs');

const User = require('../user/user');

function createUser(username, password) {
  const fileData = fs.readFileSync('userData/userData.json');
  const userData = JSON.parse(fileData);

  for (const user of userData) {
    if (user.username === username) {
      return 'Username already exists';
    }
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    return 'Password does not meet the criteria';
  }

  const user = new User(username, password);
  userData.push(user);
  fs.writeFileSync('userData/userData.json', JSON.stringify(userData, null, 2));

  return user;
}
module.exports = { createUser };