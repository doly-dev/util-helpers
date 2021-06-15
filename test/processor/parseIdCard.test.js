import parseIdCard from '../../src/parseIdCard';

describe('parseIdCard', () => {
  it('should be defined', () => {
    expect(parseIdCard).toBeDefined();
  });

  it('错误数据', () => {
    expect(parseIdCard()).toBe(null);
    expect(parseIdCard(true)).toBe(null);
    expect(parseIdCard(null)).toBe(null);
    expect(parseIdCard('')).toBe(null);
    expect(parseIdCard(' ')).toBe(null);
    expect(parseIdCard('13070193103022')).toBe(null);
    expect(parseIdCard('9999999999999999999')).toBe(null);
    expect(parseIdCard('9999999999999999999')).toBe(null);
  });

  it('15位身份证号码', () => {
    expect(parseIdCard('130701931030228')).toEqual({
      birthday: "93-10-30",
      gender: "女",
      origin: { province: "13", city: "07", area: "01", year: "93", month: "10", day: "30", gender: "8" },
      province: "河北省"
    });
  });

  it('18位身份证号码', () => {
    expect(parseIdCard('130701199310302288')).toEqual({
      birthday: "1993-10-30",
      gender: "女",
      origin: { province: "13", city: "07", area: "01", year: "1993", month: "10", day: "30", gender: "8" },
      province: "河北省"
    });

    expect(parseIdCard('52030219891209794X')).toEqual({
      birthday: "1989-12-09",
      gender: "女",
      origin: {
        area: "02",
        city: "03",
        day: "09",
        gender: "4",
        month: "12",
        province: "52",
        year: "1989",
      },
      province: "贵州省"
    });
  });
});
