import { login } from '../../services/authService';
import LoginModel from '../../models/loginModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('login › should log in a user and return the user data', async () => {
  const mockData = { id: 1, username: 'TestUser', name: 'Test', surname: 'User', role: 'Operational' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await login('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD);

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(new LoginModel('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD)),
  });
  expect(data).toEqual(mockData);
});

test('login › should throw an error when the response is not ok', async () => {
  const mockErrorResponse = { message: 'Error message' };
  fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 500 });

  await expect(login('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD)).rejects.toThrow('Error message');
});