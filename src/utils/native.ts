import { constant, noop } from 'ut2';
import { URLExisted } from './setup';

export const objectKeys = Object.keys;

export const createObjectURL = URLExisted ? URL.createObjectURL : constant('');
export const revokeObjectURL = URLExisted ? URL.revokeObjectURL : noop;
