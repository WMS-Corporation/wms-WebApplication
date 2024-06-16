import HomeModel from '../../models/HomeModel';

describe('HomeModel', () => {
  it('should correctly set properties', () => {
    const id = 'testId';
    const name = 'testName';
    const model = new HomeModel(id, name);

    expect(model.id).toBe(id);
    expect(model.name).toBe(name);
  });
});