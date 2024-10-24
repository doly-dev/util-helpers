import { getFileNameExt } from '../../src/utils/file.util';

describe('file.util', () => {
  it('getFileNameExt', () => {
    expect(getFileNameExt('index.html')).toBe('.html');
    expect(getFileNameExt('index.coffee.md')).toBe('.md');
    expect(getFileNameExt('index.')).toBe('.');
    expect(getFileNameExt('index')).toBe('');
    expect(getFileNameExt('.index')).toBe('');
    expect(getFileNameExt('index.md')).toBe('.md');
  });
});
