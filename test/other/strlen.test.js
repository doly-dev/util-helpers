import { strlen } from '../../src';

describe('strlen', () => {
  it('should be defined', () => {
    expect(strlen).toBeDefined();
  });

  it('incorrect params', () => {
    expect(strlen(null)).toBe(0);
    expect(strlen()).toBe(0);
    expect(strlen(false)).toBe(5);
    expect(strlen(true)).toBe(4);
    expect(strlen(123)).toBe(3);

    // jest 会转为 function () {} 结果为 14
    // expect(strlen(() => { })).toBe(9);
  });

  it('correct', () => {
    expect(strlen('1234567890')).toBe(10);
    expect(strlen('abcdefghijklmnopqrstuvwxzy')).toBe(26);
    expect(strlen('你好a')).toBe(5);
    expect(strlen('你好，世界！')).toBe(12);
    expect(strlen('严両丞丽')).toBe(8);
    expect(strlen('｠')).toBe(1); // String.fromCodePoint(0xff60)
    expect(strlen('｡')).toBe(1); // String.fromCodePoint(0xff61)

    // 特殊
    expect(strlen('𠮷')).toBe(4);

    // emoji
    expect(strlen('😀')).toBe(4);
    expect(strlen('🍎')).toBe(4);
  });
});
