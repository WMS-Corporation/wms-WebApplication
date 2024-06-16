import RegisterModel from '../../models/registerModel';

describe('RegisterModel', () => {
  it('should correctly set properties', () => {
    const username = 'testUser';
    const password = process.env.REACT_APP_LOGIN_TEST_PASSWORD;
    const name = 'testName';
    const surname = 'testSurname';
    const type = 'testType';
    const model = new RegisterModel(username, password, name, surname, type);

    expect(model._username).toBe(username);
    expect(model._password).toBe(password);
    expect(model._name).toBe(name);
    expect(model._surname).toBe(surname);
    expect(model._type).toBe(type);
  });
});