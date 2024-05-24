import { transformObjectValue } from '../src';

describe('transformObjectValue', () => {
  it('basic', () => {
    const obj = { foo: 'bar', baz: 42 };
    const newObj = transformObjectValue(obj, (value) => {
      if (typeof value === 'number') {
        return String(value);
      }
      return value;
    });
    expect(newObj).toEqual({ foo: 'bar', baz: '42' });
    expect(obj).toEqual({ foo: 'bar', baz: 42 });

    const arr = [1, 2, 3, 4];
    const newArr = transformObjectValue(arr, (value) => String(value));
    expect(newArr).toEqual(['1', '2', '3', '4']);
    expect(arr).toEqual([1, 2, 3, 4]);

    const data = { foo: 'bar', baz: 42, c: [1, 2, 3, 4], d: '' };
    const newData1 = transformObjectValue(data, (value) => {
      if (typeof value === 'number') {
        return String(value);
      }
      return value === '' ? undefined : value;
    });
    expect(newData1).toEqual({ foo: 'bar', baz: '42', c: ['1', '2', '3', '4'], d: undefined });

    const newData2 = transformObjectValue(data, (value, key) => {
      if (typeof key === 'number') {
        return value;
      }
      if (typeof value === 'number') {
        return String(value);
      }
      return value === '' ? undefined : value;
    });
    expect(newData2).toEqual({ foo: 'bar', baz: '42', c: [1, 2, 3, 4], d: undefined });
  });

  it('嵌套对象或数组', () => {
    const obj = { a: { b: { c: { d: '' } }, e: [1, 2] } };
    const newObj1 = transformObjectValue(obj, (value) => {
      if (value === '') {
        return undefined;
      }
      if (typeof value === 'number') {
        return value + '';
      }
      return value;
    });
    expect(newObj1).toEqual({ a: { b: { c: { d: undefined } }, e: ['1', '2'] } });

    // 只处理数组
    const newObj2 = transformObjectValue(obj, (value, key) => {
      if (typeof key === 'number' && typeof value === 'number') {
        return value + '';
      }
      return value;
    });
    expect(newObj2).toEqual({ a: { b: { c: { d: '' } }, e: ['1', '2'] } });

    const newObj3 = transformObjectValue(
      obj,
      (value) => {
        // @ts-expect-error
        if (value === '') {
          return undefined;
        }
        if (typeof value === 'number') {
          return value + '';
        }
        return value;
      },
      false
    );
    expect(newObj3).toEqual({ a: { b: { c: { d: '' } }, e: [1, 2] } });

    const arr = [[1, 2, [{ foo: 'bar', baz: [[3, 4]] }]]];
    // 只转换对象的值
    const newArr1 = transformObjectValue(arr, (value, key) => {
      if (typeof key === 'number') {
        return value;
      }
      if (typeof value === 'string') {
        return value + '1';
      }
      return value;
    });
    expect(newArr1).toEqual([[1, 2, [{ foo: 'bar1', baz: [[3, 4]] }]]]);

    // 只转换数组的值
    const newArr2 = transformObjectValue(arr, (value, key) => {
      if (typeof key === 'number') {
        return String(value);
      }
      return value;
    });
    expect(newArr2).toEqual([['1', '2', [{ foo: 'bar', baz: [['3', '4']] }]]]);

    // 不递归
    const newArr3 = transformObjectValue(
      arr,
      (value) => {
        if (typeof value === 'number') {
          return String(value);
        }
        return value;
      },
      false
    );
    expect(newArr3).toEqual([[1, 2, [{ foo: 'bar', baz: [[3, 4]] }]]]);
  });

  it('非普通对象，返回自身', () => {
    function Foo(this: any, name: string) {
      this.name = name;
    }
    const foo = new (Foo as any)('jeff');
    const newFoo = transformObjectValue(foo, (value) => value + value);
    expect(newFoo).toEqual({ name: 'jeff' });
  });

  it('非对象或数组，返回自身', () => {
    const result1 = transformObjectValue(undefined, (value) => value);
    const result2 = transformObjectValue(null, (value) => value);
    const result3 = transformObjectValue(1, (value) => value);
    const result4 = transformObjectValue('a', (value) => value);
    const result5 = transformObjectValue(false, (value) => value);
    const result6 = transformObjectValue(Symbol.for('a'), (value) => value);

    expect(result1).toBeUndefined();
    expect(result2).toBeNull();
    expect(result3).toBe(1);
    expect(result4).toBe('a');
    expect(result5).toBe(false);
    expect(result6).toBe(Symbol.for('a'));
  });
});
