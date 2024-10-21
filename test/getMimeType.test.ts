import { getMimeType } from '../src';

describe('getMimeType', () => {
  it('basic', () => {
    const mt1 = getMimeType('xxx.mp3');
    expect(mt1).toBe('audio/mp3');

    const mt2 = getMimeType('xxx.doc');
    expect(mt2).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    // 后缀
    const mt3 = getMimeType('zip');
    expect(mt3).toBe('application/zip');
  });

  it('未知类型', () => {
    const values = ['xxx.icon', 'abc'];
    values.forEach((value) => {
      expect(getMimeType(value)).toBeUndefined();
    });
  });

  it('错误参数', () => {
    const values = [{}, [], false, true, 1, 0, null, 'abc'];
    values.forEach((value) => {
      // @ts-ignore
      expect(getMimeType(value)).toBeUndefined();
    });
  });
});
