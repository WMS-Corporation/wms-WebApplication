import { getData } from '../../controllers/HomeController';
import { fetchData } from '../../services/homeService';

jest.mock('../../services/homeService');

describe('getData', () => {
  it('should call the fetchData service', async () => {
    const data = { key: 'value' };

    fetchData.mockImplementation(async () => {
      return data;
    });

    const result = await getData();

    expect(fetchData).toHaveBeenCalled();
    expect(result).toEqual(data);
  });
});