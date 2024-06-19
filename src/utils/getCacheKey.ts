import { uniqueId } from 'ut2';

const wm = new WeakMap();

const getCacheKey = (obj: string | Blob) => {
  if (typeof obj === 'string' || !obj) {
    return obj;
  }
  if (!wm.has(obj)) {
    wm.set(obj, uniqueId('__uh_cache_key__'));
  }
  return wm.get(obj);
};

export default getCacheKey;
