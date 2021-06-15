import isPromiseLike from '../../src/isPromiseLike'

const fn = () => { };
fn.then = () => { };

describe('isPromiseLike', () => {
  it('null => false', () => {
    expect(isPromiseLike(null)).toBe(false);
  });
  it('undefined => false', () => {
    expect(isPromiseLike(undefined)).toBe(false);
  });
  it('0 => false', () => {
    expect(isPromiseLike(0)).toBe(false);
  });
  it('-42 => false', () => {
    expect(isPromiseLike(-42)).toBe(false);
  });
  it('42 => false', () => {
    expect(isPromiseLike(42)).toBe(false);
  });
  it('"" => false', () => {
    expect(isPromiseLike('')).toBe(false);
  });
  it('"then" => false', () => {
    expect(isPromiseLike("then")).toBe(false);
  });
  it('false => false', () => {
    expect(isPromiseLike(false)).toBe(false);
  });
  it('true => false', () => {
    expect(isPromiseLike(true)).toBe(false);
  });
  it('{} => false', () => {
    expect(isPromiseLike({})).toBe(false);
  });
  it('{then: true} => false', () => {
    expect(isPromiseLike({ then: true })).toBe(false);
  });
  it('[] => false', () => {
    expect(isPromiseLike([])).toBe(false);
  });
  it('[true] => false', () => {
    expect(isPromiseLike([true])).toBe(false);
  });
  it('() => {} => false', () => {
    expect(isPromiseLike(() => { })).toBe(false);
  });
  it('{then: function () {}} => true', () => {
    expect(isPromiseLike({ then: function () { } })).toBe(true);
  });
  it('fn => true', () => {
    expect(isPromiseLike(fn)).toBe(true);
  });
  it('new Promise(resolve=>resolve()) => true', () => {
    expect(isPromiseLike(new Promise(resolve => resolve()))).toBe(true);
  });
  it('Promise.resolve() => true', () => {
    expect(isPromiseLike(Promise.resolve())).toBe(true);
  });
})