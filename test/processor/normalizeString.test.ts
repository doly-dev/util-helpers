import { normalizeString } from '../../src';

describe('normalizeString', () => {
  it('null, undefined => ""', () => {
    // @ts-ignore
    expect(normalizeString()).toBe('');
    expect(normalizeString(undefined)).toBe('');
    expect(normalizeString(void 0)).toBe('');
    expect(normalizeString(null)).toBe('');
  });

  it('boolean', () => {
    expect(normalizeString(true)).toBe('true');
    expect(normalizeString(false)).toBe('false');
  });

  it('number', () => {
    expect(normalizeString(1)).toBe('1');
    expect(normalizeString(NaN)).toBe('NaN');
  });

  it('string', () => {
    expect(normalizeString('')).toBe('');
    expect(normalizeString('a')).toBe('a');
  });
});
