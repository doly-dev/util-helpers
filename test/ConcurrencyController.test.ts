import { ConcurrencyController } from '../src';

describe('ConcurrencyController', () => {
  it('should initialize with default max concurrency of 2', () => {
    const controller = new ConcurrencyController();
    const status = controller.getStatus();

    expect(status.maxConcurrency).toBe(2);
    expect(status.running).toBe(0);
    expect(status.waiting).toBe(0);
  });

  it('should initialize with custom max concurrency', () => {
    const controller = new ConcurrencyController(3);
    const status = controller.getStatus();

    expect(status.maxConcurrency).toBe(3);
    expect(status.running).toBe(0);
    expect(status.waiting).toBe(0);
  });

  it('should enforce minimum max concurrency of 1', () => {
    const controller = new ConcurrencyController(0);
    const status = controller.getStatus();

    expect(status.maxConcurrency).toBe(1);

    // 测试负数的情况
    const controller2 = new ConcurrencyController(-5);
    const status2 = controller2.getStatus();
    expect(status2.maxConcurrency).toBe(1);
  });

  it('should execute tasks sequentially when max concurrency is 1', async () => {
    const controller = new ConcurrencyController(1);
    const executionOrder: number[] = [];

    // 创建一些异步任务，它们会记录执行顺序
    const task1 = () =>
      new Promise<number>((resolve) => {
        setTimeout(() => {
          executionOrder.push(1);
          resolve(1);
        }, 10);
      });

    const task2 = () =>
      new Promise<number>((resolve) => {
        setTimeout(() => {
          executionOrder.push(2);
          resolve(2);
        }, 5);
      });

    const task3 = () =>
      new Promise<number>((resolve) => {
        setTimeout(() => {
          executionOrder.push(3);
          resolve(3);
        }, 1);
      });

    // 添加任务到控制器
    const promise1 = controller.add(task1);
    const promise2 = controller.add(task2);
    const promise3 = controller.add(task3);

    // 等待所有任务完成
    const results = await Promise.all([promise1, promise2, promise3]);

    // 验证结果
    expect(results).toEqual([1, 2, 3]);
    // 验证执行顺序（由于并发为1，应该按添加顺序执行）
    expect(executionOrder).toEqual([1, 2, 3]);
  });

  it('should execute tasks concurrently respecting the max concurrency limit', async () => {
    const controller = new ConcurrencyController(2); // 最大并发数为2
    const startTime = Date.now();
    const completedTimes: number[] = [];
    let maxConcurrency = 0;

    // 创建5个异步任务，每个任务会在特定时间后完成
    const createTask = (id: number) => () =>
      new Promise<number>((resolve) => {
        maxConcurrency = Math.max(maxConcurrency, controller.getStatus().running);
        setTimeout(() => {
          completedTimes.push(Date.now());
          resolve(id);
        }, 20); // 每个任务耗时20ms
      });

    // 添加5个任务
    const promises = Array.from({ length: 5 }, (_, i) => controller.add(createTask(i + 1)));

    // 等待所有任务完成
    const results = await Promise.all(promises);

    // 验证结果
    expect(results).toEqual([1, 2, 3, 4, 5]);
    // 验证最大并发数
    expect(maxConcurrency).toBe(2);

    // 由于最大并发数是2，前两个任务应该几乎同时开始，
    // 所以完成时间应该相近，整个过程大约需要 5/2 * 20ms = 50ms 左右
    const totalTime = Date.now() - startTime;
    expect(totalTime).toBeLessThan(100); // 应该在100ms内完成

    Promise.resolve().then(() => {
      // 验证在任何时候运行的任务数不超过最大并发数
      // 通过检查控制器状态来验证
      expect(controller.getStatus().running).toBe(0); // 所有任务已完成
    });
  });

  it('should correctly report status', async () => {
    const controller = new ConcurrencyController(2);

    // 初始状态
    let status = controller.getStatus();
    expect(status.running).toBe(0);
    expect(status.waiting).toBe(0);
    expect(status.maxConcurrency).toBe(2);

    // 添加一些任务但不等待它们完成
    const slowTask = () =>
      new Promise<number>((resolve) => {
        setTimeout(() => resolve(1), 50);
      });

    // 添加3个任务，其中2个会立即开始运行，1个在等待队列中
    const promise1 = controller.add(slowTask);
    const promise2 = controller.add(slowTask);
    const promise3 = controller.add(slowTask);

    // 短暂延迟，让任务开始执行
    await new Promise((resolve) => setTimeout(resolve, 10));

    // 检查状态：2个正在运行，1个在等待
    status = controller.getStatus();
    expect(status.running).toBe(2);
    expect(status.waiting).toBe(1);
    expect(status.maxConcurrency).toBe(2);

    // 等待所有任务完成
    await Promise.all([promise1, promise2, promise3]);

    // finally 在 Promise.all 之后执行，这里是为了确保状态更新完成
    Promise.resolve().then(() => {
      // 检查最终状态：0个正在运行，0个在等待
      status = controller.getStatus();
      expect(status.running).toBe(0);
      expect(status.waiting).toBe(0);
    });
  });

  it('should handle task failures properly', async () => {
    const controller = new ConcurrencyController(2);

    const successfulTask = () => Promise.resolve('success');
    const failingTask = () => Promise.reject(new Error('Task failed'));

    // 添加成功和失败的任务
    const successPromise = controller.add(successfulTask);
    const failurePromise = controller.add(failingTask);

    // 确保错误被正确处理
    await expect(successPromise).resolves.toBe('success');
    await expect(failurePromise).rejects.toThrow('Task failed');

    // 确保控制器仍然正常工作
    const anotherSuccessPromise = controller.add(successfulTask);
    await expect(anotherSuccessPromise).resolves.toBe('success');
  });

  it('should pause and resume task execution', async () => {
    const controller = new ConcurrencyController(2);
    const results: number[] = [];

    const createTask = (id: number) => () =>
      new Promise<number>((resolve) => {
        setTimeout(() => {
          results.push(id);
          resolve(id);
        }, 10);
      });

    // 添加几个任务
    const promise1 = controller.add(createTask(1));
    const promise2 = controller.add(createTask(2));
    const promise3 = controller.add(createTask(3));
    const promise4 = controller.add(createTask(4));

    expect(results.length).toBe(0);

    // 暂停控制器
    controller.pause();

    // 稍等一下让前两个任务开始执行
    await new Promise((resolve) => setTimeout(resolve, 15));

    expect(results.length).toBe(2);

    await new Promise((resolve) => setTimeout(resolve, 100));

    // 检查暂停期间是否有新任务执行
    expect(results.length).toBe(2);

    // 恢复控制器
    controller.resume();

    // 等待所有任务完成
    await Promise.all([promise1, promise2, promise3, promise4]);

    // 验证所有任务都已完成
    expect(results).toEqual([1, 2, 3, 4]);
  });

  it('should update max concurrency and adjust execution accordingly', async () => {
    const controller = new ConcurrencyController(1); // 初始并发数为1

    const executionLog: string[] = [];

    const createTask = (id: number) => () =>
      new Promise<number>((resolve) => {
        executionLog.push(`start-${id}`);
        setTimeout(() => {
          executionLog.push(`end-${id}`);
          resolve(id);
        }, 20);
      });

    // 添加多个任务
    Array.from({ length: 4 }, (_, i) => controller.add(createTask(i + 1)));

    // 等待一小段时间观察执行情况
    await new Promise((resolve) => setTimeout(resolve, 25));

    // 此时由于并发数限制为1，应该只有1个任务完成
    const completedBeforeUpdate = executionLog.filter((item) => item.startsWith('end-')).length;
    expect(completedBeforeUpdate).toBe(1);

    // 更新最大并发数为3
    controller.setMaxConcurrency(3);

    // 等待剩余任务完成
    await new Promise((resolve) => setTimeout(resolve, 25));

    // 验证所有任务都已完成
    const completedAfterUpdate = executionLog.filter((item) => item.startsWith('end-')).length;
    expect(completedAfterUpdate).toBe(4);
  });

  it('should handle rapid task addition', async () => {
    const controller = new ConcurrencyController(5);
    const results: number[] = [];

    // 快速添加大量任务
    const promises = Array.from({ length: 20 }, (_, i) =>
      controller.add(async () => {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 10));
        results.push(i);
        return i;
      })
    );

    const resolvedValues = await Promise.all(promises);

    // 验证所有任务都已完成
    expect(resolvedValues.length).toBe(20);
    expect(resolvedValues).toEqual(Array.from({ length: 20 }, (_, i) => i));
  });

  it('should maintain correct running count when tasks finish', async () => {
    const controller = new ConcurrencyController(3);

    // 监控运行计数的变化
    const runningCounts: number[] = [];

    // 创建一个任务，在执行时记录运行计数
    const createMonitoringTask = (id: number) => () =>
      // eslint-disable-next-line no-async-promise-executor
      new Promise<number>(async (resolve) => {
        // 记录当前运行的任务数
        runningCounts.push(controller.getStatus().running);
        await new Promise((resolve) => setTimeout(resolve, 10));
        resolve(id);
      });

    // 添加几个任务
    const promises = [controller.add(createMonitoringTask(1)), controller.add(createMonitoringTask(2)), controller.add(createMonitoringTask(3)), controller.add(createMonitoringTask(4))];

    await Promise.all(promises);

    // 至少有一次运行计数达到最大并发数
    expect(Math.max(...runningCounts)).toBe(3);
  });
});
