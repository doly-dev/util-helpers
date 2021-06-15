import isArguments from '../../src/utils/type/isArguments'

describe('isArguments', () => {
  it('arguments => true', () => {
    expect(isArguments(function () { return arguments }())).toBe(true);
  });
  it('[1, 2, 3] => false', () => {
    expect(isArguments([1, 2, 3])).toBe(false);
  });
})