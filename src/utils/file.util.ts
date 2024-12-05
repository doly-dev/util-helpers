import { isObjectLike, isString } from 'ut2';

export type UploadFile = { name: string; type?: string; url?: string; fileName?: string; uid?: string; originFileObj?: File };

// 是否为 UploadFile
export function isUploadFile(fileObj: UploadFile) {
  if (isObjectLike(fileObj) && isString(fileObj.name)) {
    return true;
  }
  return false;
}
