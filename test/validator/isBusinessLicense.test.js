import { isBusinessLicense } from '../../src';

describe('isBusinessLicense', () => {
  it('should be defined', () => {
    expect(isBusinessLicense).toBeDefined();
  });

  it('非字符串', () => {
    expect(isBusinessLicense(true)).toBe(false);
    expect(isBusinessLicense(123)).toBe(false);
    expect(isBusinessLicense(null)).toBe(false);
    expect(isBusinessLicense()).toBe(false);
  });

  it('incorrect', () => {
    expect(isBusinessLicense('')).toBe(false);
    expect(isBusinessLicense('310115600985')).toBe(false);
    expect(isBusinessLicense('310115600985535')).toBe(false);
    expect(isBusinessLicense('320483000067848')).toBe(false);
    expect(isBusinessLicense('32048300006784')).toBe(false);
    expect(isBusinessLicense('3204830000678481')).toBe(false);
  });

  it('correct', () => {
    expect(isBusinessLicense(310115600985533)).toBe(true);
    expect(isBusinessLicense('310117003171688')).toBe(true);
    expect(isBusinessLicense('330282602082220')).toBe(true);
    expect(isBusinessLicense('430524600099555')).toBe(true);
    expect(isBusinessLicense('350205200033663')).toBe(true);
    expect(isBusinessLicense('320507000045918')).toBe(true);
    expect(isBusinessLicense('310115600985533')).toBe(true);
    expect(isBusinessLicense('440301104041144')).toBe(true);
    expect(isBusinessLicense('440307811872564')).toBe(true);
    expect(isBusinessLicense('130903000004802')).toBe(true);
    expect(isBusinessLicense('370125200024527')).toBe(true);
    expect(isBusinessLicense('330225000051892')).toBe(true);
    expect(isBusinessLicense('340100000400528')).toBe(true);
    expect(isBusinessLicense('445381600190918')).toBe(true);
    expect(isBusinessLicense('441900001868015')).toBe(true);
    expect(isBusinessLicense('310230000419464')).toBe(true);
    expect(isBusinessLicense('440301103072002')).toBe(true);
    expect(isBusinessLicense('320483000067847')).toBe(true);
    expect(isBusinessLicense('110108000000016')).toBe(true);
    expect(isBusinessLicense('320300000174110')).toBe(true);
  });

  it('不校验校验位', () => {
    expect(isBusinessLicense('310115600985532', { checkCode: false })).toBe(true);
    expect(isBusinessLicense('310115600985535', { checkCode: false })).toBe(true);
    expect(isBusinessLicense('3101156009855', { checkCode: false })).toBe(false);
  });
});
