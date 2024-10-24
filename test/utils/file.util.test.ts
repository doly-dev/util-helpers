import { getExtname } from '../../src/utils/file.util';

describe('file.util', () => {
  it('getExtname', () => {
    expect(getExtname('index.html')).toBe('.html');
    expect(getExtname('index.coffee.md')).toBe('.md');
    expect(getExtname('index.')).toBe('.');
    expect(getExtname('index')).toBe('');
    expect(getExtname('.index')).toBe('');
    expect(getExtname('index.md')).toBe('.md');
  });
});
