const fs = require('fs');

function changePassword(username, oldPassword, newPassword) {
  const fileData = fs.readFileSync('userData/userData.json');
  const userData = JSON.parse(fileData);

  let user = userData.find(user => user.username === username);

  console.log(user);
  
  if (!user) {
    return "User not found";
  }

  if (user.password !== oldPassword) {
    return "Passwords not matching";
  }

  if (oldPassword === newPassword) {
    return "New password cannot be the same as old password";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    return "invalid password";
  }

  user.password = newPassword;
  fs.writeFileSync('userData/userData.json', JSON.stringify(userData, null, 2));
  return true;
}
module.exports = { changePassword };