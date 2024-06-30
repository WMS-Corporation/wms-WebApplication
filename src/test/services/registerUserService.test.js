import { register } from '../../services/registerUserService';
import RegisterModel from '../../models/registerModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('register › should register a user and return the user data along with a token', async () => {
  const mockData = {
    token: 'fakeToken123',
    user: { id: 1, username: 'TestUser', name: 'Test', surname: 'User', role: 'Operational' }
  };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await register('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD, 'Test', 'User', 'Operational');

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(new RegisterModel('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD, 'Test', 'User', 'Operational')),
  });
  expect(data).toEqual(mockData);
});

test('register › should throw an error when the response is not ok', async () => {
  const mockErrorResponse = { message: 'Error message' };
  fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), { status: 500 });

  await expect(register('TestUser', process.env.REACT_APP_LOGIN_TEST_PASSWORD, 'Test', 'User')).rejects.toThrow('Error message');
});