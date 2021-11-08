import isSet from '../../src/utils/type/isSet';

describe('isSet', () => {
  it('new Set => true', () => {
    expect(isSet(new Set())).toBe(true);
  });
  it('new WeakSet => false', () => {
    expect(isSet(new WeakSet())).toBe(false);
  });
});
