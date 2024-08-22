import { randomInt, toNumber } from 'ut2';

const letter = 'abcdefghijklmnopqrstuvwxyz';
const chars = {
  number: '0123456789',
  lower: letter,
  upper: letter.toUpperCase()
};
const allChars = chars.number + chars.lower + chars.upper;

/**
 * @private
 * @param {number} len 长度
 * @param {string} pool 字符池
 * @param {string} [prefix=''] 前缀部分，不计入长度
 * @returns {string}
 */
function internalRandomString(len: number, pool: string, prefix = ''): string {
  while (len-- > 0) {
    const r = pool[randomInt(0, pool.length - 1)];
    return internalRandomString(len, pool, prefix + r);
  }
  return prefix;
}

interface RandomString {
  (len: number, poll: 'number' | 'lower' | 'upper'): string;
  (len: number, poll?: string): string;
}

/**
 * 生成随机字符串
 *
 * @function
 * @alias module:Other.randomString
 * @since 4.8.0
 * @param {number} [len=0] 长度，默认`0`
 * @param {'number' | 'lower' | 'upper' | string} [pool='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'] 字符池，默认为数字和大小写字母。支持设置类型`number` `lower` `upper` 或字符串。
 * @returns {string} 随机字符串
 * @example
 *
 * randomString(5); // slk23
 * randomString(8); // 71mHqo2A
 *
 * // 自定义允许的字符
 * randomString(5, 'abc'); // ccbcb
 * randomString(8, 'abcefg'); // bcgcfabg
 *
 */
const randomString: RandomString = function (len = 0, pool?: string) {
  let _pool: string;

  if (typeof pool !== 'string') {
    _pool = allChars;
  } else if (chars[pool as keyof typeof chars]) {
    _pool = chars[pool as keyof typeof chars];
  } else {
    _pool = pool;
  }

  return internalRandomString(toNumber(len), _pool);
};

export default randomString;
