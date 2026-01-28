type AsyncFunc<T = any> = () => Promise<T>;

/**
 * 并发控制器
 *
 * @class
 * @param {number} [maxConcurrency=2] 最大并发数量。默认 `2`。
 * @example
 * // 最多同时运行 3 个异步任务
 * const controller = new ConcurrencyController(3);
 *
 * const urls = ['/api/1', '/api/2', '/api/3', '/api/4', '/api/5', '/api/6'];
 * const results = await Promise.all(urls.map(url => controller.add(() => fetch(url))));
 *
 * // 获取状态
 * controller.getStatus();
 *
 * // 暂停队列
 * controller.pause();
 *
 * // 恢复队列
 * controller.resume();
 *
 * // 设置最大并发数量，并立即运行队列中的任务。
 * controller.setMaxConcurrency(4);
 *
 */
class ConcurrencyController {
  private maxConcurrency: number;
  private runningCount: number;
  private queue: { task: AsyncFunc; resolve: (value: any) => void; reject: (reason?: any) => void }[];
  private isPaused: boolean;

  constructor(maxConcurrency = 2) {
    this.maxConcurrency = Math.max(maxConcurrency, 1);
    this.runningCount = 0;
    this.queue = [];
    this.isPaused = false;
  }

  /**
   * 加入队列
   *
   * @param {Function} task 异步任务函数。
   * @returns 任务的 Promise 对象。
   */
  add<T>(task: AsyncFunc<T>) {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._run();
    });
  }

  /**
   * 运行队列中的任务
   *
   * @private
   */
  private _run() {
    if (this.isPaused) return;
    while (this.runningCount < this.maxConcurrency && this.queue.length > 0) {
      const { task, resolve, reject } = this.queue.shift()!;
      this.runningCount++;
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }

  /**
   * 获取状态
   */
  getStatus() {
    return {
      running: this.runningCount,
      waiting: this.queue.length,
      maxConcurrency: this.maxConcurrency,
      paused: this.isPaused
    };
  }

  /**
   * 设置最大并发数量，并立即运行队列中的任务。
   *
   * @param {number} maxConcurrency 最大并发数量。不能小于 `1`。
   */
  setMaxConcurrency(maxConcurrency: number) {
    this.maxConcurrency = Math.max(maxConcurrency, 1);
    this._run();
  }

  /**
   * 暂停队列
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * 恢复队列
   */
  resume() {
    this.isPaused = false;
    this._run();
  }
}

export default ConcurrencyController;
