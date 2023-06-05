import { waitTime } from '../src';

describe('waitTime', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('default time', () => {
    // 默认时间
    const start = Date.now(); // 使用 performance.now() 可以得到更精确的时间
    waitTime().then(() => {
      const end = Date.now();
      const elapsedTime = end - start;
      expect(elapsedTime).toEqual(1000);
    });

    jest.runAllTimers();
  });

  it('custom time', () => {
    const start = Date.now();
    waitTime(300).then(() => {
      const end = Date.now();
      const elapsedTime = end - start;
      expect(elapsedTime).toEqual(300);
    });
    jest.runAllTimers();
  });
});
