import normalizeString from './normalizeString';

/**
 * 计算格式化手机号码或银行卡号后的光标位置。<br/>手机号码格式为xxx xxxx xxxx ，银行卡号格式为xxxx xxxx xxxx xxx。
 *
 * @static
 * @alias module:Other.calculateCursorPosition
 * @since 4.6.0
 * @see 格式化手机号码 {@link https://doly-dev.github.io/util-helpers/module-Processor.html#.formatMobile|formatMobile}
 * @see 格式化银行卡号 {@link https://doly-dev.github.io/util-helpers/module-Processor.html#.formatBankCard|formatBankCard}
 * @param {string} prevCtrlValue 上一个格式化后的值
 * @param {string} nextRawValue 当前输入原值，注意不是格式化后的值
 * @param {number} prevPos 当前光标位置，onChange/onInput的光标位置 e.target.selectionEnd
 * @param {Object} [options] 配置项
 * @param {string} [options.char=' '] 间隔字符，占位符
 * @param {'mobile'|'bankCard'} [options.type='mobile'] 格式化类型
 * @returns {number} 格式化后的光标位置
 */
function calculateCursorPosition(prevCtrlValue, nextRawValue, prevPos, { char = ' ', type = 'mobile' } = {}) {
  const realCtrlValue = normalizeString(prevCtrlValue);
  const realNextRawValue = normalizeString(nextRawValue);

  let pos = typeof prevPos === 'number' && !isNaN(prevPos) ? prevPos : realNextRawValue.length;
  const editLength = realNextRawValue.length - realCtrlValue.length;
  const realPrevPos = pos - editLength;
  const editStr = realNextRawValue.substring(realPrevPos, prevPos);

  // 输入占位符
  if (editStr === char) {
    return pos;
  }

  if (type === 'mobile') {
    // 复制粘贴多个值
    if (editLength > 1) {
      if (realPrevPos < 9) {
        if (realPrevPos < 4 && pos >= 4) {
          pos += 1;
        }
        if (pos >= 9) {
          pos += 1;
        }
      }
    } else if (pos === 4 || pos === 9) {
      // 输入或删除占位符
      pos += editLength > 0 ? 1 : -1;
    }
  } else if (type === 'bankCard') {
    if (editLength > 1) {
      if (pos >= 5) {
        const chunks = Math.floor(pos / 5) - Math.floor(realPrevPos / 5);
        pos += chunks;

        if (pos > 0 && pos % 5 === 0) {
          pos += 1;
        }
      }
    } else if (pos % 5 === 0) {
      pos += editLength > 0 ? 1 : -1;
    }
  }

  return pos;
}

export default calculateCursorPosition;
