import { constant, noop } from 'ut2';
import { URLExisted } from './setup';

export const nativeUndefined = void 0;

export const objectKeys = Object.keys;
export const objectValues = Object.values;

export const createObjectURL = URLExisted ? URL.createObjectURL : constant('');
export const revokeObjectURL = URLExisted ? URL.revokeObjectURL : noop;
