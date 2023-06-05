import { calculateCursorPosition } from '../src';

describe('calculateCursorPosition', () => {
  it('input & delete', () => {
    // input mobile
    expect(calculateCursorPosition(1, '', '1', '1')).toBe(1);
    expect(calculateCursorPosition(2, '1', '13', '13')).toBe(2);
    expect(calculateCursorPosition(3, '13', '133', '133')).toBe(3);
    expect(calculateCursorPosition(4, '133', '1333', '133 3')).toBe(5);
    expect(calculateCursorPosition(6, '133 3', '133 33', '133 33')).toBe(6);
    expect(calculateCursorPosition(7, '133 33', '133 333', '133 333')).toBe(7);
    expect(calculateCursorPosition(8, '133 333', '133 3333', '133 3333')).toBe(8);
    expect(calculateCursorPosition(9, '133 3333', '133 33333', '133 3333 3')).toBe(10);
    expect(calculateCursorPosition(11, '133 3333 3', '133 3333 33', '133 3333 33')).toBe(11);
    expect(calculateCursorPosition(12, '133 3333 33', '133 3333 333', '133 3333 333')).toBe(12);
    expect(calculateCursorPosition(13, '133 3333 333', '133 3333 3333', '133 3333 3333')).toBe(13);

    // delete mobile
    expect(calculateCursorPosition(12, '133 3333 3333', '133 3333 333', '133 3333 333')).toBe(12);
    expect(calculateCursorPosition(11, '133 3333 333', '133 3333 33', '133 3333 33')).toBe(11);
    expect(calculateCursorPosition(10, '133 3333 33', '133 3333 3', '133 3333 3')).toBe(10);
    expect(calculateCursorPosition(9, '133 3333 3', '133 3333 ', '133 3333')).toBe(9);
    expect(calculateCursorPosition(7, '133 3333', '133 333', '133 333')).toBe(7);
    expect(calculateCursorPosition(6, '133 333', '133 33', '133 33')).toBe(6);
    expect(calculateCursorPosition(5, '133 33', '133 3', '133 3')).toBe(5);
    expect(calculateCursorPosition(4, '133 3', '133 ', '133')).toBe(4);
    expect(calculateCursorPosition(2, '133', '13', '13')).toBe(2);
    expect(calculateCursorPosition(1, '13', '1', '1')).toBe(1);
    expect(calculateCursorPosition(0, '1', '', '')).toBe(0);

    // input bankCard
    expect(calculateCursorPosition(1, '', '6', '6')).toBe(1);
    expect(calculateCursorPosition(4, '624', '6246', '6246')).toBe(4);
    expect(calculateCursorPosition(5, '6246', '62467', '6246 7')).toBe(6);
    expect(calculateCursorPosition(10, '6246 7648', '6246 76485', '6246 7648 5')).toBe(11);
    expect(calculateCursorPosition(15, '6246 7648 5566', '6246 7648 55667', '6246 7648 5566 7')).toBe(16);

    // delete bankCard
    expect(calculateCursorPosition(0, '6', '', '')).toBe(0);
    expect(calculateCursorPosition(3, '6246', '624', '624')).toBe(3);
    expect(calculateCursorPosition(5, '6246 7', '6246 ', '6246')).toBe(5);
    expect(calculateCursorPosition(10, '6246 7648 5', '6246 7648 ', '6246 7648')).toBe(10);
    expect(calculateCursorPosition(15, '6246 7648 5566 7', '6246 7648 5566 ', '6246 7648 5566')).toBe(15);
  });

  it('placeholderChar', () => {
    // input define placeholderChar
    expect(calculateCursorPosition(1, '', '1', '1', { placeholderChar: ['-'] })).toBe(1);
    expect(calculateCursorPosition(2, '1', '13', '13', { placeholderChar: ['-'] })).toBe(2);
    expect(calculateCursorPosition(3, '13', '133', '133', { placeholderChar: ['-'] })).toBe(3);
    expect(calculateCursorPosition(4, '133', '1333', '133-3', { placeholderChar: ['-'] })).toBe(5);
    expect(calculateCursorPosition(6, '133-3', '133-33', '133-33', { placeholderChar: ['-'] })).toBe(6);
    expect(calculateCursorPosition(7, '133-33', '133-333', '133-333', { placeholderChar: ['-'] })).toBe(7);
    expect(calculateCursorPosition(8, '133-333', '133-3333', '133-3333', { placeholderChar: ['-'] })).toBe(8);
    expect(calculateCursorPosition(9, '133-3333', '133-33333', '133-3333-3', { placeholderChar: ['-'] })).toBe(10);
    expect(calculateCursorPosition(11, '133-3333-3', '133-3333-33', '133-3333-33', { placeholderChar: ['-'] })).toBe(11);
    expect(calculateCursorPosition(12, '133-3333-33', '133-3333-333', '133-3333-333', { placeholderChar: ['-'] })).toBe(12);
    expect(calculateCursorPosition(13, '133-3333-333', '133-3333-3333', '133-3333-3333', { placeholderChar: ['-'] })).toBe(13);

    // delete define placeholderChar
    expect(calculateCursorPosition(12, '133-3333-3333', '133-3333-333', '133-3333-333', { placeholderChar: ['-'] })).toBe(12);
    expect(calculateCursorPosition(11, '133-3333-333', '133-3333-33', '133-3333-33', { placeholderChar: ['-'] })).toBe(11);
    expect(calculateCursorPosition(10, '133-3333-33', '133-3333-3', '133-3333-3', { placeholderChar: ['-'] })).toBe(10);
    expect(calculateCursorPosition(9, '133-3333-3', '133-3333-', '133-3333', { placeholderChar: ['-'] })).toBe(9);
    expect(calculateCursorPosition(7, '133-3333', '133-333', '133-333', { placeholderChar: ['-'] })).toBe(7);
    expect(calculateCursorPosition(6, '133-333', '133-33', '133-33', { placeholderChar: ['-'] })).toBe(6);
    expect(calculateCursorPosition(5, '133-33', '133-3', '133-3', { placeholderChar: ['-'] })).toBe(5);
    expect(calculateCursorPosition(4, '133-3', '133-', '133', { placeholderChar: ['-'] })).toBe(4);
    expect(calculateCursorPosition(2, '133', '13', '13', { placeholderChar: ['-'] })).toBe(2);
    expect(calculateCursorPosition(1, '13', '1', '1', { placeholderChar: ['-'] })).toBe(1);
    expect(calculateCursorPosition(0, '1', '', '', { placeholderChar: ['-'] })).toBe(0);
  });

  it('copy paste', () => {
    expect(calculateCursorPosition(3, '13', '1773', '177 3')).toBe(3);
    expect(calculateCursorPosition(3, '133', '1773', '177 3')).toBe(3);
    expect(calculateCursorPosition(4, '13', '17773', '177 73')).toBe(5);
    expect(calculateCursorPosition(7, '133', '1777773', '177 7773')).toBe(8);
    expect(calculateCursorPosition(8, '133', '17777773', '177 7777 3')).toBe(10);
    expect(calculateCursorPosition(8, '133 3333 3333', '1777777733 3333 3333', '177 7777 7333')).toBe(10);
  });

  // 选择范围再粘贴
  it('range paste', () => {
    expect(calculateCursorPosition(5, '133', '17777', '177 77')).toBe(6);
    expect(calculateCursorPosition(5, '133 3', '17777 3', '177 773')).toBe(6);
    expect(calculateCursorPosition(8, '133 3333', '17777777 3333', '177 7777 7333')).toBe(10);
    expect(calculateCursorPosition(9, '133 3333', '133 377773', '133 3777 73')).toBe(10);

    // expect(calculateCursorPosition(8, '133 3333 3333', '17777777333 3333', '177 7777 7333')).toBe(9); // 如果选择范围含有间隔字符再粘贴，会产生错位
  });

  it('special', () => {
    expect(calculateCursorPosition(1, '', '1', '1')).toBe(1);
    expect(calculateCursorPosition(0, '133 3333 3333', '33 3333 333', '333 3333 33')).toBe(0); // 删除第一个字符
    expect(calculateCursorPosition(3, '133 3333 3333', '1333333 3333', '133 3333 3333')).toBe(3); // 第一个间隔符位置按删除键
  });

  it('type mobile', () => {
    // input
    expect(calculateCursorPosition(4, '133', '1333', '133 3', { type: 'mobile' })).toBe(5);
    expect(calculateCursorPosition(9, '133 3333', '133 33333', '133 3333 3', { type: 'mobile' })).toBe(10);

    // delete
    expect(calculateCursorPosition(9, '133 3333 3', '133 3333 ', '133 3333', { type: 'mobile' })).toBe(8);
    expect(calculateCursorPosition(4, '133 3', '133 ', '133', { type: 'mobile' })).toBe(3);

    // input define placeholderChar
    expect(calculateCursorPosition(4, '133', '1333', '133-3', { placeholderChar: ['-'], type: 'mobile' })).toBe(5);
    expect(calculateCursorPosition(9, '133-3333', '133-33333', '133-3333-3', { placeholderChar: ['-'], type: 'mobile' })).toBe(10);

    // delete define placeholderChar
    expect(calculateCursorPosition(9, '133-3333-3', '133-3333-', '133-3333', { placeholderChar: ['-'], type: 'mobile' })).toBe(8);
    expect(calculateCursorPosition(4, '133-3', '133-', '133', { placeholderChar: ['-'], type: 'mobile' })).toBe(3);
  });

  it('type bankCard', () => {
    // input bankCard
    expect(calculateCursorPosition(1, '', '6', '6', { type: 'bankCard' })).toBe(1);
    expect(calculateCursorPosition(4, '624', '6246', '6246', { type: 'bankCard' })).toBe(4);
    expect(calculateCursorPosition(5, '6246', '62467', '6246 7', { type: 'bankCard' })).toBe(6);
    expect(calculateCursorPosition(10, '6246 7648', '6246 76485', '6246 7648 5', { type: 'bankCard' })).toBe(11);
    expect(calculateCursorPosition(15, '6246 7648 5566', '6246 7648 55667', '6246 7648 5566 7')).toBe(16);

    // delete bankCard
    expect(calculateCursorPosition(0, '6', '', '', { type: 'bankCard' })).toBe(0);
    expect(calculateCursorPosition(3, '6246', '624', '624', { type: 'bankCard' })).toBe(3);
    expect(calculateCursorPosition(5, '6246 7', '6246 ', '6246', { type: 'bankCard' })).toBe(4);
    expect(calculateCursorPosition(10, '6246 7648 5', '6246 7648 ', '6246 7648', { type: 'bankCard' })).toBe(9);
    expect(calculateCursorPosition(15, '6246 7648 5566 7', '6246 7648 5566 ', '6246 7648 5566', { type: 'bankCard' })).toBe(14);
  });
});
