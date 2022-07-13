import { config } from './config';

/**
 * 打印警告信息
 *
 * @param  {any[]} args 打印的信息
 */
function devWarn(...args) {
  if (!config.disableWarning) {
    console.warn(...args);
  }
}

export default devWarn;
