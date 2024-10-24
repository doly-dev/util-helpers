/**
 * @jest-environment jsdom
 */
import { checkFileType } from '../src';

const pdf = new File([], '1.pdf', { type: 'application/pdf' });
const jpeg = new File([], 'xx.jpeg', { type: 'image/jpeg' });
const gif = new File([], 'xx.gif', { type: 'image/gif' });
const png = new File([], 'xx.png', { type: 'image/png' });

describe('checkFileType', () => {
  it('Mime类型', () => {
    expect(checkFileType(pdf, 'application/pdf')).toBe(true);
    expect(checkFileType(jpeg, 'image/jpeg')).toBe(true);

    expect(checkFileType(gif, 'image/jpeg')).toBe(false);
    expect(checkFileType(png, 'image/jpeg')).toBe(false);
  });

  it('通配符', () => {
    expect(checkFileType(pdf, 'application/*')).toBe(true);
    expect(checkFileType(pdf, 'image/*')).toBe(false);

    expect(checkFileType(jpeg, 'image/*')).toBe(true);
    expect(checkFileType(gif, 'image/*')).toBe(true);
    expect(checkFileType(png, 'image/*')).toBe(true);
    expect(checkFileType(jpeg, 'application/*')).toBe(false);

    expect(checkFileType(pdf, '*')).toBe(true);
    expect(checkFileType(jpeg, '*')).toBe(true);
    expect(checkFileType(gif, '*')).toBe(true);
    expect(checkFileType(png, '*')).toBe(true);

    // 含有 *
    expect(checkFileType(pdf, 'image/*,*,.png')).toBe(true);
  });

  it('不传 accept', () => {
    expect(checkFileType(pdf)).toBe(true);
    expect(checkFileType(jpeg)).toBe(true);
    expect(checkFileType(gif)).toBe(true);
    expect(checkFileType(png)).toBe(true);
  });

  it('文件名扩展名', () => {
    expect(checkFileType(pdf, '.pdf')).toBe(true);
    expect(checkFileType(pdf, '.jpeg, .pdf')).toBe(true);
    expect(checkFileType(pdf, '.jpeg,.pdf')).toBe(true);

    expect(checkFileType(jpeg, '.jpeg, .pdf')).toBe(true);
    expect(checkFileType(gif, '.jpeg, .pdf')).toBe(false);
    expect(checkFileType(png, '.jpeg, .pdf')).toBe(false);
  });

  it('Mime类型、通配符和文件名扩展名混合使用', () => {
    expect(checkFileType(pdf, '.jpeg,.png,.gif,application/pdf')).toBe(true);
    expect(checkFileType(jpeg, '.jpeg,.png,.gif,application/pdf')).toBe(true);
    expect(checkFileType(gif, '.jpeg,.png,.gif,application/pdf')).toBe(true);
    expect(checkFileType(png, '.jpeg,.png,.gif,application/pdf')).toBe(true);

    expect(checkFileType(pdf, 'image/*,.png,.gif,application/pdf')).toBe(true);
    expect(checkFileType(jpeg, 'image/*,.png,.gif,application/pdf')).toBe(true);
    expect(checkFileType(gif, 'image/*,.png,.gif,application/pdf')).toBe(true);
    expect(checkFileType(png, 'image/*,.png,.gif,application/pdf')).toBe(true);

    expect(checkFileType(pdf, 'image/*,.png,.gif,.pdf')).toBe(true);
    expect(checkFileType(jpeg, 'image/*,.png,.gif,.pdf')).toBe(true);
    expect(checkFileType(gif, 'image/*,.png,.gif,.pdf')).toBe(true);
    expect(checkFileType(png, 'image/*,.png,.gif,.pdf')).toBe(true);
  });

  it('UploadFile', () => {
    const f1 = {
      uid: '-1',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      name: '图片文件名称111'
    };
    const f2 = {
      uid: '-2',
      name: 'test.ofd'
    };

    expect(checkFileType(f1, '.png')).toBe(true);
    expect(checkFileType(f2, '.ofd')).toBe(true);

    expect(checkFileType(f1, 'image/*')).toBe(false);
    expect(checkFileType(f2, 'application/*')).toBe(false);
  });

  it('无效的 UploadFile 对象', () => {
    // UploadFile 必须包含 name ，如果不是一个有效的 UploadFile ，检查文件类型始终返回 false
    const f1 = {
      uid: '-3',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    };

    // @ts-ignore
    expect(checkFileType(f1, '.png')).toBe(false);
    // @ts-ignore
    expect(checkFileType(f1, '*')).toBe(false);
  });

  it('特殊的 UploadFile 对象', () => {
    const f1 = {
      name: '',
      fileName: 'xx.png'
    };
    expect(checkFileType(f1, '.png')).toBe(true);
    expect(checkFileType(f1, '*')).toBe(true);

    const f2 = {
      name: '',
      originFileObj: png
    };
    expect(checkFileType(f2, '.png')).toBe(true);
    expect(checkFileType(f2, '*')).toBe(true);

    const f3 = {
      name: ''
    };
    expect(checkFileType(f3, '.png')).toBe(false);
    expect(checkFileType(f3, '*')).toBe(true);
  });

  it('异常参数', () => {
    // @ts-ignore
    // 不传参
    expect(checkFileType()).toBe(false);
    // @ts-ignore
    // 错误参数
    expect(checkFileType('a')).toBe(false);
    // @ts-ignore
    // accept 非字符串，会先转为字符串
    expect(checkFileType(jpeg, {})).toBe(false);
  });
});
