import RegisterModel from '../../models/RegisterModel';

describe('RegisterModel', () => {
  it('should correctly set properties', () => {
    const username = 'testUser';
    const password = 'testPassword';
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