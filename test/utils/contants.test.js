import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../src/utils/constants';

describe('constants', () => {
  it('should be defined', () => {
    expect(MAX_SAFE_INTEGER).toBeDefined();
    expect(MIN_SAFE_INTEGER).toBeDefined();
  });

  it('value', () => {
    expect(MAX_SAFE_INTEGER).toBe(Number.MAX_SAFE_INTEGER);
    expect(MIN_SAFE_INTEGER).toBe(Number.MIN_SAFE_INTEGER);

    expect(MAX_SAFE_INTEGER).toBe(9007199254740991);
    expect(MIN_SAFE_INTEGER).toBe(-9007199254740991);

    expect(MAX_SAFE_INTEGER).toBe(Math.pow(2, 53) - 1);
    expect(MIN_SAFE_INTEGER).toBe(-(Math.pow(2, 53) - 1));
  });
});
