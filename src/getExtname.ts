import { isString, nth } from 'ut2';

/**
 * 获取路径的扩展名。
 *
 * @alias module:Other.getExtname
 * @since 5.4.0
 * @see {@link https://nodejs.org/docs/latest/api/path.html#pathextnamepath | Node.js path.extname}
 * @param {string} path 路径。
 * @returns 返回从最后一次出现 `.` 字符到路径最后一部分的字符串结尾。如果路径没有 `.` 或者除了第一个字符之外没有其他 `.` 字符，则返回空字符串。
 * @example
 * getExtname('index.html'); // '.html'
 * getExtname('index.coffee.md'); // '.md'
 * getExtname('index.'); // '.'
 * getExtname('index'); // ''
 * getExtname('.index'); // ''
 * getExtname('index.md'); // '.md'
 */
function getExtname(path: string) {
  return isString(path) && path.indexOf('.') > 0 ? '.' + nth(path.split('.'), -1) : '';
}

export default getExtname;
