import { getMimeType } from '../src';

describe('getMimeType', () => {
  it('basic', () => {
    const mt1 = getMimeType('xxx.mp3');
    expect(mt1).toBe('audio/mp3');

    const mt2 = getMimeType('xxx.doc');
    expect(mt2).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');

    // 不支持只有后缀的文件名
    const mt3 = getMimeType('.zip');
    expect(mt3).toBeUndefined();
  });

  it('大写文件名后缀', () => {
    const mimetype = getMimeType('75557399789__94DBB9C4-B89C-4E23-8215-5B5E966C6110.MOV');
    expect(mimetype).toBe('video/quicktime');
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
