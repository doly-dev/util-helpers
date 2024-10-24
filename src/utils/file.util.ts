import { isObjectLike, isString, nth } from 'ut2';

// 获取文件名后缀
export function getExtname(name: string) {
  return isString(name) && name.indexOf('.') > 0 ? '.' + nth(name.split('.'), -1) : '';
}

// 测试文件名后缀
export function testExt(name: string | undefined, ext: string) {
  return !!name && getExtname(name) === ext;
}

export type UploadFile = { name: string; type?: string; url?: string; fileName?: string; uid?: string; originFileObj?: File };

// 是否为 UploadFile
export function isUploadFile(fileObj: UploadFile) {
  if (isObjectLike(fileObj) && isString(fileObj.name)) {
    return true;
  }
  return false;
}
