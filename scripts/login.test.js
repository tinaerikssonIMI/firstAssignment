const { loginUser } = require('../scripts/login');
const fs = require('fs');

jest.mock('fs');

describe('LoginUser', () => {
  let userData;

  beforeEach(() => {
    userData = [
      { username: 'existingUser', password: 'Password1!' },
      { username: 'existingUser2', password: 'Password2!' }
    ];
    fs.readFileSync.mockReturnValue(JSON.stringify(userData));
    fs.writeFileSync.mockClear();
  });

  it('should return true if the username and password match', () => {
    const result = loginUser('existingUser', 'Password1!');
    expect(result).toBe(true);
  });

  it('should return true if the username and password match', () => {
    const result = loginUser('existingUser2', 'Password2!');
    expect(result).toBe(true);
  });

  it('should return error message if the credentials do not match', () => {
    const result = loginUser('existingUser', 'WrongPassword1')
    expect(result).toBe('Login failed, due to incorrect login credentials')
  });

  it('should return error message if the credentials do not match', () => {
    const result = loginUser('existingUser', 'WrongPassword2')
    expect(result).toBe('Login failed, due to incorrect login credentials')
  });
});