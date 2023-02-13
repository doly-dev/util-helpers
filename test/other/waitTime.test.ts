import { waitTime } from '../../src';

describe('waitTime', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('default time', () => {
    let start, end, elapsedTime;

    // 默认时间
    start = Date.now(); // 使用 performance.now() 可以得到更精确的时间
    waitTime().then(() => {
      end = Date.now();
      elapsedTime = end - start;
      expect(elapsedTime).toEqual(1000);
    });

    jest.runAllTimers();
  });

  it('custom time', () => {
    let start, end, elapsedTime;

    start = Date.now();
    waitTime(300).then(() => {
      end = Date.now();
      elapsedTime = end - start;
      expect(elapsedTime).toEqual(300);
    });
    jest.runAllTimers();
  });
});
