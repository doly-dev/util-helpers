import { config } from './config';

/**
 * 打印警告信息
 *
 * @param  {any[]} args 打印的信息
 */
function devWarn(...args: any[]) {
  if (!config.disableWarning) {
    console.warn.apply(void 0, args);
  }
}

export default devWarn;
