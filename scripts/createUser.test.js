const fs = require('fs') 
const { createUser } = require('./createUser') 
const User = require('../user/user') 

jest.mock('fs') 
jest.mock('../user/user') 

describe('createUser', () => {
  let userData 

  beforeEach(() => {
    userData = [
      { username: 'existingUser', password: 'Password1!' }, 
      { username: 'existingUser2', password: 'Password2!' }
    ] 
    fs.readFileSync.mockReturnValue(JSON.stringify(userData)) 
    fs.writeFileSync.mockClear() 
    User.mockClear() 
  }) 

  it('should return "Username already exists" if the username is taken', () => {
    const result = createUser('existingUser', 'NewPassword1!') 
    expect(result).toBe('Username already exists') 
  }) 

  it('should return "Username already exists" if the username is taken', () => {
    const result = createUser('existingUser2', 'NewPassword2!') 
    expect(result).toBe('Username already exists') 
  }) 

  it('should return "Password does not meet the criteria" if the password is invalid', () => {
    const result = createUser('newUser', 'invalidPassword') 
    expect(result).toBe('Password does not meet the criteria') 
  }) 

  it('should return "Password does not meet the criteria" if the password is invalid', () => {
    const result = createUser('newUser', 'someOtherInvalidPassword') 
    expect(result).toBe('Password does not meet the criteria') 
  }) 

  it('should create a new user if the username is not taken and the password is valid', () => {
    const newUser = { username: 'newUser', password: 'ValidPassword1!' } 
    User.mockImplementation((username, password) => newUser) 

    const result = createUser('newUser', 'ValidPassword1!') 
    expect(result).toEqual(newUser) 
    expect(User).toHaveBeenCalledWith('newUser', 'ValidPassword1!') 
    userData.push(newUser) 
    expect(userData).toContainEqual(newUser) 
    expect(fs.writeFileSync).toHaveBeenCalledWith('userData/userData.json', JSON.stringify(userData, null, 2)) 
  }) 

  it('should create a new user if the username is not taken and the password is valid', () => {
    const newUser = { username: 'anotherNewUser', password: 'IsAnotherValidPassword123!' } 
    User.mockImplementation((username, password) => newUser) 

    const result = createUser('newUser', 'ValidPassword1!') 
    expect(result).toEqual(newUser) 
    expect(User).toHaveBeenCalledWith('newUser', 'ValidPassword1!') 
    userData.push(newUser) 
    expect(userData).toContainEqual(newUser) 
    expect(fs.writeFileSync).toHaveBeenCalledWith('userData/userData.json', JSON.stringify(userData, null, 2)) 
  }) 
}) 