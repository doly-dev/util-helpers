import * as types from '../../src/utils/type';

describe('type index', () => {
  it('should be defined', () => {
    Object.keys(types).forEach((item) => {
      expect(types[item as keyof typeof types]).toBeDefined();
    });
  });
});
