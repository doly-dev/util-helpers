import { formatMobile } from '../src';

describe('formatMobile', () => {
  it('undefined null', () => {
    // @ts-ignore
    expect(formatMobile(null)).toBe('');
    // @ts-ignore
    expect(formatMobile(undefined)).toBe('');
    // @ts-ignore
    expect(formatMobile(void 0)).toBe('');
    // @ts-ignore
    expect(formatMobile()).toBe('');
  });

  it('数字', () => {
    // @ts-ignore
    expect(formatMobile(123)).toBe('123');
    // @ts-ignore
    expect(formatMobile(1234)).toBe('123 4');
    // @ts-ignore
    expect(formatMobile(1234567)).toBe('123 4567');
    // @ts-ignore
    expect(formatMobile(12345678)).toBe('123 4567 8');
    // @ts-ignore
    expect(formatMobile(123456789)).toBe('123 4567 89');
    // @ts-ignore
    expect(formatMobile(1234567890)).toBe('123 4567 890');
    // @ts-ignore
    expect(formatMobile(12345678900)).toBe('123 4567 8900');
  });

  it('字符串', () => {
    expect(formatMobile('123')).toBe('123');
    expect(formatMobile('1234')).toBe('123 4');
    expect(formatMobile('1234567')).toBe('123 4567');
    expect(formatMobile('12345678')).toBe('123 4567 8');
    expect(formatMobile('123456789')).toBe('123 4567 89');
    expect(formatMobile('1234567890')).toBe('123 4567 890');
    expect(formatMobile('12345678900')).toBe('123 4567 8900');
  });

  it('自定义间隔符', () => {
    expect(formatMobile('123', { spaceMark: '-' })).toBe('123');
    expect(formatMobile('1234', { spaceMark: '-' })).toBe('123-4');
    expect(formatMobile('1234567', { spaceMark: '-' })).toBe('123-4567');
    expect(formatMobile('12345678', { spaceMark: '-' })).toBe('123-4567-8');
    expect(formatMobile('123456789', { spaceMark: '-' })).toBe('123-4567-89');
    expect(formatMobile('1234567890', { spaceMark: '-' })).toBe('123-4567-890');
    expect(formatMobile('12345678900', { spaceMark: '-' })).toBe('123-4567-8900');
  });

  it('字符串含间隔符', () => {
    expect(formatMobile('123 4 5 6789')).toBe('123 4567 89');
    expect(formatMobile('123 456 789')).toBe('123 4567 89');
    expect(formatMobile('123456-7890', { spaceMark: '-' })).toBe('123-4567-890');
    expect(formatMobile('123-45-678900', { spaceMark: '-' })).toBe('123-4567-8900');
  });

  it('超过11位', () => {
    expect(formatMobile('12312324354456789', { spaceMark: '-' })).toBe('123-1232-4354');
    expect(formatMobile('123456789132450', { spaceMark: '-' })).toBe('123-4567-8913');
  });

  it('非数字，可能为脱敏', () => {
    expect(formatMobile('133****1234')).toBe('133 **** 1234');
    expect(formatMobile('133****1234', { spaceMark: '-' })).toBe('133-****-1234');
    expect(formatMobile('123akjhf45678900')).toBe('123 akjh f456');
    expect(formatMobile('123akjhf45678900', { spaceMark: '-' })).toBe('123-akjh-f456');
  });
});
