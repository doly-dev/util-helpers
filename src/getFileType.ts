import { forEach, isBlob } from 'ut2';
import checkFileType from './checkFileType';
import { isUploadFile, UploadFile } from './utils/file.util';

// 内置文件类型和文件类型说明符
const config = {
  image: 'image/*,.jpeg,.jpg,.gif,.bmp,.png,.webp,.svg,.apng,.avif,.ico,.cur,.tif,.tiff,.jfif,.pjpeg,.pjp',
  audio: 'audio/*,.mp3,.wav,.aac,.flac',
  video: 'video/*,.mp4,.webm,.ogg,.mov',
  pdf: 'application/pdf,.pdf',
  word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx',
  excel: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.xls,.xlsx'
};

type FileType = keyof typeof config;

/**
 * @summary 获取文件类型。
 * @alias module:Browser.getFileType
 * @since 5.1.0
 * @requires Other.checkFileType
 * @param {File} file 文件对象。支持 antd `UploadFile` 对象。
 * @returns {"image" | "audio" | "video" | "pdf" | "word" | "excel" | undefined} 如果是 `image` `audio` `video` `pdf` `word` `excel` 这些类型的文件，返回对应的类型值，否则返回 `undefined`。
 * @example
 *
 * const pdf = new File([], '1.pdf', { type: 'application/pdf' });
 * const jpeg = new File([], 'xx.jpeg', { type: 'image/jpeg' });
 *
 * getFileType(pdf); // 'pdf'
 * getFileType(jpeg); // 'image'
 *
 * @description 内置文件类型和文件类型说明符
 *
 * | 类型 | 说明符 |
 * |---|---|
 * | `image` | `image/*,.jpeg,.jpg,.gif,.bmp,.png,.webp,.svg,.apng,.avif,.ico,.cur,.tif,.tiff,.jfif,.pjpeg,.pjp` |
 * | `audio` | `audio/*,.mp3,.wav,.aac,.flac` |
 * | `video` | `video/*,.mp4,.webm,.ogg,.mov` |
 * | `pdf` | `application/pdf,.pdf` |
 * | `word` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document,.doc,.docx` |
 * | `excel` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.xls,.xlsx` |
 *
 */
function getFileType(file: File | UploadFile) {
  let type: undefined | FileType;

  if (isBlob(file) || isUploadFile(file)) {
    forEach(config, (accept, fileType) => {
      if (checkFileType(file, accept)) {
        type = fileType;
        return false;
      }
    });
  }
  return type;
}

export default getFileType;
