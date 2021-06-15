import isDate from '../../src/utils/type/isDate'

describe('isDate', () => {
  it('new Date => true', () => {
    expect(isDate(new Date)).toBe(true);
  });
  it('Mon April 23 2012 => false', () => {
    expect(isDate('Mon April 23 2012')).toBe(false);
  });
})