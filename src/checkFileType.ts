import { isFile, isString, toString } from 'ut2';
import { isUploadFile, testExt, UploadFile } from './utils/file.util';

/**
 * 检查文件是否符合 `accept` 类型说明符。
 *
 * @static
 * @alias module:Other.checkFileType
 * @since 5.1.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/file#唯一文件类型说明符 唯一文件类型说明符}
 * @see {@link https://www.iana.org/assignments/media-types/media-types.xhtml Media Types}
 * @param {File} file 文件对象。支持 antd `UploadFile` 对象。
 * @param {string} [accept] 文件类型说明符。
 * @returns {boolean} 如果 `file` 符合 `accept` 返回 `true`， 否则返回 `false`。
 */
function checkFileType(file: File | UploadFile, accept?: string) {
  if (!isFile(file) && !isUploadFile(file)) {
    return false;
  }

  if (!isString(accept)) {
    accept = toString(accept);
  }

  accept = accept.trim();

  if (!accept || accept === '*') {
    return true;
  }

  let ret = false;

  const types = accept.toLowerCase().split(/,(?:\s+)?/);
  const fileName = file.name.toLowerCase();
  const fileType = file.type || '';
  const fileUrl = (file as UploadFile).url || '';

  types.some((type) => {
    // .doc .docx .jpg .png
    if (type === '*' || fileType === type || (type.indexOf('.') === 0 && (testExt(fileName, type) || testExt(fileUrl, type)))) {
      ret = true;
    } else if (type.includes('/*') && fileType.includes('/')) {
      // image/* 匹配所有图片类型
      const match = type.match(/(.*)\/\*/);
      const fileParentType = fileType.split('/')[0];
      if (match && match[1] === fileParentType) {
        ret = true;
      }
    }
    return ret;
  });

  return ret;
}

export default checkFileType;
