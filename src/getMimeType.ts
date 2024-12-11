import getExtname from './getExtname';
import { nativeUndefined } from './utils/native';

const mimeTypes = [
  // text
  ['text/plain', ['txt']],
  ['text/css', ['css']],
  ['text/html', ['htm', 'html']],
  ['text/javascript', ['js', 'mjs']],
  ['text/csv', ['csv']],
  ['text/markdown', ['md', 'markdown']],

  // image
  ['image/gif', ['gif']],
  ['image/jpeg', ['jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp']],
  ['image/png', ['png']],
  ['image/svg+xml', ['svg']],
  ['image/webp', ['webp']],
  ['image/apng', ['apng']],
  ['image/avif', ['avif']],
  ['image/bmp', ['bmp']],
  ['image/x-icon', ['ico', 'cur']],
  ['image/tiff', ['tif', 'tiff']],

  // application
  ['application/xml', ['xml']],
  ['application/zip', ['zip']],
  ['application/pdf', ['pdf']],
  ['application/json', ['json']],
  ['application/yaml', ['yaml', 'yml']],
  ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', ['doc', 'docx']],
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', ['xls', 'xlsx']],

  // media
  ['audio/mp3', ['mp3']],
  ['audio/wav', ['wav']],
  ['audio/aac', ['aac']],
  ['audio/flac', ['flac']],
  ['video/mp4', ['mp4']],
  ['video/ogg', ['ogg']],
  ['video/webm', ['webm']],
  ['video/quicktime', ['mov']]
];

/**
 * @summary 获取常用的 MIME 类型。通过文件名后缀查找对应的 MIME 类型。
 *
 * @alias module:Browser.getMimeType
 * @since 5.2.0
 * @see {@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/MIME_types | MIME 类型（IANA 媒体类型）}
 * @see {@link https://www.iana.org/assignments/media-types/media-types.xhtml | Media Types}
 * @param {string} fileName 文件名。
 * @returns 如果找到，返回 MIME 类型字符串，否则返回 `undefined`。
 * @example
 * getMimeType('xxx.png'); // 'image/png'
 * getMimeType('xxx.jpg'); // 'image/jpeg'
 * getMimeType('xxx.mp3'); // 'audio/mp3'
 * getMimeType('xxx.mp4'); // 'video/mp4'
 * getMimeType('xxx.pdf'); // 'application/pdf'
 * getMimeType('xxx.zip'); // 'application/zip'
 * getMimeType('xxx.doc'); // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
 *
 * // 不常用或未知类型
 * getMimeTye('xxx.ci'); // undefined
 *
 * // 非法文件名
 * getMimeType('.zip'); // undefined
 *
 * @description 内置常用的 MIME 类型和文件名后缀映射
 *
 * | MIME 类型 | 文件名后缀 |
 * |---|---|
 * | `text/plain` | `txt` |
 * | `text/css` | `css` |
 * | `text/html` | `htm` `html` |
 * | `text/javascript` | `js` `mjs` |
 * | `text/csv` | `csv` |
 * | `text/markdown` | `md` `markdown` |
 * | `image/gif` | `gif` |
 * | `image/jpeg` | `jpg` `jpeg` `jfif` `pjpeg` `pjp` |
 * | `image/png` | `png` |
 * | `image/svg+xml` | `svg` |
 * | `image/webp` | `webp` |
 * | `image/apng` | `apng` |
 * | `image/avif` | `avif` |
 * | `image/bmp` | `bmp` |
 * | `image/x-icon` | `ico` `cur` |
 * | `image/tiff` | `tif` `tiff` |
 * | `application/xml` | `xml` |
 * | `application/zip` | `zip` |
 * | `application/pdf` | `pdf` |
 * | `application/json` | `json` |
 * | `application/yaml` | `yaml` `yml` |
 * | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | `doc` `docx` |
 * | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | `xls` `xlsx` |
 * | `audio/mp3` | `mp3` |
 * | `audio/wav` | `wav` |
 * | `audio/aac` | `aac` |
 * | `audio/flac` | `flac` |
 * | `video/mp4` | `mp4` |
 * | `video/ogg` | `ogg` |
 * | `video/webm` | `webm` |
 * | `video/quicktime` | `mov` |
 */
function getMimeType(fileName: string) {
  const ext = getExtname(fileName).slice(1).toLowerCase();
  return ext ? (mimeTypes.find((item) => item[1].includes(ext))?.[0] as string) : nativeUndefined;
}

export default getMimeType;
