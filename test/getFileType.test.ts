/**
 * @jest-environment jsdom
 */
import { getFileType } from '../src';

const pdf = new File([], '1.pdf', { type: 'application/pdf' });
const jpeg = new File([], 'xx.jpeg', { type: 'image/jpeg' });
const gif = new File([], 'xx.gif', { type: 'image/gif' });
const png = new File([], 'xx.png', { type: 'image/png' });

const audio = new File([], 'xx.mp3', { type: 'audio/mp3' });
const video = new File([], 'xx.mp4', { type: 'video/mp4' });
const doc = new File([], 'xxx.doc');
const docx = new File([], 'xxx.docx');
const xls = new File([], 'xxx.xls');
const xlsx = new File([], 'xxx.xlsx');

describe('getFileType', () => {
  it('basic', () => {
    const type1 = getFileType(pdf);
    expect(type1).toBe('pdf');

    expect(getFileType(jpeg)).toBe('image');
    expect(getFileType(gif)).toBe('image');
    expect(getFileType(png)).toBe('image');
    expect(getFileType(audio)).toBe('audio');
    expect(getFileType(video)).toBe('video');
    expect(getFileType(doc)).toBe('word');
    expect(getFileType(docx)).toBe('word');
    expect(getFileType(xls)).toBe('excel');
    expect(getFileType(xlsx)).toBe('excel');
  });

  it('异常参数', () => {
    // @ts-ignore
    expect(getFileType()).toBe(undefined);
    // @ts-ignore
    expect(getFileType(null)).toBe(undefined);
    // @ts-ignore
    expect(getFileType({})).toBe(undefined);
  });
});
