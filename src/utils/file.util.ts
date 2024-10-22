import { isObjectLike, isString } from 'ut2';

// 测试文件名后缀
export function testExt(name: string | undefined, ext: string) {
  return !!name && name.slice(-ext.length) === ext;
}

export type UploadFile = { name: string; type?: string; url?: string };

// 是否为 UploadFile
export function isUploadFile(fileObj: UploadFile) {
  if (isObjectLike(fileObj) && isString(fileObj.name)) {
    return true;
  }
  return false;
}
