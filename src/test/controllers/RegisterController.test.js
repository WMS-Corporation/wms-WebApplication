import { registerUser } from '../../controllers/RegisterController';
import { register } from '../../services/registerUserService';

jest.mock('../../services/registerUserService');

describe('registerUser', () => {
  it('should call the register service with the correct parameters', async () => {
    const username = 'testUser';
    const password = process.env.REACT_APP_LOGIN_TEST_PASSWORD;
    const name = 'testName';
    const surname = 'testSurname';

    register.mockImplementation(async (username, password, name, surname) => {
      return { username, password, name, surname };
    });

    const result = await registerUser(username, password, name, surname);

    expect(register).toHaveBeenCalledWith(username, password, name, surname);
    expect(result).toEqual({ username, password, name, surname });
  });
});