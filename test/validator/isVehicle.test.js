import isVehicle from '../../src/isVehicle'


describe('isVehicle', () => {
  it('非字符串', () => {
    expect(isVehicle(true)).toBe(false);
    expect(isVehicle(123)).toBe(false);
  });
  it('"BL12345" => true', () => {
    expect(isVehicle('京L12345')).toBe(true);
  });
  it('"BL1234警" => true', () => {
    expect(isVehicle('京L12345')).toBe(true);
  });
  it('"京L1234领" => true', () => {
    expect(isVehicle('京L12345')).toBe(true);
  });
  it('"京L12345" => true', () => {
    expect(isVehicle('京L12345')).toBe(true);
  });
  it('"粤BD12345" => true', () => {
    expect(isVehicle('粤BD12345')).toBe(true);
  });
  it('"粤BF12345" => true', () => {
    expect(isVehicle('粤BF12345')).toBe(true);
  });
  it('"粤B12345D" => true', () => {
    expect(isVehicle('粤B12345D')).toBe(true);
  });
  it('"粤B12345F" => true', () => {
    expect(isVehicle('粤B12345F')).toBe(true);
  });
})