import { isVehicle } from '../src';

describe('isVehicle', () => {
  it('incorrect', () => {
    expect(isVehicle(true)).toBe(false);
    expect(isVehicle(123)).toBe(false);
    expect(isVehicle('京L1234领')).toBe(false);
  });

  it('correct', () => {
    expect(isVehicle('京L12345')).toBe(true);
    expect(isVehicle('BL1234警')).toBe(true);
    expect(isVehicle('京L1234学')).toBe(true);
    expect(isVehicle('粤BD12345')).toBe(true);
    expect(isVehicle('粤BF12345')).toBe(true);
    expect(isVehicle('粤B12345D')).toBe(true);
    expect(isVehicle('粤B12345F')).toBe(true);
  });
});
