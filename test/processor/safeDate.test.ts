import { safeDate } from '../../src';

describe('safeDate', () => {
  it('null, undefined => new Date()', () => {
    expect(safeDate().toString()).not.toBe('Invalid Date');
    expect(safeDate(undefined).toString()).not.toBe('Invalid Date');
    expect(safeDate(void 0).toString()).not.toBe('Invalid Date');
    // @ts-ignore
    expect(safeDate(null).toString()).not.toBe('Invalid Date');
  });

  it('number', () => {
    // 年月日
    expect(safeDate(99, 1)).toEqual(new Date(99, 1));
    expect(safeDate(99, 1, 1)).toEqual(new Date(99, 1, 1));
    expect(safeDate(1999, 1)).toEqual(new Date(1999, 1));
    expect(safeDate(1999, 1, 1)).toEqual(new Date(1999, 1, 1));
    // 毫秒数
    expect(safeDate(1646708035850)).toEqual(new Date(1646708035850));
  });

  it('string', () => {
    expect(safeDate('2022.1.1')).toEqual(new Date('2022/1/1'));
    expect(safeDate('2022.1.1 11:11')).toEqual(new Date('2022/1/1 11:11'));
    expect(safeDate('2022-1-1')).toEqual(new Date('2022/1/1'));
    expect(safeDate('2022-1-1 11:11')).toEqual(new Date('2022/1/1 11:11'));
    expect(safeDate('2022/1/1')).toEqual(new Date('2022/1/1'));
    expect(safeDate('2022/1/1 11:11')).toEqual(new Date('2022/1/1 11:11'));
  });

  it('Date', () => {
    const today = new Date();
    expect(safeDate(today)).toEqual(today);
    expect(safeDate(today)).toEqual(new Date(today));
  });

  it('Invalid Date', () => {
    expect(safeDate('').toString()).toEqual(new Date('').toString());
  });
});
