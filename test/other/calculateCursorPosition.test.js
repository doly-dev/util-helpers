import { calculateCursorPosition } from '../../src';

describe('calculateCursorPosition', () => {
  it('should be defined', () => {
    expect(calculateCursorPosition).toBeDefined();
  });

  it('type mobile', () => {
    // input
    expect(calculateCursorPosition('', '1', 1)).toBe(1);
    expect(calculateCursorPosition('1', '13', 2)).toBe(2);
    expect(calculateCursorPosition('13', '133', 3)).toBe(3);
    expect(calculateCursorPosition('133', '1333', 4)).toBe(5);
    expect(calculateCursorPosition('133 3', '133 33', 6)).toBe(6);
    expect(calculateCursorPosition('133 33', '133 333', 7)).toBe(7);
    expect(calculateCursorPosition('133 333', '133 3333', 8)).toBe(8);
    expect(calculateCursorPosition('133 3333', '133 3333 3', 9)).toBe(10);
    expect(calculateCursorPosition('133 3333 3', '133 3333 33', 11)).toBe(11);
    expect(calculateCursorPosition('133 3333 33', '133 3333 333', 12)).toBe(12);
    expect(calculateCursorPosition('133 3333 333', '133 3333 3333', 13)).toBe(13);

    // delete
    expect(calculateCursorPosition('133 3333 3333', '133 3333 333', 12)).toBe(12);
    expect(calculateCursorPosition('133 3333 333', '133 3333 33', 11)).toBe(11);
    expect(calculateCursorPosition('133 3333 33', '133 3333 3', 10)).toBe(10);
    expect(calculateCursorPosition('133 3333 3', '133 3333 ', 9)).toBe(8);
    expect(calculateCursorPosition('133 3333', '133 333', 7)).toBe(7);
    expect(calculateCursorPosition('133 333', '133 33', 6)).toBe(6);
    expect(calculateCursorPosition('133 33', '133 3', 5)).toBe(5);
    expect(calculateCursorPosition('133 3', '133 ', 4)).toBe(3);
    expect(calculateCursorPosition('133', '13', 2)).toBe(2);
    expect(calculateCursorPosition('13', '1', 1)).toBe(1);
    expect(calculateCursorPosition('1', '', 0)).toBe(0);

    // input define char
    expect(calculateCursorPosition('', '1', 1, { char: '-' })).toBe(1);
    expect(calculateCursorPosition('1', '13', 2, { char: '-' })).toBe(2);
    expect(calculateCursorPosition('13', '133', 3, { char: '-' })).toBe(3);
    expect(calculateCursorPosition('133', '1333', 4, { char: '-' })).toBe(5);
    expect(calculateCursorPosition('133-3', '133-33', 6, { char: '-' })).toBe(6);
    expect(calculateCursorPosition('133-33', '133-333', 7, { char: '-' })).toBe(7);
    expect(calculateCursorPosition('133-333', '133-3333', 8, { char: '-' })).toBe(8);
    expect(calculateCursorPosition('133-3333', '133-3333-3', 9, { char: '-' })).toBe(10);
    expect(calculateCursorPosition('133-3333-3', '133-3333-33', 11, { char: '-' })).toBe(11);
    expect(calculateCursorPosition('133-3333-33', '133-3333-333', 12, { char: '-' })).toBe(12);
    expect(calculateCursorPosition('133-3333-333', '133-3333-3333', 13, { char: '-' })).toBe(13);

    // delete define char
    expect(calculateCursorPosition('133-3333-3333', '133-3333-333', 12, { char: '-' })).toBe(12);
    expect(calculateCursorPosition('133-3333-333', '133-3333-33', 11, { char: '-' })).toBe(11);
    expect(calculateCursorPosition('133-3333-33', '133-3333-3', 10, { char: '-' })).toBe(10);
    expect(calculateCursorPosition('133-3333-3', '133-3333-', 9, { char: '-' })).toBe(8);
    expect(calculateCursorPosition('133-3333', '133-333', 7, { char: '-' })).toBe(7);
    expect(calculateCursorPosition('133-333', '133-33', 6, { char: '-' })).toBe(6);
    expect(calculateCursorPosition('133-33', '133-3', 5, { char: '-' })).toBe(5);
    expect(calculateCursorPosition('133-3', '133-', 4, { char: '-' })).toBe(3);
    expect(calculateCursorPosition('133', '13', 2, { char: '-' })).toBe(2);
    expect(calculateCursorPosition('13', '1', 1, { char: '-' })).toBe(1);
    expect(calculateCursorPosition('1', '', 0, { char: '-' })).toBe(0);

    // copy paste
    expect(calculateCursorPosition('13', '1773', 3)).toBe(3);
    expect(calculateCursorPosition('13', '17773', 4)).toBe(5);
    expect(calculateCursorPosition('133', '1777773', 7)).toBe(8);
    expect(calculateCursorPosition('133', '17777773', 8)).toBe(10);
    expect(calculateCursorPosition('133 3333 3333', '1777777733 3333 3333', 8)).toBe(10);

    // 选择范围再粘贴
    expect(calculateCursorPosition('133', '17777', 5)).toBe(6);
    expect(calculateCursorPosition('133 3', '17777 3', 5)).toBe(6);
    expect(calculateCursorPosition('133 3', '17777 3', 5)).toBe(6);
    expect(calculateCursorPosition('133 3333', '17777777 3333', 8)).toBe(10);
    expect(calculateCursorPosition('133 3333', '133 377773', 9)).toBe(10);
    // expect(calculateCursorPosition('133 3333 3333', '17777777333 3333', 8)).toBe(9); // 如果选择范围含有间隔字符再粘贴，会产生错位

    // special
    expect(calculateCursorPosition('', '1', 0)).toBe(0);
    expect(calculateCursorPosition('133 3333 3333', '33 3333 333', 0)).toBe(0); // 删除第一个字符
    expect(calculateCursorPosition('133 3333 3333', '133 3333 3333', 3)).toBe(3); // 第一个间隔符位置按删除键
  });

  // it('type bankCard', () => {
  //   // input
  //   expect(calculateCursorPosition('', '1', 1, { type: 'bankCard' })).toBe(1);
  //   expect(calculateCursorPosition('1', '13', 2, { type: 'bankCard' })).toBe(2);
  //   expect(calculateCursorPosition('13', '133', 3, { type: 'bankCard' })).toBe(3);
  //   expect(calculateCursorPosition('133', '1333', 4, { type: 'bankCard' })).toBe(5);
  //   expect(calculateCursorPosition('133 3', '133 33', 6, { type: 'bankCard' })).toBe(6);
  //   expect(calculateCursorPosition('133 33', '133 333', 7, { type: 'bankCard' })).toBe(7);
  //   expect(calculateCursorPosition('133 333', '133 3333', 8, { type: 'bankCard' })).toBe(8);
  //   expect(calculateCursorPosition('133 3333', '133 3333 3', 9, { type: 'bankCard' })).toBe(10);
  //   expect(calculateCursorPosition('133 3333 3', '133 3333 33', 11, { type: 'bankCard' })).toBe(11);
  //   expect(calculateCursorPosition('133 3333 33', '133 3333 333', 12, { type: 'bankCard' })).toBe(12);
  //   expect(calculateCursorPosition('133 3333 333', '133 3333 3333', 13, { type: 'bankCard' })).toBe(13);

  //   // delete
  //   expect(calculateCursorPosition('133 3333 3333', '133 3333 333', 12, { type: 'bankCard' })).toBe(12);
  //   expect(calculateCursorPosition('133 3333 333', '133 3333 33', 11, { type: 'bankCard' })).toBe(11);
  //   expect(calculateCursorPosition('133 3333 33', '133 3333 3', 10, { type: 'bankCard' })).toBe(10);
  //   expect(calculateCursorPosition('133 3333 3', '133 3333 ', 9, { type: 'bankCard' })).toBe(8);
  //   expect(calculateCursorPosition('133 3333', '133 333', 7, { type: 'bankCard' })).toBe(7);
  //   expect(calculateCursorPosition('133 333', '133 33', 6, { type: 'bankCard' })).toBe(6);
  //   expect(calculateCursorPosition('133 33', '133 3', 5, { type: 'bankCard' })).toBe(5);
  //   expect(calculateCursorPosition('133 3', '133 ', 4, { type: 'bankCard' })).toBe(3);
  //   expect(calculateCursorPosition('133', '13', 2, { type: 'bankCard' })).toBe(2);
  //   expect(calculateCursorPosition('13', '1', 1, { type: 'bankCard' })).toBe(1);
  //   expect(calculateCursorPosition('1', '', 0, { type: 'bankCard' })).toBe(0);

  //   // copy paste
  //   expect(calculateCursorPosition('13', '1773', 3, { type: 'bankCard' })).toBe(3);
  //   expect(calculateCursorPosition('13', '17773', 4, { type: 'bankCard' })).toBe(5);
  //   expect(calculateCursorPosition('133', '1777773', 7, { type: 'bankCard' })).toBe(8);
  //   expect(calculateCursorPosition('133', '17777773', 8, { type: 'bankCard' })).toBe(10);
  //   expect(calculateCursorPosition('133 3333 3333', '1777777733 3333 3333', 8, { type: 'bankCard' })).toBe(10);

  //   // 选择范围再粘贴
  //   expect(calculateCursorPosition('133', '17777', 5, { type: 'bankCard' })).toBe(6);
  //   expect(calculateCursorPosition('133 3', '17777 3', 5, { type: 'bankCard' })).toBe(6);
  //   expect(calculateCursorPosition('133 3', '17777 3', 5, { type: 'bankCard' })).toBe(6);
  //   expect(calculateCursorPosition('133 3333', '17777777 3333', 8, { type: 'bankCard' })).toBe(10);
  //   expect(calculateCursorPosition('133 3333', '133 377773', 9, { type: 'bankCard' })).toBe(10);
  //   // expect(calculateCursorPosition('133 3333 3333', '17777777333 3333', 8, { type: 'bankCard' })).toBe(9); // 如果选择范围含有间隔字符再粘贴，会产生错位

  //   // special
  //   expect(calculateCursorPosition('', '1', 0, { type: 'bankCard' })).toBe(0);
  //   expect(calculateCursorPosition('133 3333 3333', '33 3333 333', 0, { type: 'bankCard' })).toBe(0); // 删除第一个字符
  //   expect(calculateCursorPosition('133 3333 3333', '133 3333 3333', 3, { type: 'bankCard' })).toBe(3); // 第一个间隔符位置按删除键
  // });
});
