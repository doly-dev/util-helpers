import isWeakMap from '../../src/utils/type/isWeakMap'

describe('isWeakMap', () => {
  it('new WeakMap => true', () => {
    expect(isWeakMap(new WeakMap)).toBe(true);
  });
  it('new Map => false', () => {
    expect(isWeakMap(new Map)).toBe(false);
  });
})