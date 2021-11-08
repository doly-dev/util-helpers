import { isTelephone } from '../../src';

describe('isTelephone', () => {
  it('should be defined', () => {
    expect(isTelephone).toBeDefined();
  });

  it('非字符串', () => {
    expect(isTelephone(true)).toBe(false);
    expect(isTelephone(123)).toBe(false);
  });
  it('"22033212" => true', () => {
    expect(isTelephone('22033212')).toBe(true);
  });
  it('"021-22033212" => true', () => {
    expect(isTelephone('021-22033212')).toBe(true);
  });
  it('"021-22033212-123" => true', () => {
    expect(isTelephone('021-22033212-123')).toBe(true);
  });
  it('"13000000000" => false', () => {
    expect(isTelephone('13000000000')).toBe(false);
  });
});
