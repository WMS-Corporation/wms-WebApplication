import LoginModel from '../../models/loginModel';

describe('LoginModel', () => {
  it('should correctly set username and password', () => {
    const username = 'testUser';
    const password = process.env.REACT_APP_LOGIN_TEST_PASSWORD;
    const model = new LoginModel(username, password);

    expect(model._username).toBe(username);
    expect(model._password).toBe(password);
  });
});