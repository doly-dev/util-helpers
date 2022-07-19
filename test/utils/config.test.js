import { config, setDisableWarning } from '../../src/utils/config';
import devWarn from '../../src/utils/devWarn';

describe('config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
    expect(setDisableWarning).toBeDefined();
  });

  it('test config', () => {
    devWarn('no display');
    expect(config.disableWarning).toBe(true);
    setDisableWarning(false);
    devWarn('display');
    expect(config.disableWarning).toBe(false);
  });
});
