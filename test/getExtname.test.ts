import { getExtname } from '../src';

describe('getExtname', () => {
  it('basic', () => {
    expect(getExtname('index.html')).toBe('.html');
    expect(getExtname('index.coffee.md')).toBe('.md');
    expect(getExtname('index.')).toBe('.');
    expect(getExtname('index')).toBe('');
    expect(getExtname('.index')).toBe('');
    expect(getExtname('index.md')).toBe('.md');
  });

  it('错误参数', () => {
    // @ts-ignore
    expect(getExtname()).toBe('');
    // @ts-ignore
    expect(getExtname(null)).toBe('');
    // @ts-ignore
    expect(getExtname({})).toBe('');
    // @ts-ignore
    expect(getExtname([])).toBe('');
  });
});
