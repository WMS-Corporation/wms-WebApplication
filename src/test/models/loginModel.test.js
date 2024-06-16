import LoginModel from '../../models/loginModel';

describe('LoginModel', () => {
  it('should correctly set username and password', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const model = new LoginModel(username, password);

    expect(model._username).toBe(username);
    expect(model._password).toBe(password);
  });
});