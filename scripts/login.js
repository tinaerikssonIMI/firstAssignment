const fs = require('fs');

function loginUser(username, password) {
  const fileData = fs.readFileSync('userData/userData.json');
  const userData = JSON.parse(fileData);
  
  for (const user of userData) {  
    if (user.username === username && user.password === password) {
      return true;
    }
  }

  return 'Login failed, due to incorrect login credentials';
}
module.exports = { loginUser };
