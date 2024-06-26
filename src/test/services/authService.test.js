import { login } from '../../services/authService';
import LoginModel from '../../models/loginModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();

    jest.spyOn(global.localStorage.__proto__, 'getItem');
    global.localStorage.__proto__.getItem = jest.fn(() => 'token');
});

test('login › should log in a user and return the user data', async () => {
  const mockData = {
    token: 'fakeToken123',
    user: { id: 1, username: 'TestUser', name: 'Test', surname: 'User', role: 'Operational' },
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const {token, user} = await login('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD);

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(new LoginModel('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD)),
  });
  expect(token).toEqual(mockData.token);
  expect(user).toEqual(mockData.user);
});

test('login › should throw an error when the response is not ok', async () => {
  const mockErrorResponse = { message: 'Error message' };
  fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 500 });

  await expect(login('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD)).rejects.toThrow('Error message');
});