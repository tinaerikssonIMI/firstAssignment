const User = require('./user')

describe('Create user', () => {
  
  it('Sucessfully creating a user', () => {
    const user = new User('newUser', 'somePassword123!');
    expect(user.username).toBe('newUser');
    expect(user.password).toBe('somePassword123!');
  })

  it('Sucessfully creating a user', () => {
    const user = new User('anotherNewUser', 'somePassword123!');
    expect(user.username).toBe('anotherNewUser');
    expect(user.password).toBe('somePassword123!');
  })
});