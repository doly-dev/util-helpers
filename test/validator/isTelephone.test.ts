import { isTelephone } from '../../src';

describe('isTelephone', () => {
  it('incorrect', () => {
    expect(isTelephone(true)).toBe(false);
    expect(isTelephone(123)).toBe(false);
    expect(isTelephone('13000000000')).toBe(false);
  });

  it('correct', () => {
    expect(isTelephone('22033212')).toBe(true);
    expect(isTelephone('021-22033212')).toBe(true);
    expect(isTelephone('021-22033212-123')).toBe(true);
  });
});
