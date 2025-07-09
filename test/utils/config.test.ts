import { config, setDisableWarning } from '../../src/utils/config';
import devWarn from '../../src/utils/devWarn';
import { createSpyConsole } from '../fixtures/spyConsole';

describe('config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
    expect(setDisableWarning).toBeDefined();
  });

  it('test config', () => {
    const warnSpy = createSpyConsole('warn');

    devWarn('no display');
    expect(config.disableWarning).toBe(true);
    expect(warnSpy).toHaveBeenCalledTimes(0);
    setDisableWarning(false);
    devWarn('display');
    expect(config.disableWarning).toBe(false);
    expect(warnSpy).toHaveBeenCalledTimes(1);

    warnSpy.mockRestore();
  });
});
