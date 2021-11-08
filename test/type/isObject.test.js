import isObject from '../../src/utils/type/isObject';

describe('isObject', () => {
  it('{} => true', () => {
    expect(isObject({})).toBe(true);
  });
  it('[1,2,3] => true', () => {
    expect(isObject([1, 2, 3])).toBe(true);
  });
  it('null => false', () => {
    expect(isObject(null)).toBe(false);
  });
});
