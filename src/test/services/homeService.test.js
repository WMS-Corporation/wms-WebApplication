import { fetchData } from '../../services/homeService';
import DataModel from '../../models/homeModel';
import { API_URL } from '../../config';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

test('fetchData › should fetch data and return an array of DataModel', async () => {
  const mockData = [{ id: 1, name: 'Test' }];
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  const data = await fetchData();

  expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/data`);
  expect(data).toEqual(mockData.map(item => new DataModel(item.id, item.name)));
});