const prompt = require("prompt-sync")();

const createUser = require("./scripts/createUser")
const login = require("./scripts/login")
const changePassword = require("./scripts/password")

const User = require("./user")

function startApplication () {
  console.log('Welcome to the application');
  console.log('1. Login');
  console.log('2. Create user');
  console.log('3. Change password');
  console.log('4. Exit');
  const choice = prompt('Enter your choice: ');

  switch (choice) {
    case '1':
      const username2 = prompt('Enter username: ');
      const password2 = prompt('Enter password: ');
      const result = login.loginUser(username2, password2);
      console.log(result);
      break;
    case '2':
      const username = prompt('Enter username: ');
      const password = prompt('Enter password: ');
      result = createUser.createUser(username, password);
      if (result instanceof User) {
        console.log(`Your account has been created with username: ${result.username} and password: ${result.password}`);
      }
      break;
    case '3':
      const username3 = prompt('Enter username: ');
      const oldPassword = prompt('Enter old password: ');
      const newPassword = prompt('Enter new password: ');
      result = changePassword.changePassword(username3, oldPassword, newPassword);
      break;
    case '4':
     process.exit();
    default:
      console.log('Invalid choice');
  }
}

while (true) {
  startApplication();
}