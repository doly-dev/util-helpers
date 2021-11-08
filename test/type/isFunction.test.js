import isFunction from '../../src/utils/type/isFunction';

describe('isFunction', () => {
  it('()=>{} => true', () => {
    expect(isFunction(() => {})).toBe(true);
  });
  it('/abc/ => false', () => {
    expect(isFunction(/abc/)).toBe(false);
  });
});
