import { toString } from 'ut2';

type CalculateCursorPositionOptions = {
  placeholderChar?: string | string[];
  maskReg?: RegExp;
  type?: 'mobile' | 'bankCard';
};

/**
 * 计算输入框的值格式化后光标位置
 *
 * @static
 * @alias module:Other.calculateCursorPosition
 * @since 4.6.0
 * @see {@link https://2950v9.csb.app/ | h5示例}
 * @see {@link https://33ccy9.csb.app/ | react示例}
 * @param {number} prevPos 赋值前的光标位置，onChange/onInput的光标位置 e.target.selectionEnd
 * @param {string} prevCtrlValue 上一个格式化后的值
 * @param {string} rawValue 当前输入原值
 * @param {string} ctrlValue 当前格式化后的值
 * @param {Object} [options] 配置项
 * @param {string|string[]} [options.placeholderChar=' '] 占位符
 * @param {RegExp} [options.maskReg=/\D/g] 需要遮盖的字符规则。默认去掉非数字，意味着 ctrlValue 需要去掉非数字。
 * @param {'mobile'|'bankCard'} [options.type] 格式化类型，内置手机号码和银行卡号特殊处理
 * @returns {number} 格式化后的光标位置
 */
function calculateCursorPosition(prevPos: number, prevCtrlValue: string, rawValue: string, ctrlValue: string, options: CalculateCursorPositionOptions = {}) {
  const { placeholderChar = ' ', maskReg = /\D/g, type } = options;

  const realCtrlValue = toString(prevCtrlValue);
  const realRawValue = toString(rawValue);
  const placeholderChars = Array.isArray(placeholderChar) ? placeholderChar : [placeholderChar];

  const editLength = realRawValue.length - realCtrlValue.length;
  const isAddition = editLength > 0;

  let pos = prevPos;

  if (isAddition) {
    const additionStr = realRawValue.substring(pos - editLength, pos);
    let ctrlCharCount = additionStr.replace(maskReg, '').length;
    pos -= editLength - ctrlCharCount;

    let placeholderCharCount = 0;
    while (ctrlCharCount > 0) {
      if (placeholderChars.indexOf(ctrlValue.charAt(pos - ctrlCharCount + placeholderCharCount)) !== -1) {
        placeholderCharCount++;
      } else {
        ctrlCharCount--;
      }
    }
    pos += placeholderCharCount;
  }

  if ((type === 'mobile' && (pos === 4 || pos === 9)) || (type === 'bankCard' && pos > 0 && pos % 5 === 0)) {
    pos -= 1;
  }

  return pos;
}

export default calculateCursorPosition;
