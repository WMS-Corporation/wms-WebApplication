import { loginUser } from '../../controllers/LoginController';
import { login } from '../../services/authService';

jest.mock('../../services/authService');

describe('loginUser', () => {
  it('should call the login service with the correct parameters', async () => {
    const username = 'testUser';
    const password = process.env.REACT_APP_LOGIN_TEST_PASSWORD;

    // Set up mock implementation
    login.mockImplementation(async (username, password) => {
      return { username, password };
    });

    const result = await loginUser(username, password);

    expect(login).toHaveBeenCalledWith(username, password);
    expect(result).toEqual({ username, password });
  });
});