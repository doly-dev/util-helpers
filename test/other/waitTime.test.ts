import { waitTime } from '../../src';

describe('waitTime', () => {
  it('should be defined', () => {
    expect(waitTime).toBeDefined();
  });

  it('default time', async () => {
    let start, end, elapsedTime;

    // 默认时间
    start = Date.now(); // 使用 performance.now() 可以得到更精确的时间
    await waitTime();
    end = Date.now();
    elapsedTime = end - start;

    // 允许误差20ms内
    expect(elapsedTime).toBeGreaterThanOrEqual(980);
    expect(elapsedTime).toBeLessThanOrEqual(1020);
  });

  it('custom time', async () => {
    let start, end, elapsedTime;

    start = Date.now();
    await waitTime(300);
    end = Date.now();
    elapsedTime = end - start;

    expect(elapsedTime).toBeGreaterThanOrEqual(280);
    expect(elapsedTime).toBeLessThanOrEqual(320);
  });
});
