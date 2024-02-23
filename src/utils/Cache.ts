import Emitter from 'emitter-pro';
import { forEach } from 'ut2';

type Options = {
  max: number;
};

// k=key v=value
type DataType<V, K> = { k: K; v: V };

class Cache<V = any, K = any> extends Emitter<(v: V, k: K) => void> {
  private data: DataType<V, K>[];
  private options: Options;

  constructor(options?: Options) {
    super();

    this.data = [];
    this.options = {
      max: 10,
      ...options
    };
  }

  has(k: K) {
    return !!this.data.find((item) => item.k === k);
  }

  get(k: K) {
    return this.data.find((item) => item.k === k)?.v;
  }

  private checkLimit() {
    if (this.options.max !== 0) {
      const limit = this.data.length - this.options.max;

      if (limit >= 0) {
        const delArr = this.data.splice(0, limit + 1);

        forEach(delArr, (item) => {
          this.emit('del', item.v, item.k);
        });
      }
    }
  }

  set(k: K, v: V) {
    const newData = { k, v };
    if (this.has(k)) {
      const index = this.data.findIndex((item) => item.k === k);
      this.data.splice(index, 1, newData);
    } else {
      this.checkLimit();
      this.data.push(newData);
    }
  }

  // del(k: K | K[]) {
  //   const keys = castArray(k);
  //   const result = partition(this.data, (item) => keys.includes(item.k));
  //   this.data = result[1];
  //   forEach(result[0], (item) => {
  //     this.emit('del', item.v, item.k);
  //   });
  //   return result[0];
  // }
}

export default Cache;
