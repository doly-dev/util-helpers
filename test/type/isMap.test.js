import isMap from '../../src/utils/type/isMap'

describe('isMap', () => {
  it('new Map => true', () => {
    expect(isMap(new Map)).toBe(true);
  });
  it('new WeakMap => false', () => {
    expect(isMap(new WeakMap)).toBe(false);
  });
})