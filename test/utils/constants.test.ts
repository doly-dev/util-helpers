import { MAX_SAFE_INTEGER, MIN_SAFE_INTEGER } from '../../src/utils/constants';

describe('constants', () => {
  it('should be defined', () => {
    expect(MAX_SAFE_INTEGER).toBeDefined();
    expect(MIN_SAFE_INTEGER).toBeDefined();
  });

  it('value', () => {
    expect(MAX_SAFE_INTEGER).toBe(Number.MAX_SAFE_INTEGER);
    expect(MIN_SAFE_INTEGER).toBe(Number.MIN_SAFE_INTEGER);

    expect(MAX_SAFE_INTEGER).toBe(Math.pow(2, 53) - 1);
    expect(MIN_SAFE_INTEGER).toBe(-(Math.pow(2, 53) - 1));
  });

  it('not Number.MAX_SAFE_INTEGER', () => {
    // 低版本浏览器没有 Number.MAX_SAFE_INTEGER Number.MIN_SAFE_INTEGER
    // @ts-ignore
    const numberSpy = jest.spyOn(globalThis, 'Number').mockImplementation(() => {
      return {
        MAX_SAFE_INTEGER: undefined,
        MIN_SAFE_INTEGER: undefined
      }
    });

    // console.log(Number, globalThis.Number);

    const Constants = jest.createMockFromModule<{ MAX_SAFE_INTEGER: number; MIN_SAFE_INTEGER: number; }>('../../src/utils/constants');

    // console.log(Number.MAX_SAFE_INTEGER, Constants);

    expect(Constants.MAX_SAFE_INTEGER).toBe(9007199254740991);
    expect(Constants.MIN_SAFE_INTEGER).toBe(-9007199254740991);

    numberSpy.mockRestore();
  })
});
