import { formatMobile } from '../../src';

describe('formatMobile', () => {
  it('should be defined', () => {
    expect(formatMobile).toBeDefined();
  });

  it('undefined null', () => {
    expect(formatMobile(null)).toBe('');
    expect(formatMobile(undefined)).toBe('');
    expect(formatMobile(void 0)).toBe('');
    expect(formatMobile()).toBe('');
  });

  it('数字', () => {
    expect(formatMobile(123)).toBe('123');
    expect(formatMobile(1234)).toBe('123 4');
    expect(formatMobile(1234567)).toBe('123 4567');
    expect(formatMobile(12345678)).toBe('123 4567 8');
    expect(formatMobile(123456789)).toBe('123 4567 89');
    expect(formatMobile(1234567890)).toBe('123 4567 890');
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
    expect(formatMobile('123', { char: '-' })).toBe('123');
    expect(formatMobile('1234', { char: '-' })).toBe('123-4');
    expect(formatMobile('1234567', { char: '-' })).toBe('123-4567');
    expect(formatMobile('12345678', { char: '-' })).toBe('123-4567-8');
    expect(formatMobile('123456789', { char: '-' })).toBe('123-4567-89');
    expect(formatMobile('1234567890', { char: '-' })).toBe('123-4567-890');
    expect(formatMobile('12345678900', { char: '-' })).toBe('123-4567-8900');
  });

  it('字符串含间隔符', () => {
    expect(formatMobile('123 4 5 6789')).toBe('123 4567 89');
    expect(formatMobile('123 456 789')).toBe('123 4567 89');
    expect(formatMobile('123456-7890', { char: '-' })).toBe('123-4567-890');
    expect(formatMobile('123-45-678900', { char: '-' })).toBe('123-4567-8900');
  });

  it('超过11位', () => {
    expect(formatMobile('12312324354456789', { char: '-' })).toBe('123-1232-4354');
    expect(formatMobile('123456789132450', { char: '-' })).toBe('123-4567-8913');
  });

  it('非数字，可能为脱敏', () => {
    expect(formatMobile('133****1234')).toBe('133 **** 1234');
    expect(formatMobile('133****1234', { char: '-' })).toBe('133-****-1234');
    expect(formatMobile('123akjhf45678900')).toBe('123 akjh f456');
    expect(formatMobile('123akjhf45678900', { char: '-' })).toBe('123-akjh-f456');
  });
});
