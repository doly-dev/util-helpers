import { constant, noop } from 'ut2';

export const objectKeys = Object.keys;

export const createObjectURL = typeof URL !== 'undefined' ? URL.createObjectURL : constant('');
export const revokeObjectURL = typeof URL !== 'undefined' ? URL.revokeObjectURL : noop;
