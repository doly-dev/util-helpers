/**
 * 是否为科学计数法数字
 * 
 * @private
 * @param {String} num 检查值
 * @returns {Boolean}
 */
function isScientificNumber(num) {
  return /\d+\.?\d*e[\+\-]*\d+/i.test(num);
}

/**
 * 转换为科学计数法
 * 
 * @private
 * @param {String|Number} num 数字
 * @returns {String} 科学计数法数字
 */
function toExponential(num) {
  return Number(num).toExponential();
}

/**
 * 去掉左边数字0
 * 
 * @private
 * @param {String} num 数字字符串
 * @returns {String}
 */
function trimLeftZero(num) {
  const reg = /^([+-])?(0+)([1-9\.]+)$/;
  const result = reg.exec(num);

  let sign;

  if (result) {
    sign = result[1] || '';
    return sign + result[3];
  }

  return num;
}

/**
 * @private
 * @alias module:processor.scientificToNumber
 * @description <p>科学计数法转换成普通数字</p><p>JavaScript在以下情景会自动将数值转换为科学计数法：</p><ol><li>小数点前的数字个数大于等于22位</li><li>小数点前边是0，小数点后十分位（包含十分位）之后连续零的个数大于等于6个</li></ol>
 * @param {String} num 科学计数法数字
 * @returns {String} 转换后的数字字符串
 */
function scientificToNumber(num) {
  if (isScientificNumber(num)) {
    const zero = '0';
    const parts = String(num).toLowerCase().split('e');
    const e = parts.pop(); // 存储指数
    const l = Math.abs(e); // 取绝对值，l-1就是0的个数
    const sign = e / l; //判断正负
    const coeff_array = parts[0].split('.');   // 将系数按照小数点拆分

    //如果是小数
    if (sign === -1) {
      //拼接字符串，如果是小数，拼接0和小数点
      num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    } else {
      const dec = coeff_array[1];

      //如果是整数，将整数除第一位之外的非零数字计入位数，相应的减少0的个数
      if (l - dec.length < 0) {
        num = trimLeftZero(coeff_array[0] + dec.substr(0, l)) + '.' + dec.substr(l);
      } else {
        //拼接字符串，如果是整数，不需要拼接小数点
        num = coeff_array.join('') + new Array(l - dec.length + 1).join(zero);
      }
    }
  }
  return num;
}

export default scientificToNumber;