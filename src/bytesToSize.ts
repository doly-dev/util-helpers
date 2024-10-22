import { isNaN } from 'ut2';

type BytesToSizeOptions = {
  spaceMark?: string;
  precision?: number;
};

/**
 * 字节转换存储单位
 *
 * @alias module:Processor.bytesToSize
 * @since 3.8.0
 * @param {number} bytes 字节大小
 * @param {Object} [options] 配置项
 * @param {string} [options.spaceMark=' '] 间隔字符，默认`' '`
 * @param {number} [options.precision=2] 精度，默认`2`
 * @returns {string} 存储单位值
 * @example
 *
 * bytesToSize(0); // 0 B
 * bytesToSize(1024); // 1 KB
 * bytesToSize(3.213243*1024*1024); // 3.21 MB
 * bytesToSize(1024*1024*1024); // 1 GB
 *
 * // 自定义间隔符号
 * bytesToSize(0, { spaceMark: '' }); // 0B
 * bytesToSize(1024, { spaceMark: '' }); // 1KB
 *
 */
function bytesToSize(bytes: number, options: BytesToSizeOptions = {}) {
  const { spaceMark = ' ', precision = 2 } = options;

  const numBytes = typeof bytes !== 'number' ? Number(bytes) : bytes;
  if (numBytes === 0 || isNaN(numBytes)) return `0${spaceMark}B`;

  const k = 1024;
  // 存储单位
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(numBytes) / Math.log(k));

  return sizes[i] ? `${Number((numBytes / Math.pow(k, i)).toFixed(precision))}${spaceMark}${sizes[i]}` : numBytes + '';
}

export default bytesToSize;
