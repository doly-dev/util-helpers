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
    expect(checkFileType(pdf, 'application/pdf')).toBeTruthy();
    expect(checkFileType(jpeg, 'image/jpeg')).toBeTruthy();

    expect(checkFileType(gif, 'image/jpeg')).toBeFalsy();
    expect(checkFileType(png, 'image/jpeg')).toBeFalsy();
  });

  it('通配符', () => {
    expect(checkFileType(pdf, 'application/*')).toBeTruthy();
    expect(checkFileType(pdf, 'image/*')).toBeFalsy();

    expect(checkFileType(jpeg, 'image/*')).toBeTruthy();
    expect(checkFileType(gif, 'image/*')).toBeTruthy();
    expect(checkFileType(png, 'image/*')).toBeTruthy();
    expect(checkFileType(jpeg, 'application/*')).toBeFalsy();

    expect(checkFileType(pdf, '*')).toBeTruthy();
    expect(checkFileType(jpeg, '*')).toBeTruthy();
    expect(checkFileType(gif, '*')).toBeTruthy();
    expect(checkFileType(png, '*')).toBeTruthy();
  });

  it('不传 accept', () => {
    expect(checkFileType(pdf)).toBeTruthy();
    expect(checkFileType(jpeg)).toBeTruthy();
    expect(checkFileType(gif)).toBeTruthy();
    expect(checkFileType(png)).toBeTruthy();
  });

  it('文件名扩展名', () => {
    expect(checkFileType(pdf, '.pdf')).toBeTruthy();
    expect(checkFileType(pdf, '.jpeg, .pdf')).toBeTruthy();
    expect(checkFileType(pdf, '.jpeg,.pdf')).toBeTruthy();

    expect(checkFileType(jpeg, '.jpeg, .pdf')).toBeTruthy();
    expect(checkFileType(gif, '.jpeg, .pdf')).toBeFalsy();
    expect(checkFileType(png, '.jpeg, .pdf')).toBeFalsy();
  });

  it('Mime类型、通配符和文件名扩展名混合使用', () => {
    expect(checkFileType(pdf, '.jpeg,.png,.gif,application/pdf')).toBeTruthy();
    expect(checkFileType(jpeg, '.jpeg,.png,.gif,application/pdf')).toBeTruthy();
    expect(checkFileType(gif, '.jpeg,.png,.gif,application/pdf')).toBeTruthy();
    expect(checkFileType(png, '.jpeg,.png,.gif,application/pdf')).toBeTruthy();

    expect(checkFileType(pdf, 'image/*,.png,.gif,application/pdf')).toBeTruthy();
    expect(checkFileType(jpeg, 'image/*,.png,.gif,application/pdf')).toBeTruthy();
    expect(checkFileType(gif, 'image/*,.png,.gif,application/pdf')).toBeTruthy();
    expect(checkFileType(png, 'image/*,.png,.gif,application/pdf')).toBeTruthy();

    expect(checkFileType(pdf, 'image/*,.png,.gif,.pdf')).toBeTruthy();
    expect(checkFileType(jpeg, 'image/*,.png,.gif,.pdf')).toBeTruthy();
    expect(checkFileType(gif, 'image/*,.png,.gif,.pdf')).toBeTruthy();
    expect(checkFileType(png, 'image/*,.png,.gif,.pdf')).toBeTruthy();
  });

  it('异常参数', () => {
    // @ts-ignore
    // 不传参
    expect(checkFileType()).toBeFalsy();
    // @ts-ignore
    // 错误参数
    expect(checkFileType('a')).toBeFalsy();
    // @ts-ignore
    // accept 非字符串，会先转为字符串
    expect(checkFileType(jpeg, {})).toBeFalsy();
  });
});
