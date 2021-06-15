import isRegExp from '../../src/utils/type/isRegExp'

describe('isRegExp', () => {
  it('/abc/ => true', () => {
    expect(isRegExp(/abc/)).toBe(true);
  });
  it('"/abc/" => false', () => {
    expect(isRegExp('/abc/')).toBe(false);
  });
})