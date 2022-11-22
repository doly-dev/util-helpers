import pkg from '../../package.json';
import { config, setDisableWarning, version } from '../../src/utils/config';
import devWarn from '../../src/utils/devWarn';

describe('config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
    expect(setDisableWarning).toBeDefined();
    expect(version).toBeDefined();
  });

  it('test config', () => {
    const errorSpy = jest.spyOn(console, 'warn').mockImplementation(() => { });

    devWarn('no display');
    expect(config.disableWarning).toBe(true);
    setDisableWarning(false);
    devWarn('display');
    expect(config.disableWarning).toBe(false);

    errorSpy.mockRestore();
  });

  it('equal package.json version', () => {
    expect(version).toBe(pkg.version);
  });
});
